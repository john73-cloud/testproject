import React, { useState, useEffect } from 'react';
import type { Error, Quote } from './types';

function App() {
    const [symbol, setSymbol] = useState<string>('');
    const [quote, setQuote] = useState<Quote | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchQuote = async (stockSymbol: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/quote/${stockSymbol}`);
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            const data = await response.json();
            setQuote(data);
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError({ message: err.message });
                setTimeout(() => setError(null), 10000)
            }
            setQuote(null);
        }
    };

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        if (quote?.symbol) {
            intervalId = setInterval(() => {
                fetchQuote(quote.symbol);
            }, 2000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [quote?.symbol]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!symbol.trim()) {
            setError({ message: "A stock symbol is required" });
            setTimeout(() => setError(null), 10000)
            return;
        }
        setLoading(true);
        await fetchQuote(symbol);
        setLoading(false);
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Stock Quote Tracker</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="Enter stock symbol"
                        maxLength={5}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-5 py-2 rounded-lg disabled:bg-gray-400 min-w-max"
                    >
                        {loading ? 'Loading...' : 'Get Quote'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-4 p-3 w-full max-w-md bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error?.message}
                </div>
            )}

            {quote && (
                <div className="mt-4 p-4 w-full max-w-md bg-white shadow-lg rounded-lg text-center">
                    <h2 className="text-xl font-semibold text-gray-800">{quote.symbol}</h2>
                    <p className="text-3xl font-bold text-green-600">${quote.price}</p>
                </div>
            )}
        </div>
    );
}

export default App;
