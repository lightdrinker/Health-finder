import { interactions } from '../data/interactions'
import { formTypes, FORM_LABELS } from '../data/formTypes'

const TYPE_CONFIG = {
  conflict: { label: '상충', bg: '#FEE2E2', border: '#FCA5A5', text: '#991B1B', icon: '⚠️' },
  caution:  { label: '주의', bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', icon: '⚡' },
  synergy:  { label: '시너지', bg: '#D1FAE5', border: '#6EE7B7', text: '#065F46', icon: '✨' },
}

const SEVERITY_LABEL = { mild: '약함', moderate: '보통', strong: '강함' }

function FormCompatibility({ items }) {
  if (items.length === 0) return null

  const ids = items.map(i => i.id)
  const allForms = ids.map(id => formTypes[id] || [])

  // 모든 성분이 공통으로 지원하는 제형 (교집합) — FORM_LABELS 키 기준으로 자동 확장
  const allFormTypes = Object.keys(FORM_LABELS)
  const compatible = allFormTypes.filter(f => allForms.every(forms => forms.includes(f)))
  const partial    = allFormTypes.filter(f => !compatible.includes(f) && allForms.some(forms => forms.includes(f)))

  // softgel-only 성분이 포함되어 있는지 확인
  const softgelOnlyItems = items.filter(item => {
    const forms = formTypes[item.id] || []
    return forms.length === 1 && forms[0] === 'softgel'
  })

  return (
    <div style={{ marginTop: '16px' }}>
      <div className="section-title">제형 호환성</div>

      {softgelOnlyItems.length > 0 && softgelOnlyItems.length < items.length && (
        <div style={{
          background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px',
          padding: '8px 12px', marginBottom: '10px', fontSize: '11px', color: '#92400E',
        }}>
          ⚡ <strong>{softgelOnlyItems.map(i => i.name).join(', ')}</strong>은 연질캡슐 전용 성분입니다.
          단일 제품으로 통합하려면 별도 제형 검토가 필요합니다.
        </div>
      )}

      {compatible.length > 0 ? (
        <div>
          <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px' }}>전 성분 공통 적용 가능</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
            {compatible.map(f => (
              <span key={f} style={{
                background: '#D1FAE5', color: '#065F46', border: '1px solid #6EE7B7',
                borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: '500',
              }}>
                {FORM_LABELS[f] || f}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ fontSize: '11px', color: '#991B1B', marginBottom: '8px' }}>
          전 성분이 공통으로 지원하는 제형 없음 — 분리 제품 검토 필요
        </div>
      )}

      {partial.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px' }}>일부 성분만 지원</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {partial.map(f => (
              <span key={f} style={{
                background: '#F3F4F6', color: '#9CA3AF', border: '1px solid #E5E7EB',
                borderRadius: '20px', padding: '3px 10px', fontSize: '11px',
              }}>
                {FORM_LABELS[f] || f}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function InteractionPanel({ items }) {
  if (items.length < 2) return null

  const ids = new Set(items.map(i => i.id))

  const found = interactions.filter(
    ({ ingredientA, ingredientB }) => ids.has(ingredientA) && ids.has(ingredientB)
  )

  if (found.length === 0) return null

  const groups = {
    conflict: found.filter(i => i.type === 'conflict'),
    caution:  found.filter(i => i.type === 'caution'),
    synergy:  found.filter(i => i.type === 'synergy'),
  }

  // 성분 ID → 이름 맵
  const nameMap = Object.fromEntries(items.map(i => [i.id, i.name]))

  return (
    <div style={{ marginTop: '16px' }}>
      <div className="section-title">성분 간 상호작용</div>
      {(['conflict', 'caution', 'synergy']).map(type => {
        const list = groups[type]
        if (list.length === 0) return null
        const cfg = TYPE_CONFIG[type]
        return (
          <div key={type} style={{ marginBottom: '8px' }}>
            {list.map(item => (
              <div key={item.id} style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '6px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px' }}>{cfg.icon}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: '700', color: cfg.text,
                    background: 'rgba(255,255,255,0.6)', borderRadius: '4px', padding: '1px 6px',
                  }}>
                    {cfg.label}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: cfg.text }}>
                    {nameMap[item.ingredientA] || item.ingredientA}
                    {' + '}
                    {nameMap[item.ingredientB] || item.ingredientB}
                  </span>
                  <span style={{ fontSize: '10px', color: cfg.text, opacity: 0.7, marginLeft: 'auto' }}>
                    {SEVERITY_LABEL[item.severity]}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: cfg.text, lineHeight: '1.5' }}>
                  {item.note}
                </div>
                <div style={{ marginTop: '4px' }}>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '10px', color: cfg.text, opacity: 0.65, textDecoration: 'underline' }}
                  >
                    출처: {item.source}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export { InteractionPanel, FormCompatibility }
