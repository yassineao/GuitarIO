import { authenticateUser } from '../pages/api/login'

// Mock fetch globally
global.fetch = jest.fn()

describe('authenticateUser', () => {
  const mockController = {
    signal: jest.fn(),
  }

  const mockSetErrorMessage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should authenticate user successfully', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue(JSON.stringify({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      }))
    }

    global.fetch.mockResolvedValue(mockResponse)

    const result = await authenticateUser(
      'test@example.com',
      'password123',
      mockController,
      mockSetErrorMessage
    )

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/auth/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
        signal: mockController.signal
      })
    )

    expect(result).toEqual({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    })

    expect(mockSetErrorMessage).not.toHaveBeenCalled()
  })

  test('should handle authentication failure', async () => {
    const mockResponse = {
      ok: false,
      text: jest.fn().mockResolvedValue(JSON.stringify({
        error: 'Invalid credentials'
      }))
    }

    global.fetch.mockResolvedValue(mockResponse)

    await expect(authenticateUser(
      'wrong@example.com',
      'wrongpassword',
      mockController,
      mockSetErrorMessage
    )).rejects.toThrow('Invalid credentials')

    expect(mockSetErrorMessage).toHaveBeenCalledWith('Invalid credentials')
  })

  test('should handle network error', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'))

    await expect(authenticateUser(
      'test@example.com',
      'password123',
      mockController,
      mockSetErrorMessage
    )).rejects.toThrow('Network error')
  })

  test('should handle malformed JSON response', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('invalid json')
    }

    global.fetch.mockResolvedValue(mockResponse)

    const result = await authenticateUser(
      'test@example.com',
      'password123',
      mockController,
      mockSetErrorMessage
    )

    expect(result).toBe('invalid json')
  })

  test('should handle empty response', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('')
    }

    global.fetch.mockResolvedValue(mockResponse)

    const result = await authenticateUser(
      'test@example.com',
      'password123',
      mockController,
      mockSetErrorMessage
    )

    expect(result).toBeNull()
  })
})