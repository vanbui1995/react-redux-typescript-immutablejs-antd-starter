export interface AuthState {
  accessToken: string | null;
  error?: string;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isSigningOut: boolean;
}

export interface UserPayload {
  email: string;
  password: string;
}
