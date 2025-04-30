"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isValidPassword, getPasswordRequirementErrors } from "@/utils/auth/validation";

interface ResetPasswordResult {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    password?: string[];
    confirmPassword?: string;
  };
}

export async function resetPassword(formData: FormData): Promise<ResetPasswordResult> {
  const supabase = await createClient();
  
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  
  // Validate inputs
  const fieldErrors: ResetPasswordResult['fieldErrors'] = {};
  
  if (!password) {
    fieldErrors.password = ["Password is required"];
  } else if (!isValidPassword(password)) {
    fieldErrors.password = getPasswordRequirementErrors(password);
  }
  
  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = "Passwords do not match";
  }
  
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }
  
  const { error } = await supabase.auth.updateUser({
    password
  });
  
  if (error) {
    if (error.message.includes("session")) {
      return { error: "Your password reset link has expired. Please request a new one." };
    }
    
    return { error: error.message };
  }
  
  // Sign out the user after password reset (standard security practice)
  await supabase.auth.signOut();
  
  revalidatePath("/login", "page");
  redirect("/login?reset=success");
}