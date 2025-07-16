import { Metadata } from 'next';
import Link from 'next/link';
import { requestPasswordReset } from '@/app/(auth)/login/actions';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password to access your account',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm3 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7-12L5 9v7.5L13.5 14 22 9 13.5 3.5zm-1 11.8l-7 2.45V9.7l7-4.72 7 4.72v4.75l-7 2.45z" />
              </svg>
            </div>
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Forgot your password?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email and we&apos;ll send you a link to reset your
            password
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <form className="space-y-6" action={requestPasswordReset}>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
