import Image from "next/image";
import Link from "next/link";
import { login, signup } from "./actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | BoatSafe AI",
  description: "Sign in to your BoatSafe AI account or create a new one",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left section - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/login-bg.jpg"
          alt="Sailing boat on water"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]"></div>
        
        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-between z-10 p-12">
          <div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <Image 
                  src="/logo-icon.svg" 
                  alt="BoatSafe AI" 
                  width={24} 
                  height={24}
                />
              </div>
              <span className="text-white text-2xl font-bold">BoatSafe AI</span>
            </div>
          </div>
          
          <div className="text-white max-w-md">
            <blockquote className="text-xl italic font-light mb-4">
              &ldquo;The AI-powered learning made getting my boating license easy and enjoyable. I was certified in a weekend!&rdquo;
            </blockquote>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">JS</div>
              <div className="ml-3">
                <p className="font-medium">Jamie Smith</p>
                <p className="text-sm text-white/80">Florida, Certified Boater</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right section - Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-8">
        <div className="lg:hidden flex items-center space-x-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
            <Image 
              src="/logo-icon.svg" 
              alt="BoatSafe AI" 
              width={24} 
              height={24}
            />
          </div>
          <span className="text-gray-900 dark:text-white text-2xl font-bold">BoatSafe AI</span>
        </div>
      
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account or create a new one</p>
          </div>
          
          <form className="space-y-6" id="auth-form">
            {/* Display form errors */}
            <div id="form-error" className="hidden bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm"></div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="you@example.com"
              />
              <p id="email-error" className="hidden mt-1 text-sm text-red-600 dark:text-red-400"></p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Forgot your password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
              />
              <div id="password-error" className="hidden mt-1 text-sm text-red-600 dark:text-red-400"></div>
            </div>
            
            {/* Success message for signup */}
            <div id="success-message" className="hidden bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm"></div>
            
            <div>
              <button
                formAction={async (formData: FormData) => {
                  // Client-side JS will access the function result and handle errors
                  const result = await login(formData);
                  // This will be caught by client-side JS if it exists
                  return result;
                }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </button>
            </div>
            
            <div>
              <button
                formAction={async (formData: FormData) => {
                  // Client-side JS will access the function result and handle errors
                  const result = await signup(formData);
                  // This will be caught by client-side JS if it exists
                  return result;
                }}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create new account
              </button>
            </div>
          </form>
          
          <script dangerouslySetInnerHTML={{ __html: `
            document.addEventListener('DOMContentLoaded', () => {
              // Handle form submissions with client-side error handling
              const form = document.getElementById('auth-form');
              const formError = document.getElementById('form-error');
              const emailError = document.getElementById('email-error');
              const passwordError = document.getElementById('password-error');
              const successMessage = document.getElementById('success-message');
              
              if (form) {
                // Check for URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('reset') === 'success') {
                  formError.textContent = "Your password has been reset successfully. You can now log in.";
                  formError.classList.remove('hidden', 'bg-red-50', 'text-red-600');
                  formError.classList.add('bg-green-50', 'text-green-600');
                  formError.classList.remove('hidden');
                }
                
                // Add error handling
                form.addEventListener('submit', async (e) => {
                  // Reset previous errors
                  formError.classList.add('hidden');
                  emailError.classList.add('hidden');
                  passwordError.classList.add('hidden');
                  successMessage.classList.add('hidden');
                });
              }
            });
          ` }}></script>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.75 18.23 13.48 18.63 12 18.63C9.13 18.63 6.73 16.73 5.81 14.11H2.18V16.96C3.98 20.53 7.7 23 12 23Z" fill="#34A853"/>
                  <path d="M5.81 14.11C5.58 13.44 5.45 12.73 5.45 12C5.45 11.27 5.58 10.56 5.81 9.89V7.04H2.18C1.42 8.56 1 10.24 1 12C1 13.76 1.42 15.44 2.18 16.96L5.81 14.11Z" fill="#FBBC05"/>
                  <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.98 3.47 2.18 7.04L5.81 9.89C6.73 7.27 9.13 5.38 12 5.38Z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              
              <button
                type="button"
                className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}