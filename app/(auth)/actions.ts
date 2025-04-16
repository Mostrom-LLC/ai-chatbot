'use server';

import { z } from 'zod';

import { createUser, getUser } from '@/lib/db/queries';

import { signIn } from './auth';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'invalid_data';
  error?: string;
  validationErrors?: string;
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  console.log('Register action started');
  try {
    // Log the form data we received
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Register form data:', { 
      email, 
      passwordProvided: password ? 'yes' : 'no',
      passwordLength: password ? String(password).length : 0 
    });
    
    // Validate the data
    try {
      const validatedData = authFormSchema.parse({
        email,
        password,
      });
      console.log('Validation successful for email:', validatedData.email);
      
      // Check if user exists
      console.log('Checking if user exists...');
      const [user] = await getUser(validatedData.email);

      if (user) {
        console.log('User already exists with email:', validatedData.email);
        return { status: 'user_exists' } as RegisterActionState;
      }
      
      // Create the user
      console.log('Creating new user with email:', validatedData.email);
      try {
        await createUser(validatedData.email, validatedData.password);
        console.log('User created successfully');
        
        // Sign in the user
        console.log('Attempting to sign in the newly created user');
        try {
          await signIn('credentials', {
            email: validatedData.email,
            password: validatedData.password,
            redirect: false,
          });
          console.log('Sign in successful');
          return { status: 'success' };
        } catch (signInError) {
          console.error('Sign in failed after user creation:', signInError);
          return { 
            status: 'failed', 
            error: `Sign in failed after user creation: ${signInError instanceof Error ? signInError.message : String(signInError)}` 
          };
        }
      } catch (createUserError) {
        console.error('Failed to create user:', createUserError);
        return { 
          status: 'failed', 
          error: `Failed to create user: ${createUserError instanceof Error ? createUserError.message : String(createUserError)}` 
        };
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errors = validationError.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        console.error('Validation error:', errors);
        return { 
          status: 'invalid_data', 
          validationErrors: errors 
        };
      }
      throw validationError; // Re-throw if it's not a ZodError
    }
  } catch (error) {
    console.error('Unexpected error during registration:', error);
    return { 
      status: 'failed', 
      error: `Unexpected error: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
};
