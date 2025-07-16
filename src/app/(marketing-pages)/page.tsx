'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';

// Hero background component with overlay
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-[2px]"></div>
      <div className="absolute inset-0 z-10 bg-blue-900/30 mix-blend-overlay"></div>

      {/* Gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 to-purple-700"></div>

      {/* Animated shapes */}
      <div className="absolute right-0 bottom-0 left-0 z-20 h-24">
        <svg
          className="absolute bottom-0 h-auto w-full translate-y-[1px] transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,117.3C672,139,768,213,864,234.7C960,256,1056,224,1152,181.3C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-current text-white dark:text-gray-900"
          ></path>
        </svg>
      </div>
    </div>
  );
}

// Animated text reveal component
function AnimatedText({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating badges component
function FloatingBadges() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="relative"
      >
        <div className="flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-lg">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 font-bold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="font-medium text-white">Enterprise Ready</span>
        </div>
        <div className="absolute -top-1 -right-1 h-5 w-5 animate-ping rounded-full bg-blue-400"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-lg"
      >
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 font-bold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
            />
          </svg>
        </div>
        <span className="font-medium text-white">Global Scale</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-lg"
      >
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 font-bold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        <span className="font-medium text-white">AI-Powered Platform</span>
      </motion.div>
    </div>
  );
}

// Feature card with hover effects
function FeatureCard({ icon, title, description, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="relative mb-6 h-14 w-14 transform transition-transform duration-500 group-hover:rotate-12">
        <div className="absolute inset-0 rotate-6 transform rounded-xl bg-blue-100 transition-transform dark:bg-blue-900/30"></div>
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white dark:from-blue-500 dark:to-blue-300">
          {icon}
        </div>
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

// AI Assistant chat bubble component
function AIChatBubble() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    'How does the AI assistant work?',
    'Can I use this on mobile devices?',
    'What integrations are available?',
    'How do I upgrade my subscription?',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <motion.div
      className="absolute -top-16 -right-8 max-w-xs md:top-8 md:-right-12"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="relative rounded-2xl bg-white p-4 pr-10 shadow-xl dark:bg-gray-800">
        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
        <h4 className="mb-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
          AI Assistant
        </h4>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            &quot;{messages[currentMessage]}&quot;
          </motion.p>
        </AnimatePresence>
        <div className="mt-2 flex space-x-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400"></span>
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400"
            style={{ animationDelay: '300ms' }}
          ></span>
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400"
            style={{ animationDelay: '600ms' }}
          ></span>
        </div>
      </div>
      <div className="absolute -bottom-2 left-5 h-4 w-4 rotate-45 transform bg-white dark:bg-gray-800"></div>
    </motion.div>
  );
}

// Animated statistics counter component
function AnimatedCounter({ value, label, icon, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/,/g, ''));
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start > end) start = end;
        setCount(Math.floor(start));
        if (start === end) clearInterval(timer);
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative mb-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
      </div>
      <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
        {count.toLocaleString()}+
      </h3>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{label}</p>
    </motion.div>
  );
}

