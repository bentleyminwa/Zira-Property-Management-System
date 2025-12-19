import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/webhooks(.*)',
  '/auth(.*)',
  '/sign-up(.*)',
  '/sign-in(.*)',
]);
const isAdminRoute = createRouteMatcher(['/dashboard(.*)']);
const isClientRoute = createRouteMatcher(['/client(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();

  // 1. Redirect authenticated users away from landing page
  if (userId && request.nextUrl.pathname === '/') {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const role =
      (user.publicMetadata?.role as string) ||
      (user.unsafeMetadata?.role as string) ||
      'CLIENT';
    const redirectUrl = ['ADMIN', 'MANAGER', 'STAFF'].includes(role)
      ? '/dashboard'
      : 'http://localhost:5173';
    return Response.redirect(new URL(redirectUrl, request.url));
  }

  // 2. Allow public routes
  if (isPublicRoute(request)) {
    return;
  }

  // 3. Force authentication for all other routes
  if (!userId) {
    await auth.protect();
    return;
  }

  // 4. RBAC Enforcement
  const metadata = (sessionClaims?.metadata as any) || {};
  const publicMetadata = (sessionClaims?.publicMetadata as any) || {};
  let role =
    metadata.role ||
    publicMetadata.role ||
    (sessionClaims?.unsafeMetadata as any)?.role;

  // Fallback to Backend API if role is not in current JWT
  if (!role) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      role =
        (user.publicMetadata?.role as string) ||
        (user.unsafeMetadata?.role as string) ||
        'CLIENT';
    } catch (e) {
      role = 'CLIENT';
    }
  }

  if (isAdminRoute(request) && !['ADMIN', 'MANAGER', 'STAFF'].includes(role)) {
    return Response.redirect(new URL('http://localhost:5173', request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
