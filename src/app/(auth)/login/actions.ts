"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { isValidEmail, isValidPassword, getPasswordRequirementErrors } from "@/utils/auth/validation";

interface AuthResult {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    email?: string;
    password?: string[];
  };
}

export async function login(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  // Validate inputs
  const fieldErrors: AuthResult['fieldErrors'] = {};
  
  if (!email || !isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address";
  }
  
  if (!password) {
    fieldErrors.password = ["Password is required"];
  }
  
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Handle specific error types
    if (error.message.includes("Invalid login")) {
      return { error: "Invalid email or password" };
    }
    
    if (error.message.includes("Email not confirmed")) {
      return { error: "Please confirm your email address before logging in" };
    }
    
    // Generic error fallback
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  // Validate inputs
  const fieldErrors: AuthResult['fieldErrors'] = {};
  
  if (!email || !isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address";
  }
  
  if (!password) {
    fieldErrors.password = ["Password is required"];
  } else if (!isValidPassword(password)) {
    fieldErrors.password = getPasswordRequirementErrors(password);
  }
  
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login/auth/confirm`,
    },
  });

  if (error) {
    // Handle specific error types
    if (error.message.includes("already registered")) {
      return { error: "This email is already registered. Please log in instead." };
    }
    
    // Generic error fallback
    return { error: error.message };
  }

  // Return success message - we'll handle confirmation email notification in the UI
  return { 
    success: true,
    error: "Please check your email for a confirmation link"
  };
}

export async function requestPasswordReset(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();
  
  const email = formData.get("email") as string;
  
  if (!email || !isValidEmail(email)) {
    return { fieldErrors: { email: "Please enter a valid email address" } };
  }
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });
  
  if (error) {
    return { error: error.message };
  }
  
  return { 
    success: true,
    error: "If an account exists with this email, you'll receive password reset instructions"
  };
}
