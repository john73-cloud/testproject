import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app, server } from './server';

describe('Stock Quote API', () => {
    beforeAll(() => {
        console.log('Starting tests...');
    });

    afterAll(() => {
        server.close();
    });

    it('should return a quote for a valid stock symbol', async () => {
        const response = await request(app).get('/api/quote/AAPL');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('symbol', 'AAPL');
        expect(response.body).toHaveProperty('price');
        expect(typeof response.body.price).toBe('number');
    });

    it('should return an error for an invalid stock symbol', async () => {
        const response = await request(app).get('/api/quote/');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid symbol');
    });
});
