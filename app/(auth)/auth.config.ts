import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isHealthCheck = nextUrl.pathname === '/healthcheck';
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // Allow healthcheck without authentication
      if (isHealthCheck) {
        return true;
      }

      // Redirect logged-in users away from auth pages
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      // Allow access to auth pages
      if (isOnLogin || isOnRegister) {
        return true;
      }

      // For all other routes, require authentication
      if (!isLoggedIn) {
        return false; // This will redirect to login
      }

      return true;
    },
  },
} satisfies NextAuthConfig;