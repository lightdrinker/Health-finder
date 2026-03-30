import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-individual-middleware',
        configureServer(server) {
          server.middlewares.use('/api/individual', async (req, res) => {
            const params = new URLSearchParams(req.url.split('?')[1])
            const startIdx = params.get('startIdx') || 1
            const endIdx = params.get('endIdx') || 100
            const url = `http://openapi.foodsafetykorea.go.kr/api/${env.VITE_API_KEY}/I-0050/json/${startIdx}/${endIdx}`
            try {
              const response = await fetch(url)
              const data = await response.json()
              res.setHeader('Content-Type', 'application/json')
              res.setHeader('Access-Control-Allow-Origin', '*')
              res.end(JSON.stringify(data['I-0050'] || {}))
            } catch (e) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: e.message }))
            }
          })
        },
      },
    ],
  }
})
