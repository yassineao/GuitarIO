import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001'
process.env.NEXT_PUBLIC_GEMINI_API_KEY = 'test-api-key'

// Global test setup
beforeAll(() => {
  // Add any global setup here
})

afterEach(() => {
  // Clean up after each test
  jest.clearAllMocks()
})