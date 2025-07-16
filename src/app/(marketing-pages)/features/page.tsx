export default function Features() {
  return (
    <div className="min-h-screen bg-white pt-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Platform Features
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Discover the powerful features that make our AI-powered SaaS
            platform the perfect choice for modern application development.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature cards would go here */}
          <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              AI Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Intelligent insights and analytics powered by AI.
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Smart Automation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automate complex workflows with intelligent decision-making.
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Advanced Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Deep insights into your application performance and user behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
