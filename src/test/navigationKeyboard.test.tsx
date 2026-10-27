import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { SkipToContent } from '@/components/navigation/SkipToContent';
import { NotFoundPage } from '@/features/not-found/NotFoundPage';

describe('Navigation, Mobile Drawer, and Accessibility', () => {
  it('renders skip-to-content link pointing to #main-content', () => {
    render(<SkipToContent />);
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('opens mobile navigation drawer and closes via ESC key', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Open mobile menu
    const openButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(openButton);

    // Menu dialog is visible
    expect(screen.getByRole('dialog', { name: /mobile navigation menu/i })).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(window, { key: 'Escape' });

    // Menu dialog is closed
    expect(screen.queryByRole('dialog', { name: /mobile navigation menu/i })).not.toBeInTheDocument();
  });

  it('renders 404 page with recovery navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route-xyz']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back to Home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View All Products/i })).toBeInTheDocument();
  });
});
