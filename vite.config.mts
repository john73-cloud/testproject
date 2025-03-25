import { defineConfig } from 'vite'
export default defineConfig({
    test: {
        include: ['backend/**/*.test.ts']
    }
});
