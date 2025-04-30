"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Card with hover animation for course
function CourseCard({ title, level, hours, price, features, image, popular = false, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl relative ${popular ? 'border-2 border-blue-500 dark:border-blue-400' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
    >
      {popular && (
        <div className="bg-blue-600 text-white py-2 text-center font-bold text-sm">
          MOST POPULAR
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold">{title}</h3>
            <div className="flex items-center mt-2">
              <span className="bg-blue-600 rounded-full px-3 py-1 text-sm font-medium">{level}</span>
              <span className="ml-3 text-blue-200">{hours} Hours</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${price}</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">USD</span>
          </div>
          
          {popular && (
            <div className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1">
              <span className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Best Value</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <Link 
            href={`/courses/${title.toLowerCase().replace(/\s+/g, '-')}`} 
            className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 px-4 py-3 text-center text-white font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Enroll Now
          </Link>
          <Link 
            href={`/courses/${title.toLowerCase().replace(/\s+/g, '-')}/details`} 
            className="block w-full text-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View Course Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Component for feature with animation
function FeatureItem({ icon, title, description, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      className="flex"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex-shrink-0">
        <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Frequently asked question component
function FAQItem({ question, answer, isOpen, onClick, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div 
      ref={ref}
      className="border-b border-gray-200 dark:border-gray-700 py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{question}</h3>
        <svg 
          className={`h-6 w-6 text-blue-600 dark:text-blue-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? 12 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 dark:text-gray-300">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Courses() {
  // State to control which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };
  
  // FAQ data
  const faqs = [
    {
      question: "How does the AI narration feature work?",
      answer: "Our AI narration uses advanced text-to-speech technology that sounds remarkably human-like. You can enable it for any section of the course and adjust the speaking speed to your preference. It reads all course materials with proper inflection and emphasis, making it easier to understand complex boating concepts."
    },
    {
      question: "Are these courses recognized in all states?",
      answer: "Yes, our courses are approved by the National Association of State Boating Law Administrators (NASBLA) and accepted in all 50 states. Upon completion, you'll receive a certification that meets boating education requirements nationwide."
    },
    {
      question: "How long do I have to complete the course?",
      answer: "You have unlimited time to complete any of our courses. Your progress is saved automatically, so you can learn at your own pace and return whenever it's convenient for you, whether that's days, weeks, or even months later."
    },
    {
      question: "Can I take the course on my mobile device?",
      answer: "Absolutely! Our courses are fully optimized for smartphones and tablets. You can start learning on your computer and seamlessly continue on your mobile device. All course materials, including the AI narration feature, work perfectly across all devices."
    },
    {
      question: "How soon will I receive my certification?",
      answer: "Upon successful completion of the course and final exam, you'll receive your digital certificate immediately. You can download and print it right away. If you request a physical card, it will be shipped within 3-5 business days."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/40 dark:to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Boating Courses with <span className="text-blue-600 dark:text-blue-400">AI Instruction</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                NASBLA-approved courses featuring exclusive AI narration and personalized learning. Get certified on your terms, on any device.
              </p>
            </motion.div>
              
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full px-4 py-2 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Flash Sale: Save 15% with code AIBOAT15</span>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 blur-3xl opacity-30 dark:opacity-10">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
              <defs>
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 blur-3xl opacity-30 dark:opacity-10">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="200" fill="url(#paint1_radial)" />
              <defs>
                <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CourseCard 
              title="Basic Boating" 
              level="Beginner"
              hours="8"
              price="29.95"
              image="/course-basic.jpg"
              features={[
                "Essential navigation rules and regulations",
                "Safety equipment requirements and usage",
                "Emergency procedures and risk management",
                "AI-powered narration of all materials",
                "Interactive quizzes and knowledge checks"
              ]}
              delay={0.1}
            />
            
            <CourseCard 
              title="Advanced Navigation" 
              level="Intermediate"
              hours="16"
              price="49.95"
              image="/course-advanced.jpg"
              popular={true}
              features={[
                "Everything in the Basic course, plus:",
                "Advanced chart reading and navigation",
                "Weather interpretation and planning",
                "Interactive navigation simulations with AI feedback",
                "Personal progress tracking dashboard"
              ]}
              delay={0.2}
            />
            
            <CourseCard 
              title="Coastal Navigation" 
              level="Specialized"
              hours="12"
              price="39.95"
              image="/course-coastal.jpg"
              features={[
                "Coastal navigation and specific challenges",
                "Tides, currents, and coastal hazards",
                "Harbor entry and anchoring techniques",
                "AI-powered coastal scenario simulations",
                "Marine VHF radio communication protocols"
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* AI Learning Experience Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              THE AI ADVANTAGE
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                A Revolutionary Learning Experience
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our AI-powered platform transforms traditional boating education into an engaging, personalized experience.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <FeatureItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                }
                title="Natural Voice AI Narration"
                description="Our AI reads course content with human-like intonation, making complex concepts easier to understand. Toggle between reading and listening based on your preference."
                delay={0.1}
              />
              
              <FeatureItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                }
                title="24/7 AI Assistant"
                description="Have questions? Our AI assistant is always available to answer questions about course material, explain concepts in different ways, and help you prepare for the final exam."
                delay={0.2}
              />
              
              <FeatureItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                }
                title="Adaptive Learning Path"
                description="Our AI analyzes your progress and adapts content based on your strengths and areas for improvement, creating a personalized learning experience that maximizes retention."
                delay={0.3}
              />
            </div>
            
            <div className="space-y-8">
              <FeatureItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                }
                title="Interactive Simulations"
                description="Practice real-world boating scenarios in our interactive simulations. Make decisions and receive instant AI feedback to build confidence before hitting the water."
                delay={0.4}
              />
              
              <FeatureItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                }
                title="Multi-Device Learning"
                description="Start on your computer and continue on your phone or tablet. Our platform synchronizes your progress across all devices, so you can learn whenever and wherever it's convenient."
                delay={0.5}
              />
              
              <FeatureItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="NASBLA Approved"
                description="All our courses are approved by the National Association of State Boating Law Administrators (NASBLA) and accepted in all 50 states for boating education requirements."
                delay={0.6}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Comparison */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              MAKE THE RIGHT CHOICE
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Find the Perfect Course for You
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Compare our course offerings to find the one that best matches your boating needs and experience level.
              </p>
            </motion.div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-left text-gray-900 dark:text-white"></th>
                  <th className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center text-gray-900 dark:text-white">Basic Boating</th>
                  <th className="py-4 px-6 bg-blue-100 dark:bg-blue-900/30 text-center text-gray-900 dark:text-white relative">
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-3 rounded-full">RECOMMENDED</span>
                    Advanced Navigation
                  </th>
                  <th className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-center text-gray-900 dark:text-white">Coastal Navigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Price</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">$29.95</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">$49.95</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">$39.95</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Course Length</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">8 Hours</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">16 Hours</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">12 Hours</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">AI Narration</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Interactive Simulations</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Basic</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">Advanced</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Coastal Specific</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Certification</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Ideal For</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">First-time boaters</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/10">Intermediate boaters seeking comprehensive knowledge</td>
                  <td className="py-4 px-6 text-center text-gray-600 dark:text-gray-300">Boaters who navigate coastal waters</td>
                </tr>
                <tr>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6 text-center">
                    <Link 
                      href="/courses/basic-boating" 
                      className="inline-block px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
                    >
                      Learn More
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-50 dark:bg-blue-900/10">
                    <Link 
                      href="/courses/advanced-navigation" 
                      className="inline-block px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
                    >
                      Learn More
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link 
                      href="/courses/coastal-navigation" 
                      className="inline-block px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
                    >
                      Learn More
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Common Questions
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find answers to frequently asked questions about our courses and AI technology.
              </p>
            </motion.div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => toggleFAQ(index)}
                delay={0.1 * index}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/faq" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
            >
              <span>View all FAQs</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,128L48,117.3C96,107,192,85,288,96C384,107,480,149,576,165.3C672,181,768,171,864,144C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Your Boating Certification?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of boaters who have experienced our revolutionary AI-powered courses. Start learning today and be on the water confidently tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-blue-600 font-medium text-lg shadow-xl shadow-blue-700/20 hover:bg-blue-50 transition-colors duration-300"
              >
                Get Started Now
              </Link>
              
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white text-white font-medium text-lg hover:bg-white/10 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-blue-100">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>NASBLA Approved</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Mobile Friendly</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Instant Certification</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}