const EMOJI_MAP = {
  '눈건강': '👁', '피부건강': '✨', '피부보습': '💧',
  '뼈건강': '🦴', '혈행개선': '🩸', '혈액건강': '🩸',
  '혈중지질': '🩸', '혈압': '🩸', '콜레스테롤': '🩸',
  '항산화': '🔰', '면역': '🔰', '세포건강': '🔰',
  '에너지대사': '⚡', '피로개선': '🔋', '장건강': '🌿',
  '혈당': '📊', '체지방': '📉', '간건강': '🟤',
  '인지기능': '🧠', '관절건강': '🦵', '근육건강': '💪',
  '스트레스': '🧘', '구강건강': '🦷', '전립선': '🔵',
  '태아건강': '👶', '영양보충': '💊', '단백질대사': '🧬',
  '신경건강': '🔌', '기초대사': '🔥', '영양흡수': '🍚',
  '전해질균형': '💧', '신경근육': '🔌', '운동능력': '🏃',
  '호르몬': '⚙️', '효소활성': '🧪',
}

function inferTag(claim) {
  if (!claim) return '기타'
  if (claim.includes('눈') || claim.includes('시각')) return '눈건강'
  if (claim.includes('피부') && claim.includes('보습')) return '피부보습'
  if (claim.includes('피부') || claim.includes('점막')) return '피부건강'
  if (claim.includes('뼈') || claim.includes('골')) return '뼈건강'
  if (claim.includes('관절')) return '관절건강'
  if (claim.includes('혈행') || claim.includes('혈액순환')) return '혈행개선'
  if (claim.includes('혈압')) return '혈압'
  if (claim.includes('콜레스테롤')) return '콜레스테롤'
  if (claim.includes('혈중 지질') || claim.includes('혈중지질')) return '혈중지질'
  if (claim.includes('혈당')) return '혈당'
  if (claim.includes('혈액')) return '혈액건강'
  if (claim.includes('항산화') || claim.includes('산화')) return '항산화'
  if (claim.includes('면역')) return '면역'
  if (claim.includes('세포')) return '세포건강'
  if (claim.includes('에너지') || claim.includes('대사')) return '에너지대사'
  if (claim.includes('피로')) return '피로개선'
  if (claim.includes('장') || claim.includes('배변')) return '장건강'
  if (claim.includes('간')) return '간건강'
  if (claim.includes('기억') || claim.includes('인지')) return '인지기능'
  if (claim.includes('근육')) return '근육건강'
  if (claim.includes('스트레스')) return '스트레스'
  if (claim.includes('체지방') || claim.includes('체중')) return '체지방'
  if (claim.includes('전립선')) return '전립선'
  if (claim.includes('호르몬')) return '호르몬'
  if (claim.includes('구강') || claim.includes('치아')) return '구강건강'
  if (claim.includes('신경')) return '신경건강'
  if (claim.includes('운동')) return '운동능력'
  if (claim.includes('단백질')) return '단백질대사'
  if (claim.includes('태아') || claim.includes('임산부')) return '태아건강'
  if (claim.includes('영양')) return '영양보충'
  return '기타'
}

export async function fetchIndividualIngredients() {
  try {
    const pageSize = 100
    let startIdx = 1
    let allItems = []
    let totalCount = null

    while (true) {
      const endIdx = startIdx + pageSize - 1
      const url = `/api/individual?startIdx=${startIdx}&endIdx=${endIdx}`
      const res = await fetch(url)
      const data = await res.json()

      if (!data || !data.row) break

      if (totalCount === null) totalCount = parseInt(data.total_count)
      const items = data.row
      if (items.length === 0) break

      allItems = [...allItems, ...items]
      if (allItems.length >= totalCount) break
      startIdx += pageSize
    }

    return allItems.map((item, i) => {
      const claimRaw = item.PRIMARY_FNCLTY || ''
      const claims = claimRaw.split(/[,\n·]/).map(s => s.trim()).filter(Boolean)
      const tags = [...new Set(claims.map(c => inferTag(c)))]

      return {
        id: `i${String(i + 1).padStart(4, '0')}`,
        name: item.RAWMTRL_NM || '이름없음',
        category: '개별인정형',
        type: '개별인정형',
        certNumber: item.HF_FNCLTY_MTRAL_RCOGN_NO || null,
        functionalClaims: claims.map(claim => {
          const tag = inferTag(claim)
          return { emoji: EMOJI_MAP[tag] || '📌', tag, claim }
        }),
        tags,
        rda: item.DAY_INTK_LOWLIMIT || null,
        rdaUnit: item.WT_UNIT || null,
        rdaType: '개별인정',
        upperLimit: item.DAY_INTK_HIGHLIMIT || null,
        caution: item.IFTKN_ATNT_MATR_CN || null,
      }
    })
  } catch (e) {
    console.error('개별인정형 API 오류:', e)
    return []
  }
}