import { askTeachingAssistant } from '../pages/api/rag'

global.fetch = jest.fn()

function mockResponse({ ok, status, body }) {
  return {
    ok,
    status,
    text: jest.fn().mockResolvedValue(body === undefined ? '' : JSON.stringify(body)),
  }
}

describe('askTeachingAssistant', () => {
  const mockController = { signal: 'test-signal' }
  const mockSetErrorMessage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  test('sends the saved access token to the RAG endpoint', async () => {
    localStorage.setItem('accessToken', 'access-token-1')

    global.fetch.mockResolvedValueOnce(mockResponse({
      ok: true,
      status: 200,
      body: {
        answer: 'Practice slowly with a metronome.',
        sources: [{ id: 1, title: 'Rhythm #1' }],
      },
    }))

    const result = await askTeachingAssistant(
      'How do I improve rhythm?',
      mockController,
      mockSetErrorMessage
    )

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/rag/ask`,
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer access-token-1',
        },
        body: JSON.stringify({ question: 'How do I improve rhythm?' }),
        signal: mockController.signal,
      })
    )
    expect(result.answer).toBe('Practice slowly with a metronome.')
    expect(mockSetErrorMessage).not.toHaveBeenCalled()
  })

  test('refreshes the access token and retries once after a 401', async () => {
    localStorage.setItem('accessToken', 'expired-access-token')
    localStorage.setItem('refreshToken', 'refresh-token-1')

    global.fetch
      .mockResolvedValueOnce(mockResponse({
        ok: false,
        status: 401,
        body: { error: 'Invalid or expired token' },
      }))
      .mockResolvedValueOnce(mockResponse({
        ok: true,
        status: 200,
        body: {
          accessToken: 'new-access-token',
          refreshToken: 'refresh-token-1',
        },
      }))
      .mockResolvedValueOnce(mockResponse({
        ok: true,
        status: 200,
        body: {
          answer: 'Use two-minute chord-change bursts.',
          sources: [],
        },
      }))

    const result = await askTeachingAssistant(
      'How do I change chords faster?',
      mockController,
      mockSetErrorMessage
    )

    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ refreshToken: 'refresh-token-1' }),
      })
    )
    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      `${process.env.NEXT_PUBLIC_API_URL}/rag/ask`,
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer new-access-token',
        },
      })
    )
    expect(localStorage.getItem('accessToken')).toBe('new-access-token')
    expect(result.answer).toBe('Use two-minute chord-change bursts.')
  })

  test('clears tokens and asks the user to log in again when refresh fails', async () => {
    localStorage.setItem('accessToken', 'expired-access-token')
    localStorage.setItem('refreshToken', 'bad-refresh-token')

    global.fetch
      .mockResolvedValueOnce(mockResponse({
        ok: false,
        status: 401,
        body: { error: 'Invalid or expired token' },
      }))
      .mockResolvedValueOnce(mockResponse({
        ok: false,
        status: 401,
        body: { error: 'Invalid/expired token' },
      }))

    await expect(askTeachingAssistant(
      'What should I practice?',
      mockController,
      mockSetErrorMessage
    )).rejects.toThrow('Please log in again to use the teaching assistant.')

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(localStorage.getItem('accessToken')).toBeNull()
    expect(localStorage.getItem('refreshToken')).toBeNull()
    expect(mockSetErrorMessage).toHaveBeenCalledWith(
      'Please log in again to use the teaching assistant.'
    )
  })
})
