export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 1% Better Platform is Working!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The development server is running successfully.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Platform Status</h2>
          <ul className="text-left space-y-2">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Next.js 14 App Router
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              TypeScript Configuration
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Tailwind CSS Styling
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Prisma Database
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Sample Data Seeded
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  )
} 