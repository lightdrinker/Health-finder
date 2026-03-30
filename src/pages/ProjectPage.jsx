import { useState } from 'react'
import { formTypes, FORM_LABELS } from '../data/formTypes'

function copyToClipboard(text) {
  // navigator.clipboard 우선 시도, 실패 시 execCommand fallback
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  }
  const el = document.createElement('textarea')
  el.value = text
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0'
  document.body.appendChild(el)
  el.focus()
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  return Promise.resolve()
}

function getCompatibleForms(items) {
  const allFormKeys = Object.keys(FORM_LABELS)
  const allForms = items.map(i => formTypes[i.id] || [])
  return allFormKeys.filter(f => allForms.every(forms => forms.includes(f)))
}

function DosageTable({ items, dosages, onChange }) {
  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 100px 90px 90px',
        gap: '4px',
        fontSize: '10px', fontWeight: '700', color: '#9CA3AF',
        padding: '0 4px 6px',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <span>성분</span>
        <span style={{ textAlign: 'right' }}>함량</span>
        <span style={{ textAlign: 'right' }}>RDA</span>
        <span style={{ textAlign: 'right' }}>RDA %</span>
      </div>

      {items.map(item => {
        const dosage = dosages[item.id] ?? ''
        const rda = item.rda
        const unit = item.rdaUnit || ''
        const pct = (rda && dosage !== '') ? ((parseFloat(dosage) / rda) * 100).toFixed(0) : ''

        const handleDosageChange = (val) => {
          onChange(item.id, val === '' ? '' : parseFloat(val) || '')
        }

        const handlePctChange = (val) => {
          if (!rda) return
          const pctNum = parseFloat(val)
          onChange(item.id, val === '' ? '' : isNaN(pctNum) ? '' : parseFloat(((pctNum / 100) * rda).toFixed(3)))
        }

        const pctColor = pct === '' ? '#9CA3AF'
          : parseFloat(pct) >= 100 ? '#059669'
          : parseFloat(pct) >= 50  ? '#D97706'
          : '#EF4444'

        return (
          <div key={item.id} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 90px 90px',
            gap: '4px',
            alignItems: 'center',
            padding: '6px 4px',
            borderBottom: '1px solid #F3F4F6',
          }}>
            {/* 성분명 */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>{item.name}</div>
              {item.rdaType && (
                <div style={{ fontSize: '9px', color: '#9CA3AF' }}>{item.rdaType}</div>
              )}
            </div>

            {/* 함량 입력 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
              <input
                type="number"
                min="0"
                value={dosage}
                onChange={e => handleDosageChange(e.target.value)}
                placeholder="0"
                style={{
                  width: '58px', textAlign: 'right',
                  border: '1px solid #D1D5DB', borderRadius: '6px',
                  padding: '4px 6px', fontSize: '11px',
                }}
              />
              <span style={{ fontSize: '9px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                {unit.split('/')[0].trim() || 'mg'}
              </span>
            </div>

            {/* RDA */}
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#6B7280' }}>
              {rda != null ? `${rda} ${unit.split('/')[0].trim()}` : '—'}
            </div>

            {/* % 입력 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
              {rda != null ? (
                <>
                  <input
                    type="number"
                    min="0"
                    value={pct}
                    onChange={e => handlePctChange(e.target.value)}
                    placeholder="—"
                    style={{
                      width: '48px', textAlign: 'right',
                      border: `1px solid ${pct === '' ? '#D1D5DB' : pctColor}`,
                      borderRadius: '6px',
                      padding: '4px 6px', fontSize: '11px',
                      color: pctColor, fontWeight: pct !== '' ? '600' : '400',
                    }}
                  />
                  <span style={{ fontSize: '9px', color: pctColor }}>%</span>
                </>
              ) : (
                <span style={{ fontSize: '11px', color: '#D1D5DB' }}>—</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ProjectCard({ project, onDelete, onUpdateDosages }) {
  const [expanded, setExpanded] = useState(false)
  const [dosages, setDosages] = useState(project.dosages || {})

  const compatibleForms = getCompatibleForms(project.items)

  const handleDosageChange = (id, val) => {
    const next = { ...dosages, [id]: val }
    setDosages(next)
    onUpdateDosages(project.id, next)
  }

  return (
    <div className="project-card" style={{ cursor: 'default' }}>
      <div className="project-top">
        <div
          className="project-name"
          style={{ cursor: 'pointer' }}
          onClick={() => setExpanded(p => !p)}
        >
          {expanded ? '▼ ' : '▶ '}{project.name}
        </div>
        <button className="delete-btn" onClick={() => onDelete(project.id)}>삭제</button>
      </div>

      {/* 기능성 태그 */}
      <div className="project-tags">
        {[...new Set(project.items.flatMap(i => i.tags))].slice(0, 5).map(tag => (
          <span key={tag} className="tag-pill green">{tag}</span>
        ))}
      </div>

      {/* 제형 호환성 */}
      {compatibleForms.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
          {compatibleForms.map(f => (
            <span key={f} style={{
              background: '#D1FAE5', color: '#065F46', border: '1px solid #6EE7B7',
              borderRadius: '20px', padding: '2px 8px', fontSize: '10px', fontWeight: '500',
            }}>
              {FORM_LABELS[f]}
            </span>
          ))}
        </div>
      )}

      {/* 접힌 상태: 성분 간단 목록 */}
      {!expanded && (
        <div className="project-items" style={{ marginTop: '8px' }}>
          {project.items.map(item => (
            <div key={item.id} className="project-item">• {item.name}</div>
          ))}
        </div>
      )}

      {/* 펼친 상태: 함량 입력 테이블 */}
      {expanded && (
        <DosageTable
          items={project.items}
          dosages={dosages}
          onChange={handleDosageChange}
        />
      )}

      <button className="copy-btn" style={{ marginTop: '12px' }} onClick={() => {
        const text = `[${project.name}]\n` +
          project.items.map(item => {
            const d = dosages[item.id]
            const unit = item.rdaUnit?.split('/')[0].trim() || 'mg'
            const rda = item.rda
            const pct = (rda && d) ? ` (RDA ${((d / rda) * 100).toFixed(0)}%)` : ''
            const dosageStr = d ? ` ${d}${unit}${pct}` : ''
            return `• ${item.name}${dosageStr}\n  ${item.functionalClaims.map(c => c.claim).join(' / ')}`
          }).join('\n')
        copyToClipboard(text)
          .then(() => alert('클립보드에 복사됐어요!'))
          .catch(() => alert('복사 실패 — 텍스트를 직접 선택해서 복사해주세요'))
      }}>
        클립보드 복사
      </button>
    </div>
  )
}

function ProjectPage() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('hf-projects')
    return saved ? JSON.parse(saved) : []
  })

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    localStorage.setItem('hf-projects', JSON.stringify(updated))
  }

  const updateDosages = (id, dosages) => {
    const updated = projects.map(p => p.id === id ? { ...p, dosages } : p)
    setProjects(updated)
    localStorage.setItem('hf-projects', JSON.stringify(updated))
  }

  if (projects.length === 0) {
    return (
      <div className="project-page">
        <div className="db-header">
          <h2>프로젝트</h2>
        </div>
        <div className="empty-state">
          <p>저장된 프로젝트가 없어요</p>
          <p className="empty-sub">조합 빌더에서 성분을 조합하고 저장해보세요</p>
        </div>
      </div>
    )
  }

  return (
    <div className="project-page">
      <div className="db-header">
        <h2>프로젝트</h2>
        <p>{projects.length}개 저장됨</p>
      </div>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={deleteProject}
          onUpdateDosages={updateDosages}
        />
      ))}
    </div>
  )
}

export default ProjectPage
