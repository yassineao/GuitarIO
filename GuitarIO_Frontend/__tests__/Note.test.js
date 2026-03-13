import React from 'react'
import { render, screen } from '@testing-library/react'
import Note from '../components/note'

describe('Note Component', () => {
  test('renders note name correctly', () => {
    render(<Note name="C" ext="maj7" />)

    expect(screen.getByText('Note: Cmaj7')).toBeInTheDocument()
  })

  test('renders note without extension', () => {
    render(<Note name="D" />)

    expect(screen.getByText('Note: D')).toBeInTheDocument()
  })

  test('renders with correct structure', () => {
    const { container } = render(<Note name="A" ext="m" />)

    // Check if the main elements are present
    expect(container.querySelector('.item')).toBeInTheDocument()
    expect(container.querySelector('.overlay')).toBeInTheDocument()
    expect(container.querySelector('.content')).toBeInTheDocument()
    expect(container.querySelector('.scales_chords_api')).toBeInTheDocument()
  })

  test('chord attribute is set correctly on ins element', () => {
    const { container } = render(<Note name="G" ext="7" />)

    const insElement = container.querySelector('.scales_chords_api')
    expect(insElement).toHaveAttribute('chord', 'G7')
  })
})