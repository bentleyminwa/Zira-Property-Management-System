export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Role } from '@prisma/client';

// Type for Clerk webhook event
type ClerkWebhookEvent = any;

export async function POST(req: Request) {
  // 1. Dynamic Imports to prevent build-time static analysis errors
  const { headers } = await import('next/headers');
  const { Webhook } = await import('svix');
  const { prisma } = await import('@/lib/prisma');

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return new Response('Error: Missing webhook secret', { status: 500 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: ClerkWebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const {
      id,
      email_addresses,
      image_url,
      first_name,
      last_name,
      unsafe_metadata,
    } = evt.data;

    if (!id || !email_addresses) {
      return new Response('Error occured -- missing data', {
        status: 400,
      });
    }

    const email = email_addresses[0].email_address;
    const role = (unsafe_metadata?.role as Role) || 'CLIENT';

    try {
      // 1. Update Database
      await prisma.user.create({
        data: {
          clerkId: id,
          email,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          image: image_url,
          role: role,
        },
      });

      // 2. Update Clerk publicMetadata for JWT access
      const { clerkClient } = await import('@clerk/nextjs/server');
      const client = await clerkClient();
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          role: role,
        },
      });
    } catch (dbError) {
      console.error('Database/Metadata Sync Error (user.created):', dbError);
      return new Response('Sync Error', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    if (!id || !email_addresses) {
      return new Response('Error occured -- missing data', {
        status: 400,
      });
    }

    const email = email_addresses[0].email_address;

    try {
      await prisma.user.update({
        where: {
          clerkId: id,
        },
        data: {
          email,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          image: image_url,
        },
      });
    } catch (dbError) {
      console.error('Database Sync Error (user.updated):', dbError);
      return new Response('Database Error', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    if (!id) {
      return new Response('Error occured -- missing data', {
        status: 400,
      });
    }

    try {
      await prisma.user.delete({
        where: {
          clerkId: id,
        },
      });
    } catch (dbError) {
      console.error('Database Sync Error (user.deleted):', dbError);
      return new Response('Database Error', { status: 500 });
    }
  }

  return new Response('Success', { status: 200 });
}
