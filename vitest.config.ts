import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
export default defineConfig({


    plugins:[react()],
    test: {

        environment:'jsdom',
        setupFiles:['./src/setupTests.ts'],
        globals:true,
        coverage:{

            provider:'v8',

        },
        include:['**/*.{test,spec}.{tsx,ts}'],
        alias:{"@": path.resolve(__dirname, './src')}

    },

})