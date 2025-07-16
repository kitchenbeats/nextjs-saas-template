import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorDisplay from '../ErrorDisplay';

describe('ErrorDisplay', () => {
  it('renders error message', () => {
    render(<ErrorDisplay message="Test error message" />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<ErrorDisplay title="Custom Title" message="Test error" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorDisplay message="Test error" onRetry={onRetry} />);

    const retryButton = screen.getByText('Try again');
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('dismisses error when dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    render(<ErrorDisplay message="Test error" onDismiss={onDismiss} />);

    const dismissButton = screen.getByText('Dismiss');
    fireEvent.click(dismissButton);

    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('hides component after dismissing', () => {
    render(<ErrorDisplay message="Test error" />);

    const dismissButton = screen.getByText('Dismiss');
    fireEvent.click(dismissButton);

    expect(screen.queryByText('Test error')).not.toBeInTheDocument();
  });
});
