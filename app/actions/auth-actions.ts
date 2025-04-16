'use server';

import { signOut as authSignOut } from '@/app/(auth)/auth';

export async function signOutAction(redirectPath: string = '/') {
  return authSignOut({
    redirectTo: redirectPath,
  });
}