// Testimonial card component
function TestimonialCard({ name, location, quote, rating = 5, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute top-0 right-0 h-24 w-24 opacity-5">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 36H2V84H46V58H32C32 43 40 39 46 36H32ZM84 36H54V84H98V58H84C84 43 92 39 98 36H84Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="mb-6 flex items-center">
        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-600 dark:border-blue-400">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-xl font-bold text-white dark:from-blue-600 dark:to-blue-400">
            {name.charAt(0)}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        </div>
      </div>

      <p className="relative z-10 text-gray-700 dark:text-gray-300">
        &quot;{quote}&quot;
      </p>

      <div className="mt-6 flex items-center">
        <div className="flex">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  // Refs for sections to scroll to
  const featuresRef = useRef(null);

  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);

  // Scroll to section function
  const scrollToRef = ref => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <HeroBackground />

        <div className="relative z-30 mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.div style={{ y: y1, opacity }} className="mb-6">
              <span className="inline-block rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                The Future of SaaS Applications
              </span>
            </motion.div>

            <AnimatedText delay={0.2}>
              <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="mb-2 block">Build Amazing Apps with</span>
                <span className="block bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                  AI-Powered Features
                </span>
              </h1>
            </AnimatedText>

            <AnimatedText
              delay={0.4}
              className="mt-8 max-w-2xl text-xl font-light text-blue-50 sm:text-2xl"
            >
              The modern SaaS platform with AI-powered features, seamless
              integrations, and enterprise-grade security. Build at your pace,
              deploy anywhere.
            </AnimatedText>

            <FloatingBadges />

            <motion.div
              className="mt-12 flex flex-col items-center gap-6 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <Link
                href="/courses"
                className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:from-blue-500 hover:to-blue-300 sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-700 to-blue-500 transition-transform duration-300 group-hover:translate-y-0"></span>
              </Link>

              <button
                onClick={() => scrollToRef(featuresRef)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:w-auto"
              >
                <span>Learn More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Narration Feature Highlight */}
      <section
        id="ai-features"
        ref={featuresRef}
        className="bg-white py-24 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <span className="mb-6 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                EXCLUSIVE FEATURE
              </span>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                  The Modern SaaS Platform with{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-500 dark:to-blue-300">
                    AI-Powered Intelligence
                  </span>
                </h2>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                  Our revolutionary AI technology transforms how you build and
                  scale applications:
                </p>
              </motion.div>

              <div className="mt-8 space-y-6">
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Smart Automation
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Our AI automates complex workflows with intelligent
                      decision-making, making application development more
                      efficient and scalable.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 dark:text-blue-400"
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
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Adaptive Performance
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      The AI adapts to your application&apos;s needs and usage
                      patterns, optimizing performance and providing intelligent
                      scaling recommendations.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Interactive Analytics
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Get real-time insights about your application performance
                      and user behavior with our AI-powered analytics dashboard.
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/features"
                  className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <span>Learn more about our AI features</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/ai-dashboard.jpg"
                    alt="AI Dashboard in action"
                    width={600}
                    height={500}
                    className="h-[500px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30">
                      <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white transition-transform group-hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-blue-600 shadow-lg dark:bg-gray-800/90 dark:text-blue-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span>AI dashboard demo</span>
                    </div>
                  </div>
                </div>

                <AIChatBubble />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-100 blur-3xl dark:bg-blue-900/20"></div>
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-blue-200 blur-3xl dark:bg-blue-800/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              TRUSTED BY DEVELOPERS
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                Join Thousands of Satisfied Developers
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                Our AI-powered SaaS platform has helped developers worldwide
                build scalable applications with a 98% success rate.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedCounter
              value={35000}
              label="Active Developers"
              delay={0.1}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />

            <AnimatedCounter
              value={50}
              label="Countries Served"
              delay={0.2}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
              }
            />

            <AnimatedCounter
              value={98}
              label="Success Rate (%)"
              delay={0.3}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />

            <AnimatedCounter
              value={4.9}
              label="Customer Rating (out of 5)"
              delay={0.4}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-white py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              EXCLUSIVE FEATURES
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                Why Choose{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  Our Platform
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                Our innovative approach makes application development more
                engaging, effective, and scalable than ever before.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              }
              title="AI-Powered Intelligence"
              description="Our advanced AI analyzes your application patterns and provides intelligent insights, making development more efficient and scalable."
              delay={0.1}
            />

            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Build at Your Own Pace"
              description="No time limits or rigid schedules. Develop features when it's convenient for you, taking as much time as you need to perfect each component."
              delay={0.2}
            />

            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="Enterprise Ready"
              description="Our platform meets all enterprise standards and is compliant with SOC 2, GDPR, and other major security frameworks."
              delay={0.3}
            />

            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              }
              title="Learn on Any Device"
              description="Our mobile-optimized platform works seamlessly on smartphones, tablets, and computers. Start on one device and continue on another."
              delay={0.4}
            />

            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              }
              title="Interactive Development"
              description="Test real-world application scenarios in our interactive sandbox, with AI-powered feedback to help you improve your code quality and performance."
              delay={0.5}
            />

            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              title="24/7 Support"
              description="Our AI assistant is available 24/7 to answer your questions, and our human support team is just a click away during business hours."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Course Comparison */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-24 dark:from-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              WHY WE&apos;RE DIFFERENT
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                How We Compare to Other Platforms
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                See why our AI-powered SaaS platform stands out from traditional
                development tools.
              </p>
            </motion.div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="bg-transparent px-4 py-5"></th>
                  <th className="rounded-t-xl bg-blue-600 px-4 py-5 text-center text-white">
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-bold">Our Platform</span>
                      <span className="mt-1 text-blue-200">
                        AI-Powered SaaS
                      </span>
                    </div>
                  </th>
                  <th className="rounded-t-xl bg-gray-100 px-4 py-5 text-center text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    <span className="text-xl font-medium">
                      Traditional Platforms
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-5 font-medium text-gray-700 dark:text-gray-300">
                    AI Intelligence
                  </td>
                  <td className="bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/20">
                    <div className="flex justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="bg-gray-50 px-4 py-5 text-center dark:bg-gray-800">
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-5 font-medium text-gray-700 dark:text-gray-300">
                    Adaptive Performance
                  </td>
                  <td className="bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/20">
                    <div className="flex justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="bg-gray-50 px-4 py-5 text-center dark:bg-gray-800">
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-5 font-medium text-gray-700 dark:text-gray-300">
                    24/7 AI Assistant
                  </td>
                  <td className="bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/20">
                    <div className="flex justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="bg-gray-50 px-4 py-5 text-center dark:bg-gray-800">
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-5 font-medium text-gray-700 dark:text-gray-300">
                    Interactive Development
                  </td>
                  <td className="bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/20">
                    <div className="flex justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="bg-gray-50 px-4 py-5 text-center dark:bg-gray-800">
                    <div className="flex justify-center text-gray-400">
                      Limited
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-5 font-medium text-gray-700 dark:text-gray-300">
                    Enterprise Ready
                  </td>
                  <td className="bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/20">
                    <div className="flex justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="bg-gray-50 px-4 py-5 text-center dark:bg-gray-800">
                    <div className="flex justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-5 font-medium text-gray-700 dark:text-gray-300">
                    Mobile Friendly
                  </td>
                  <td className="bg-blue-50 px-4 py-5 text-center dark:bg-blue-900/20">
                    <div className="flex justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="bg-gray-50 px-4 py-5 text-center dark:bg-gray-800">
                    <div className="flex justify-center text-gray-400">
                      Varies
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-5 font-medium text-gray-700 dark:text-gray-300">
                    Price
                  </td>
                  <td className="bg-blue-50 px-4 py-5 text-center font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    $19/month
                  </td>
                  <td className="bg-gray-50 px-4 py-5 text-center text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    $49 - $99/month
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-white py-24 dark:bg-gray-900">
        <div className="absolute top-0 left-0 z-0 h-1/3 w-1/3 rounded-br-[100px] bg-blue-50 dark:bg-blue-950/20"></div>
        <div className="absolute right-0 bottom-0 z-0 h-1/3 w-1/3 rounded-tl-[100px] bg-blue-50 dark:bg-blue-950/20"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              TESTIMONIALS
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                What Our Students Say
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                Hear from developers who have experienced our AI-powered
                development platform.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <TestimonialCard
              name="John D."
              location="Florida"
              quote="The AI intelligence made all the difference. It felt like having a personal coding assistant helping with everything. I've used other platforms, but this was by far the most efficient."
              delay={0.1}
            />

            <TestimonialCard
              name="Sarah M."
              location="California"
              quote="I built my app in just a weekend! The modern interface and interactive elements made development fun and easy. Being able to ask the AI questions whenever I was stuck was incredibly helpful."
              delay={0.2}
            />

            <TestimonialCard
              name="Robert K."
              location="Michigan"
              quote="As someone who struggles with complex architecture, the AI guidance was incredibly helpful. I could follow the recommendations while building the features. Deployed with flying colors!"
              delay={0.3}
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span>View more testimonials</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500"></div>

        {/* Decorative waves */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,117.3C672,139,768,213,864,234.7C960,256,1056,224,1152,181.3C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              Ready to Build with AI?
            </h2>
            <p className="mb-12 text-xl text-blue-100">
              Join thousands of developers who have already experienced the
              future of application development. Build with confidence today.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href="/signup"
                className="w-full rounded-full bg-white px-8 py-4 text-lg font-medium text-blue-600 shadow-xl shadow-blue-700/20 transition-colors duration-300 hover:bg-blue-50 sm:w-auto"
              >
                Start Building
              </Link>

              <Link
                href="/courses"
                className="w-full rounded-full border border-white bg-transparent px-8 py-4 text-lg font-medium text-white transition-colors duration-300 hover:bg-white/10 sm:w-auto"
              >
                View All Features
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2 text-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
                <span>Available in 50+ Countries</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>Instant Deployment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
