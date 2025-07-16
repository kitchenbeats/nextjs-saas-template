import Image from 'next/image';
import Link from 'next/link';
import { signup } from '../login/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your account to get started',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left section - Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/login-bg.jpg"
          alt="Modern workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]"></div>

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-12">
          <div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <Image src="/logo-icon.svg" alt="Logo" width={24} height={24} />
              </div>
              <span className="text-2xl font-bold text-white">Your App</span>
            </div>
          </div>

          <div className="max-w-md text-white">
            <blockquote className="mb-4 text-xl font-light italic">
              &ldquo;Getting started was incredibly easy. The platform guided me
              through everything step by step.&rdquo;
            </blockquote>
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-medium text-white">
                AM
              </div>
              <div className="ml-3">
                <p className="font-medium">Alex Morgan</p>
                <p className="text-sm text-white/80">New York, Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-white p-8 lg:w-1/2 dark:bg-gray-900">
        <div className="mb-8 flex items-center space-x-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
            <Image src="/logo-icon.svg" alt="Logo" width={24} height={24} />
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Your App
          </span>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands of users building amazing applications
            </p>
          </div>

          <form className="space-y-6" id="signup-form">
            {/* Display form errors */}
            <div
              id="form-error"
              className="hidden rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
            ></div>

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
              <p
                id="email-error"
                className="mt-1 hidden text-sm text-red-600 dark:text-red-400"
              ></p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
              />
              <div
                id="password-error"
                className="mt-1 hidden text-sm text-red-600 dark:text-red-400"
              ></div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Password must be at least 8 characters and include both letters
                and numbers
              </p>
            </div>

            {/* Success message for signup */}
            <div
              id="success-message"
              className="hidden rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400"
            ></div>

            <div>
              <button
                formAction={signup}
                className="flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Create Account
              </button>
            </div>
          </form>

          <script
            dangerouslySetInnerHTML={{
              __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const form = document.getElementById('signup-form');
              const formError = document.getElementById('form-error');
              const emailError = document.getElementById('email-error');
              const passwordError = document.getElementById('password-error');
              const successMessage = document.getElementById('success-message');
              
              if (form) {
                form.addEventListener('submit', async (e) => {
                  // Reset previous errors
                  formError.classList.add('hidden');
                  emailError.classList.add('hidden');
                  passwordError.classList.add('hidden');
                  successMessage.classList.add('hidden');
                });
              }
            });
          `,
            }}
          ></script>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.75 18.23 13.48 18.63 12 18.63C9.13 18.63 6.73 16.73 5.81 14.11H2.18V16.96C3.98 20.53 7.7 23 12 23Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.81 14.11C5.58 13.44 5.45 12.73 5.45 12C5.45 11.27 5.58 10.56 5.81 9.89V7.04H2.18C1.42 8.56 1 10.24 1 12C1 13.76 1.42 15.44 2.18 16.96L5.81 14.11Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.98 3.47 2.18 7.04L5.81 9.89C6.73 7.27 9.13 5.38 12 5.38Z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By creating an account, you agree to our{' '}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
