/**
 * 성분별 호환 제형 데이터
 * 출처: 식약처 「건강기능식품의 기준 및 규격」 공전 + 제약 원리
 *
 * 제형 코드:
 *   "tablet"     — 정제
 *   "chewable"   — 츄어블 정제 (씹어먹는 정제)
 *   "capsule"    — 경질캡슐
 *   "softgel"    — 연질캡슐 (유성/지용성 성분)
 *   "granule"    — 과립
 *   "powder"     — 분말
 *   "stick"      — 스틱형 (스틱 포 분말/액상)
 *   "liquid"     — 액상
 *   "beverage"   — 음료 (드링크/앰플)
 *   "gummy"      — 구미 (gummy)
 *   "jelly"      — 젤리 (젤리스틱 포함)
 *   "film"       — 필름형 (구강 붕해 필름)
 *   "bar"        — 바 (영양바/식이섬유바)
 *   "pill"       — 환 (전통 한방 환제)
 *
 * 순서: 가장 적합한 제형을 앞에 배치
 */

export const formTypes = {
  // ─── 지용성 비타민 ───────────────────────────────────────────────────
  g001: ["softgel", "tablet", "capsule", "gummy"],              // 비타민A
  g002: ["softgel", "tablet", "capsule"],                       // 베타카로틴
  g003: ["softgel", "tablet", "capsule", "gummy"],              // 비타민D
  g004: ["softgel", "tablet", "capsule"],                       // 비타민E (오일형 → softgel 권장)
  g005: ["tablet", "capsule", "softgel"],                       // 비타민K

  // ─── 수용성 비타민 B군 + C ───────────────────────────────────────────
  g006: ["tablet", "capsule", "granule"],                       // 비타민B1
  g007: ["tablet", "capsule", "granule"],                       // 비타민B2
  g008: ["tablet", "capsule"],                                  // 나이아신
  g009: ["tablet", "capsule"],                                  // 판토텐산
  g010: ["tablet", "capsule"],                                  // 비타민B6
  g011: ["tablet", "capsule"],                                  // 엽산
  g012: ["tablet", "capsule", "film"],                          // 비타민B12 (필름형 가능 - 설하 흡수)
  g013: ["tablet", "capsule"],                                  // 비오틴
  g014: ["tablet", "chewable", "capsule", "granule", "gummy", "beverage", "film"], // 비타민C

  // ─── 미네랄 ──────────────────────────────────────────────────────────
  g015: ["tablet", "chewable", "capsule", "granule", "gummy", "beverage"], // 칼슘
  g016: ["tablet", "chewable", "capsule", "granule", "gummy"],  // 마그네슘
  g017: ["tablet", "capsule"],                                  // 철 (산화 민감 → 밀봉 필수)
  g018: ["tablet", "capsule", "gummy"],                         // 아연
  g019: ["tablet", "capsule"],                                  // 구리
  g020: ["tablet", "capsule"],                                  // 셀레늄
  g021: ["tablet", "capsule"],                                  // 요오드
  g022: ["tablet", "capsule"],                                  // 망간
  g023: ["tablet", "capsule"],                                  // 몰리브덴
  g024: ["tablet", "capsule"],                                  // 칼륨
  g025: ["tablet", "capsule"],                                  // 크롬

  // ─── 기능성 영양소 ────────────────────────────────────────────────────
  g026: ["granule", "tablet", "capsule", "powder", "bar", "beverage", "stick"], // 식이섬유 (일반)
  g027: ["granule", "powder", "bar", "beverage", "tablet", "capsule", "stick"], // 단백질
  g028: ["softgel"],                                            // 필수지방산 (오일 only)

  // ─── 식물성 원료 ──────────────────────────────────────────────────────
  g029: ["tablet", "capsule", "granule", "beverage", "jelly", "pill", "stick"], // 인삼
  g030: ["tablet", "capsule", "granule", "beverage", "jelly", "pill", "stick"], // 홍삼
  g031: ["tablet", "capsule", "granule", "beverage"],           // 엽록소 함유 식물
  g032: ["tablet", "capsule", "granule", "powder", "beverage"], // 클로렐라
  g033: ["tablet", "capsule", "granule", "powder", "beverage"], // 스피루리나

  // ─── 특수 기능성 원료 ─────────────────────────────────────────────────
  g034: ["softgel", "tablet", "capsule"],                       // 코엔자임Q10 (softgel 생체이용률 우수)
  g035: ["softgel"],                                            // 스쿠알렌 (오일 only)
  g036: ["softgel"],                                            // 알콕시글리세롤 함유 상어간유 (오일 only)
  g037: ["tablet", "capsule", "granule", "beverage"],           // 상황버섯자실체추출물
  g038: ["tablet", "capsule"],                                  // 토마토추출물 (리코펜)
  g039: ["tablet", "capsule"],                                  // 구아바잎추출물
  g040: ["tablet", "capsule"],                                  // 바나바잎추출물
  g041: ["softgel"],                                            // 달맞이꽃종자추출물 (GLA 오일 only)
  g042: ["softgel"],                                            // EPA 및 DHA 함유 유지 (어유 only)
  g043: ["softgel"],                                            // 감마리놀렌산 함유 유지 (오일 only)
  g044: ["tablet", "capsule", "granule", "beverage"],           // 영지버섯자실체추출물
  g045: ["tablet", "capsule", "beverage"],                      // 녹차추출물 (EGCG)
  g046: ["softgel", "granule", "tablet", "capsule"],            // 레시틴
  g047: ["tablet", "capsule"],                                  // 식물스테롤/식물스테롤에스테르
  g048: ["tablet", "capsule", "granule"],                       // 키토산/키토올리고당
  g049: ["tablet", "capsule"],                                  // 홍국
  g050: ["granule", "powder", "bar", "beverage", "tablet", "capsule"], // 대두단백
  g051: ["tablet", "capsule"],                                  // 마늘 (장용 코팅 캡슐 권장)
  g052: ["softgel", "tablet", "capsule"],                       // 공액리놀레산 (CLA)
  g053: ["tablet", "capsule"],                                  // 가르시니아캄보지아추출물
  g054: ["tablet", "capsule", "granule"],                       // 곤약감자추출물
  g055: ["tablet", "capsule"],                                  // 콜레우스포스콜리추출물
  g056: ["softgel", "tablet", "capsule"],                       // 마리골드꽃추출물(루테인) (지용성)
  g057: ["softgel", "tablet", "capsule"],                       // 헤마토코쿠스추출물 (아스타잔틴)
  g058: ["tablet", "capsule"],                                  // 빌베리추출물
  g059: ["tablet", "capsule"],                                  // 대두이소플라본
  g060: ["tablet", "capsule"],                                  // 글루코사민
  g061: ["tablet", "capsule"],                                  // N-아세틸글루코사민(NAG)
  g062: ["tablet", "capsule"],                                  // 뮤코다당·단백
  g063: ["tablet", "capsule", "granule"],                       // 엠에스엠(MSM)
  g064: ["tablet", "capsule"],                                  // 은행잎추출물
  g065: ["softgel", "tablet", "capsule"],                       // 포스파티딜세린 (인지질)
  g066: ["tablet", "capsule", "granule", "gummy", "beverage", "film", "stick"], // 테아닌
  g067: ["tablet", "capsule"],                                  // 홍경천추출물
  g068: ["tablet", "capsule", "granule", "liquid", "beverage"], // 유단백가수분해물

  // ─── 장건강 / 프리·프로바이오틱스 ────────────────────────────────────
  g069: ["granule", "powder", "stick", "tablet", "capsule", "beverage", "jelly"], // 프락토올리고당
  g070: ["capsule", "granule", "stick", "beverage"],            // 프로바이오틱스 (장용 코팅 필수)
  g071: ["tablet", "capsule", "granule"],                       // 폴리감마글루탐산
  g072: ["granule", "powder", "stick"],                         // 라피노스
  g073: ["granule", "powder", "jelly"],                         // 분말한천 (젤리 기재 가능)

  // ─── 피부 / 수분 ──────────────────────────────────────────────────────
  g074: ["tablet", "capsule", "granule", "beverage", "jelly", "stick"], // 히알루론산
  g075: ["tablet", "capsule", "liquid", "beverage", "jelly"],   // 알로에겔
  g076: ["softgel"],                                            // 옥타코사놀 함유 유지 (오일 only)

  // ─── 운동 / 에너지 ────────────────────────────────────────────────────
  g077: ["granule", "powder", "beverage", "stick", "tablet", "capsule"], // 크레아틴

  // ─── 기타 기능성 원료 ─────────────────────────────────────────────────
  g078: ["tablet", "capsule", "liquid", "beverage", "jelly"],   // 알로에 전잎
  g079: ["tablet", "capsule"],                                  // 프로폴리스추출물
  g080: ["tablet", "capsule"],                                  // 밀크씨슬추출물 (실리마린)
  g081: ["tablet", "capsule", "liquid", "beverage", "jelly"],   // 매실추출물
  g082: ["softgel", "tablet", "capsule"],                       // 쏘팔메토열매추출물 (지용성)
  g083: ["tablet", "capsule"],                                  // 회화나무열매추출물 (루틴)

  // ─── 식이섬유 개별 원료 ──────────────────────────────────────────────
  g084: ["granule", "tablet", "capsule", "stick", "beverage"],  // 구아검/구아검가수분해물
  g085: ["granule", "tablet", "capsule", "stick"],              // 글루코만난(곤약)
  g086: ["granule", "tablet", "capsule", "bar", "stick"],       // 귀리식이섬유
  g087: ["granule", "powder", "tablet", "capsule", "beverage", "stick"], // 난소화성말토덱스트린
  g088: ["granule", "tablet", "capsule", "bar"],                // 대두식이섬유
  g089: ["granule", "tablet", "capsule"],                       // 목이버섯식이섬유
  g090: ["granule", "tablet", "capsule", "bar"],                // 밀식이섬유
  g091: ["granule", "tablet", "capsule", "bar", "beverage"],    // 보리식이섬유
  g092: ["granule", "powder", "beverage"],                      // 아라비아검(아카시아검)
  g093: ["granule", "tablet", "capsule", "bar"],                // 옥수수겨식이섬유
  g094: ["granule", "tablet", "capsule", "stick", "beverage"],  // 이눌린/치커리추출물
  g095: ["granule", "tablet", "capsule", "stick"],              // 차전자피식이섬유 (psyllium husk)
  g096: ["granule", "powder", "beverage", "bar"],               // 폴리덱스트로스
  g097: ["granule", "tablet", "capsule", "bar"],                // 호로파종자식이섬유
}

export const FORM_LABELS = {
  tablet:   "정제",
  chewable: "츄어블 정제",
  capsule:  "경질캡슐",
  softgel:  "연질캡슐",
  granule:  "과립",
  powder:   "분말",
  stick:    "스틱형",
  liquid:   "액상",
  beverage: "음료/드링크",
  gummy:    "구미",
  jelly:    "젤리",
  film:     "필름형",
  bar:      "바",
  pill:     "환",
}
