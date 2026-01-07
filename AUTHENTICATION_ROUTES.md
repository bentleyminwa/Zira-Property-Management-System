# Authentication Routes - Production Configuration

## Summary

Updated both the admin app and client app to use production URLs for authentication flows instead of localhost development URLs.

## Changes Made

### Admin App (`admin-app`)

#### 1. **proxy.ts** - Middleware Routing

- **Line 29**: Updated CLIENT redirect from `/client` to `https://zira-homes-client.vercel.app/`
- **Line 69**: Updated unauthorized admin route redirect from `http://localhost:5173` to `https://zira-homes-client.vercel.app/`

#### 2. **app/layout.tsx** - Global Sign-Out Redirect

- **Line 24**: Updated `ClerkProvider` `afterSignOutUrl` from `'/'` to `'https://zira-homes-pm.vercel.app/'`
- **Effect**: All users (regardless of role) redirect to the admin app landing page after sign-out

#### 3. **app/sign-up/[[...rest]]/page.tsx** - Sign-Up Redirects

- **Lines 82-88**: Updated `forceRedirectUrl` to use production URLs:
  - CLIENT role: `https://zira-homes-client.vercel.app/`
  - ADMIN/MANAGER/STAFF roles: `https://zira-homes-pm.vercel.app/dashboard`

#### 4. **app/sign-in/[[...rest]]/page.tsx** - Sign-In Configuration

- **Line 6**: Added `fallbackRedirectUrl='/dashboard'` to the `SignIn` component
- **Effect**: Users are redirected to dashboard after sign-in, then the proxy middleware handles CLIENT role redirects

### Client App (`client-app`)

#### 1. **src/main.tsx** - Global Sign-Out Redirect

- **Line 22**: Updated `ClerkProvider` `afterSignOutUrl` from `'http://localhost:3000'` to `'https://zira-homes-pm.vercel.app/'`

#### 2. **src/App.tsx** - Unauthenticated User Redirect

- **Line 31**: Updated `RedirectToSignIn` to include `redirectUrl='https://zira-homes-pm.vercel.app/sign-in'`
- **Effect**: Unauthenticated users accessing the client app are redirected to the centralized sign-in page

## Authentication Flow

### Sign-Up Flow

1. User visits `https://zira-homes-pm.vercel.app/sign-up`
2. User selects role (CLIENT or ADMIN/MANAGER/STAFF)
3. After successful sign-up:
   - **CLIENT**: Redirected to `https://zira-homes-client.vercel.app/`
   - **ADMIN/MANAGER/STAFF**: Redirected to `https://zira-homes-pm.vercel.app/dashboard`

### Sign-In Flow

1. User visits `https://zira-homes-pm.vercel.app/sign-in`
2. After successful sign-in, user is redirected to `/dashboard`
3. Proxy middleware checks user role:
   - **CLIENT**: Redirected to `https://zira-homes-client.vercel.app/`
   - **ADMIN/MANAGER/STAFF**: Stays on `/dashboard`

### Sign-Out Flow

1. User clicks sign-out from either app
2. All users are redirected to `https://zira-homes-pm.vercel.app/` (admin app landing page)

### Unauthorized Access

1. If a CLIENT user tries to access admin routes (e.g., `/dashboard`)
2. Proxy middleware redirects them to `https://zira-homes-client.vercel.app/`

## Environment Considerations

These changes are production-ready and will work correctly on:

- **Admin App**: `https://zira-homes-pm.vercel.app`
- **Client App**: `https://zira-homes-client.vercel.app`

For local development, you may want to:

1. Create environment variables for these URLs
2. Use conditional logic to switch between localhost and production URLs based on `NODE_ENV`

Example:

```typescript
const CLIENT_APP_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://zira-homes-client.vercel.app/'
    : 'http://localhost:5173';
```

## Testing Checklist

- [ ] Sign up as CLIENT → Should redirect to client app
- [ ] Sign up as ADMIN → Should redirect to admin dashboard
- [ ] Sign in as CLIENT → Should redirect to client app
- [ ] Sign in as ADMIN → Should redirect to admin dashboard
- [ ] Sign out from admin app → Should redirect to admin landing page
- [ ] Sign out from client app → Should redirect to admin landing page
- [ ] CLIENT accessing `/dashboard` → Should redirect to client app
- [ ] Unauthenticated user accessing client app → Should redirect to sign-in

## Deployment Status

✅ **Admin App**: Committed and pushed to main branch
✅ **Client App**: Committed and pushed to main branch

Both apps should automatically redeploy on Vercel with these changes.
