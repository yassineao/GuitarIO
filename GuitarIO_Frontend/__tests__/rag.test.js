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
  })

  test('sends cookie credentials to the RAG endpoint without a bearer token', async () => {
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
        },
        body: JSON.stringify({ question: 'How do I improve rhythm?' }),
        signal: mockController.signal,
      })
    )
    expect(result.answer).toBe('Practice slowly with a metronome.')
    expect(mockSetErrorMessage).not.toHaveBeenCalled()
  })

  test('refreshes the access cookie and retries once after a 401', async () => {
    global.fetch
      .mockResolvedValueOnce(mockResponse({
        ok: false,
        status: 401,
        body: { error: 'Invalid or expired token' },
      }))
      .mockResolvedValueOnce(mockResponse({
        ok: true,
        status: 200,
        body: { uid: 7, user: 'yassine' },
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
        credentials: 'include',
        body: JSON.stringify({}),
      })
    )
    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      `${process.env.NEXT_PUBLIC_API_URL}/rag/ask`,
      expect.objectContaining({
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    )
    expect(result.answer).toBe('Use two-minute chord-change bursts.')
  })

  test('asks the user to log in again when cookie refresh fails', async () => {
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
    expect(mockSetErrorMessage).toHaveBeenCalledWith(
      'Please log in again to use the teaching assistant.'
    )
  })
})
