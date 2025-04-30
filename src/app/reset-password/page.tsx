import { Metadata } from "next";
import Link from "next/link";
import { resetPassword } from "./actions";

export const metadata: Metadata = {
  title: "Reset Password | BoatSafe AI",
  description: "Reset your password to access your BoatSafe AI account",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm3 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7-12L5 9v7.5L13.5 14 22 9 13.5 3.5zm-1 11.8l-7 2.45V9.7l7-4.72 7 4.72v4.75l-7 2.45z" />
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset your password</h1>
          <p className="text-gray-600 dark:text-gray-400">Enter a new password for your account</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
          <form className="space-y-6" action={resetPassword}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Password must be at least 8 characters and include both letters and numbers
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Reset Password
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}