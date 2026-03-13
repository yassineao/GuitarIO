import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ChordChart from '../components/ChordChart'

// Mock the Script component from next/script
jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <script {...props}>{children}</script>,
}))

describe('ChordChart Component', () => {
  const defaultProps = {
    chord: 'Cmaj7',
    instrument: 'guitar',
    output: 'image',
  }

  test('renders chord chart container', () => {
    render(<ChordChart {...defaultProps} />)

    const container = screen.getByRole('generic', { hidden: true })
    expect(container).toBeInTheDocument()
  })

  test('passes correct props to ins element', () => {
    const { container } = render(<ChordChart {...defaultProps} />)

    const insElement = container.querySelector('ins')
    expect(insElement).toHaveAttribute('chord', 'Cmaj7')
    expect(insElement).toHaveAttribute('instrument', 'guitar')
    expect(insElement).toHaveAttribute('output', 'image')
  })

  test('applies custom className', () => {
    const { container } = render(
      <ChordChart {...defaultProps} className="custom-class" />
    )

    const insElement = container.querySelector('ins')
    expect(insElement).toHaveClass('custom-class')
  })

  test('handles width and height props', () => {
    const { container } = render(
      <ChordChart {...defaultProps} width={400} height={300} />
    )

    const insElement = container.querySelector('ins')
    expect(insElement).toHaveAttribute('width', '400')
    expect(insElement).toHaveAttribute('height', '300')
  })

  test('sets nolink attribute when nolink is true', () => {
    const { container } = render(
      <ChordChart {...defaultProps} nolink={true} />
    )

    const insElement = container.querySelector('ins')
    expect(insElement).toHaveAttribute('nolink', 'true')
  })

  test('uses default values for optional props', () => {
    const { container } = render(<ChordChart chord="Dm" />)

    const insElement = container.querySelector('ins')
    expect(insElement).toHaveAttribute('chord', 'Dm')
    expect(insElement).toHaveAttribute('instrument', 'guitar')
    expect(insElement).toHaveAttribute('output', 'image')
  })

  test('updates when props change', () => {
    const { container, rerender } = render(<ChordChart chord="C" />)

    let insElement = container.querySelector('ins')
    expect(insElement).toHaveAttribute('chord', 'C')

    rerender(<ChordChart chord="D" />)

    insElement = container.querySelector('ins')
    expect(insElement).toHaveAttribute('chord', 'D')
  })
})