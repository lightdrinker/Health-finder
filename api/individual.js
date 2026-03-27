export default async function handler(req, res) {
  const API_KEY = process.env.VITE_API_KEY
  const { pageNo = 1, numOfRows = 100 } = req.query

  try {
    const url = `https://apis.data.go.kr/1471000/HlthFncFoodInfoService02/getHlthFncFoodIndvdlRcognInfo02?serviceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=json`
    const response = await fetch(url)
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}