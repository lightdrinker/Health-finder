export default async function handler(req, res) {
  const API_KEY = process.env.VITE_API_KEY
  const { startIdx = 1, endIdx = 100 } = req.query

  try {
    const url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/I-0050/json/${startIdx}/${endIdx}`
    const response = await fetch(url)
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data['I-0050'])
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}