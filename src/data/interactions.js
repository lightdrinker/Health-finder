/**
 * 성분 간 상호작용 데이터
 * 출처: NIH Office of Dietary Supplements (ods.od.nih.gov), PubMed
 *
 * type:
 *   "conflict"  — 흡수 저해, 길항, 부작용 증가
 *   "synergy"   — 상호 흡수 증진, 기능 강화
 *   "caution"   — 주의 필요 (고용량 또는 특정 조건에서 문제)
 *
 * severity: "mild" | "moderate" | "strong"
 */

export const interactions = [
  // ─── NIH ODS 기반 ────────────────────────────────────────────────────
  {
    id: "int001",
    ingredientA: "g015", // 칼슘
    ingredientB: "g017", // 철
    type: "conflict",
    severity: "moderate",
    note: "칼슘이 철의 장내 흡수를 경쟁적으로 저해. 다른 시간대 복용 권장 (최소 2시간 간격).",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/",
  },
  {
    id: "int002",
    ingredientA: "g014", // 비타민C
    ingredientB: "g017", // 철
    type: "synergy",
    severity: "moderate",
    note: "비타민C가 비헴철(Fe³⁺)을 흡수 가능한 Fe²⁺로 환원, 흡수율 최대 3배 증가.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/",
  },
  {
    id: "int003",
    ingredientA: "g017", // 철
    ingredientB: "g018", // 아연
    type: "conflict",
    severity: "moderate",
    note: "고용량 철(25 mg 이상)이 아연과 흡수 경쟁. 아연 혈중 농도 저하 가능.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/",
  },
  {
    id: "int004",
    ingredientA: "g018", // 아연
    ingredientB: "g019", // 구리
    type: "conflict",
    severity: "moderate",
    note: "장기 고용량 아연(50 mg/일 이상) 복용 시 구리 흡수 저해 및 결핍 유발 가능.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/",
  },
  {
    id: "int005",
    ingredientA: "g003", // 비타민D
    ingredientB: "g015", // 칼슘
    type: "synergy",
    severity: "strong",
    note: "비타민D가 장내 칼슘 흡수 단백질(TRPV6, calbindin) 발현 촉진. 칼슘 흡수율 크게 증가. 골건강에 핵심 시너지.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
  },
  {
    id: "int006",
    ingredientA: "g004", // 비타민E
    ingredientB: "g005", // 비타민K
    type: "conflict",
    severity: "moderate",
    note: "고용량 비타민E(400 IU 이상)가 비타민K 의존성 응고인자 활성 저해. 항응고 효과 증가 가능.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/",
  },
  {
    id: "int007",
    ingredientA: "g011", // 엽산
    ingredientB: "g012", // 비타민B12
    type: "synergy",
    severity: "moderate",
    note: "엽산과 비타민B12 모두 호모시스테인 대사 필수. 하나가 결핍되면 다른 하나의 효과도 저하.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/",
  },
  {
    id: "int008",
    ingredientA: "g003", // 비타민D
    ingredientB: "g016", // 마그네슘
    type: "synergy",
    severity: "moderate",
    note: "마그네슘이 비타민D 활성화 효소반응(25-OH-D → 1,25-OH₂-D)의 필수 조인자. 마그네슘 부족 시 비타민D 효과 감소.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
  },
  {
    id: "int009",
    ingredientA: "g015", // 칼슘
    ingredientB: "g016", // 마그네슘
    type: "caution",
    severity: "mild",
    note: "고용량 칼슘(1,000 mg 이상)이 마그네슘 흡수와 경쟁. Ca:Mg = 2:1 비율 권장.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/",
  },
  {
    id: "int010",
    ingredientA: "g018", // 아연
    ingredientB: "g016", // 마그네슘
    type: "conflict",
    severity: "mild",
    note: "고용량 아연(142 mg/일)이 마그네슘 균형 저해.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/",
  },
  {
    id: "int011",
    ingredientA: "g005", // 비타민K
    ingredientB: "g003", // 비타민D
    type: "synergy",
    severity: "mild",
    note: "비타민K2가 비타민D로 증가된 칼슘을 뼈에 결합(오스테오칼신 활성화). 칼슘의 혈관 침착 방지.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/",
  },
  {
    id: "int012",
    ingredientA: "g004", // 비타민E
    ingredientB: "g042", // EPA 및 DHA 함유 유지
    type: "synergy",
    severity: "mild",
    note: "비타민E가 오메가3 지방산의 산화 손상 방지. 오메가3 생체 내 안정성 및 항산화 효과 강화.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/",
  },
  {
    id: "int013",
    ingredientA: "g014", // 비타민C
    ingredientB: "g004", // 비타민E
    type: "synergy",
    severity: "mild",
    note: "비타민C가 산화된 비타민E 라디칼을 환원·재생. 항산화 네트워크 상승작용.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/",
  },
  // ─── PubMed 기반 ─────────────────────────────────────────────────────
  {
    id: "int014",
    ingredientA: "g049", // 홍국
    ingredientB: "g034", // 코엔자임Q10
    type: "caution",
    severity: "moderate",
    note: "홍국의 모나콜린K(로바스타틴과 동일 구조)가 HMG-CoA reductase 억제 → CoQ10 합성 경로 차단. CoQ10 결핍 시 근육 피로 가능. 병행 섭취로 보완 권장.",
    source: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/15705235/",
  },
  // ─── 식약처 공전 + 확립된 약리학 기반 ───────────────────────────────
  {
    id: "int015",
    ingredientA: "g045", // 녹차추출물
    ingredientB: "g017", // 철
    type: "conflict",
    severity: "mild",
    note: "녹차의 탄닌(EGCG)이 철과 불용성 복합체 형성. 철 흡수율 저하. 식후 또는 철제와 2시간 간격 복용 권장.",
    source: "식약처 / 문헌",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/",
  },
  {
    id: "int016",
    ingredientA: "g042", // EPA 및 DHA 함유 유지
    ingredientB: "g064", // 은행잎추출물
    type: "caution",
    severity: "moderate",
    note: "오메가3와 은행잎 모두 혈소판 응집 억제 효과. 고용량 병용 시 출혈 위험 증가 가능. 수술 전 2주 복용 중단 고려.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/",
  },
  {
    id: "int017",
    ingredientA: "g042", // EPA 및 DHA 함유 유지
    ingredientB: "g051", // 마늘
    type: "caution",
    severity: "mild",
    note: "오메가3와 마늘 모두 항혈전 효과. 고용량 병용 시 출혈 시간 연장 가능.",
    source: "NIH ODS",
    sourceUrl: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/",
  },
  {
    id: "int018",
    ingredientA: "g047", // 식물스테롤/식물스테롤에스테르
    ingredientB: "g002", // 베타카로틴
    type: "conflict",
    severity: "mild",
    note: "식물스테롤이 장내 베타카로틴 흡수 15–25% 저하. 카로테노이드류 전반에 영향 가능.",
    source: "문헌",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/11880579/",
  },
]
