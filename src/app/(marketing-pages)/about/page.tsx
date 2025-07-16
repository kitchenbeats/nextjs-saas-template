import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-blue-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-blue-950/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              About{' '}
              <span className="text-blue-600 dark:text-blue-400">
                Our Platform
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Revolutionizing application development with AI-powered tools and
              a modern development experience.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Our Story
              </h2>
              <div className="mt-6 space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Founded by experienced developers and technology experts, our
                  platform was born from a simple observation: traditional
                  development tools were outdated, complex, and difficult to
                  scale with.
                </p>
                <p>
                  We set out to create a platform that would make building
                  essential application features more accessible, engaging, and
                  effective. By combining cutting-edge AI technology with
                  decades of development expertise, we&apos;ve developed a
                  revolutionary approach to application development.
                </p>
                <p>
                  Our mission is to create better software by making quality
                  development tools available to everyone, regardless of
                  experience level or team size.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/about-team.jpg"
                alt="Our team of development experts"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="bg-gray-50 px-4 py-24 sm:px-6 lg:px-8 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What Sets Us Apart
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
              Our innovative approach to application development combines
              technology with expert knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-md dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
                AI-Powered Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We&apos;re the only platform that uses advanced AI to assist
                with code generation and provide personalized development
                guidance. This technology adapts to your coding style and helps
                you build complex features more easily.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-md dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
                Expertly Crafted Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform is developed by seasoned developers with decades of
                experience and follows industry best practices and security
                standards, ensuring you receive reliable, production-ready
                tools.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-md dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
                Modern Development Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our intuitive, cloud-based platform lets you build on any
                device. Interactive elements, real-time collaboration, and AI
                assistance make the development experience engaging and help you
                build features faster.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
              A dedicated group of development experts and technology
              innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="relative mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full">
                <Image
                  src="/team-member-1.jpg"
                  alt="Captain Michael Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Michael Johnson
              </h3>
              <p className="text-blue-600 dark:text-blue-400">
                Founder & Chief Technology Officer
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                With 25+ years of experience as a software architect and
                development leader, Michael brings unparalleled expertise to our
                platform.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full">
                <Image
                  src="/team-member-2.jpg"
                  alt="Dr. Sophia Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Dr. Sophia Chen
              </h3>
              <p className="text-blue-600 dark:text-blue-400">
                Chief AI Officer
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Sophia leads our AI development team, bringing her expertise in
                artificial intelligence and developer tools to create our
                innovative development platform.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full">
                <Image
                  src="/team-member-3.jpg"
                  alt="James Rodriguez"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                James Rodriguez
              </h3>
              <p className="text-blue-600 dark:text-blue-400">
                Platform Director
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                A former enterprise architect, James ensures our platform meets
                the highest standards while remaining accessible to developers
                of all backgrounds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 dark:bg-blue-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-12 sm:px-6 lg:flex-row lg:px-8 lg:py-16">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl lg:mb-0 lg:text-left">
            <span className="block">Ready to experience the difference?</span>
            <span className="block text-blue-200">
              Join thousands of satisfied developers.
            </span>
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              Get Started
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded-full border border-white px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              View Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
