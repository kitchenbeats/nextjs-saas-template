import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-blue-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              About <span className="text-blue-600 dark:text-blue-400">BoatSafe AI</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Revolutionizing boating education with AI-powered instruction and a modern learning experience.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
              <div className="mt-6 space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Founded by experienced boaters and technology experts, BoatSafe AI was born from a simple observation: traditional boating courses were outdated, text-heavy, and difficult to engage with.
                </p>
                <p>
                  We set out to create a course that would make learning essential boating skills more accessible, engaging, and effective. By combining cutting-edge AI technology with decades of boating expertise, we&apos;ve developed a revolutionary approach to boating education.
                </p>
                <p>
                  Our mission is to create safer waterways by making quality boating education available to everyone, regardless of learning style or experience level.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/about-team.jpg" 
                alt="Our team of boating experts" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Sets Us Apart</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our innovative approach to boating education combines technology with expert knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">AI-Powered Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We&apos;re the only boating course that uses advanced AI to narrate course material and provide personalized instruction. This technology adapts to your learning style and helps you grasp complex concepts more easily.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Expertly Crafted Content</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our curriculum is developed by seasoned boaters with decades of experience and approved by the National Association of State Boating Law Administrators (NASBLA), ensuring you receive accurate, up-to-date information.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Modern Learning Platform</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our intuitive, mobile-friendly platform lets you learn on any device. Interactive elements, videos, and simulations make the learning experience engaging and help you retain information better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A dedicated group of boating enthusiasts and technology experts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                <Image 
                  src="/team-member-1.jpg" 
                  alt="Captain Michael Johnson" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Captain Michael Johnson</h3>
              <p className="text-blue-600 dark:text-blue-400">Founder & Chief Boating Expert</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                With 25+ years of experience as a licensed captain and boating instructor, Michael brings unparalleled expertise to our curriculum.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                <Image 
                  src="/team-member-2.jpg" 
                  alt="Dr. Sophia Chen" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Dr. Sophia Chen</h3>
              <p className="text-blue-600 dark:text-blue-400">Chief Technology Officer</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Sophia leads our AI development team, bringing her expertise in artificial intelligence and educational technology to create our innovative learning platform.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                <Image 
                  src="/team-member-3.jpg" 
                  alt="James Rodriguez" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">James Rodriguez</h3>
              <p className="text-blue-600 dark:text-blue-400">Education Director</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                A former NASBLA educator, James ensures our courses meet the highest standards while remaining accessible to learners of all backgrounds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8 lg:mb-0 text-center lg:text-left">
            <span className="block">Ready to experience the difference?</span>
            <span className="block text-blue-200">Join thousands of satisfied boaters.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="rounded-full bg-white px-8 py-4 text-blue-600 font-medium text-lg transition-colors hover:bg-blue-50 inline-flex items-center justify-center">
              Get Started
            </Link>
            <Link href="/courses" className="rounded-full border border-white px-8 py-4 text-white font-medium text-lg transition-colors hover:bg-blue-700 inline-flex items-center justify-center">
              View Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}