import express, { Request, Response, Application } from 'express';
import cors from "cors"
const app: Application = express();
const PORT = 3000;
app.use(cors())
const prices: Record<string, number> = {};
const getRandomPrice = (): number => {
    return parseFloat((Math.random() * (1500 - 50) + 50).toFixed(2));
};

const simulatePriceUpdate = (symbol: string) => {
    setInterval(() => {
        if (prices[symbol] !== undefined) {
            const fluctuation = (Math.random() * 0.05 - 0.025) * prices[symbol];
            prices[symbol] = parseFloat((prices[symbol] + fluctuation).toFixed(2));
        }
    }, 200);
};

app.get('/api/quote/:symbol', (req: Request<{ symbol: string; }>, res: Record<string, any>) => {
    const { symbol } = req.params;

    if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ error: 'Invalid symbol' });
    }
    const formattedSymbol = symbol.toUpperCase()
    if (!prices[formattedSymbol]) {
        prices[formattedSymbol] = getRandomPrice();
        simulatePriceUpdate(formattedSymbol);
    }

    res.json({
        symbol: formattedSymbol,
        price: prices[formattedSymbol]
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
