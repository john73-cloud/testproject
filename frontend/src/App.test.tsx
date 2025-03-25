
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import type { Mock } from 'vitest';
import App from './App';
global.fetch = vi.fn();

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the input and button', () => {
        render(<App />);
        expect(screen.getByPlaceholderText(/Enter stock symbol/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /get quote/i })).toBeInTheDocument();
    });

    it('shows error message if input is empty and submit is clicked', async () => {
        render(<App />);
        fireEvent.click(screen.getByRole('button', { name: /get quote/i }));
        expect(await screen.findByText(/A stock symbol is required/i)).toBeInTheDocument();
    });

    it('fetches and displays stock quote on valid input', async () => {
        (global.fetch as Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ symbol: 'AAPL', price: 150.25 })
        });

        render(<App />);
        fireEvent.change(screen.getByPlaceholderText(/Enter stock symbol/i), { target: { value: 'AAPL' } });
        fireEvent.click(screen.getByRole('button', { name: /get quote/i }));

        expect(await screen.findByText(/AAPL/i)).toBeInTheDocument();
        expect(screen.getByText(/\$150.25/i)).toBeInTheDocument();
    });

    it('shows an error message if API request fails', async () => {
        (global.fetch as Mock).mockResolvedValueOnce({ ok: false });

        render(<App />);
        fireEvent.change(screen.getByPlaceholderText(/Enter stock symbol/i), { target: { value: 'AAPL' } });
        fireEvent.click(screen.getByRole('button', { name: /get quote/i }));

        expect(await screen.findByText(/Failed to fetch quote/i)).toBeInTheDocument();
    });
});
