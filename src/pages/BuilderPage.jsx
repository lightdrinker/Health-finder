import { useState } from 'react'
import { ingredients } from '../data/ingredients'
import IngredientDetail from '../components/IngredientDetail'
import { InteractionPanel, FormCompatibility } from '../components/InteractionPanel'

const TAG_GROUPS = [
  { label: '눈', color: '#185FA5', lightColor: '#E6F1FB', textColor: '#0C447C', tags: ['눈건강'] },
  { label: '뇌/신경', color: '#6B3FA0', lightColor: '#F0E8FB', textColor: '#4A2070', tags: ['인지기능','신경건강','스트레스','신경근육'] },
  { label: '심장/혈관', color: '#C0392B', lightColor: '#FDEDEC', textColor: '#922B21', tags: ['혈행개선','혈압','혈중지질','콜레스테롤','혈액건강'] },
  { label: '면역/항산화', color: '#1A7A4A', lightColor: '#E1F5EE', textColor: '#085041', tags: ['면역','항산화','세포건강'] },
  { label: '에너지', color: '#D35400', lightColor: '#FDEBD0', textColor: '#A04000', tags: ['에너지대사','피로개선','기초대사','운동능력','근육건강'] },
  { label: '뼈/관절', color: '#7D6608', lightColor: '#FEF9E7', textColor: '#6B5A08', tags: ['뼈건강','관절건강'] },
  { label: '소화/장', color: '#784212', lightColor: '#FAE5D3', textColor: '#6E2C00', tags: ['장건강','간건강','혈당','영양흡수','영양보충'] },
  { label: '피부', color: '#A0506A', lightColor: '#FBEAF0', textColor: '#7B3A52', tags: ['피부건강','피부보습'] },
  { label: '전신/기타', color: '#4A5568', lightColor: '#F2F3F4', textColor: '#2D3748', tags: ['단백질대사','호르몬','효소활성','전해질균형','태아건강','전립선','구강건강'] },
]

const TAG_COLOR_MAP = {}
TAG_GROUPS.forEach(group => {
  group.tags.forEach(tag => {
    TAG_COLOR_MAP[tag] = { active: group.color, bg: group.lightColor, text: group.textColor }
  })
})

function BuilderPage({ items, setItems, onSaveProject }) {
  const [selectedTags, setSelectedTags] = useState([])
  const [viewDetail, setViewDetail] = useState(null)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [projectName, setProjectName] = useState('')

  const handleSave = () => {
    if (!projectName.trim()) return
    onSaveProject(projectName.trim())
    setProjectName('')
    setShowSaveModal(false)
    alert(`"${projectName}" 프로젝트로 저장됐어요!`)
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const candidates = selectedTags.length === 0 ? [] : ingredients.filter(item =>
    selectedTags.some(tag => item.tags.includes(tag))
  )

  const addToBuilder = (item) => {
    setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item])
  }

  const addAndReturn = (item) => {
    addToBuilder(item)
    setViewDetail(null)
  }

  const removeFromBuilder = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const coveredTags = [...new Set(items.flatMap(i => i.tags))]
  const allTagsList = [...new Set(TAG_GROUPS.flatMap(g => g.tags))]

  if (viewDetail) {
    return (
      <IngredientDetail
        item={viewDetail}
        onBack={() => setViewDetail(null)}
        onAddToBuilder={() => addAndReturn(viewDetail)}
      />
    )
  }

  return (
    <div className="builder-page">
      <div className="builder-header">
        <h2>조합 빌더</h2>
        <p>원하는 기능성을 선택하면 성분을 추천해드려요</p>
      </div>

      <div className="section">
        <div className="section-title">STEP 1 — 기능성 선택</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {TAG_GROUPS.map(group => (
            <div key={group.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{
                fontSize: '10px', fontWeight: '600', color: group.color,
                width: '56px', flexShrink: 0, paddingTop: '5px'
              }}>
                {group.label}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {group.tags.map(tag => {
                  const isActive = selectedTags.includes(tag)
                  return (
                    <button key={tag} onClick={() => toggleTag(tag)} style={{
                      background: isActive ? group.color : group.lightColor,
                      color: isActive ? '#fff' : group.textColor,
                      border: 'none', borderRadius: '20px',
                      padding: '4px 10px', fontSize: '11px',
                      cursor: 'pointer', fontWeight: isActive ? '500' : '400',
                    }}>
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="section">
          <div className="section-title">STEP 2 — 성분 후보 ({candidates.length}개)</div>
          <div className="candidate-list">
            {candidates.map(item => {
              const isAdded = items.find(i => i.id === item.id)
              const matchedTags = item.tags.filter(t => selectedTags.includes(t))
              return (
                <div key={item.id} className="candidate-card" onClick={() => setViewDetail(item)}>
                  <div className="candidate-info">
                    <div className="candidate-name">{item.name}</div>
                    <div className="candidate-tags">
                      {matchedTags.map(t => {
                        const color = TAG_COLOR_MAP[t]
                        return (
                          <span key={t} style={{
                            background: color?.bg || '#F1EFE8',
                            color: color?.text || '#444',
                            fontSize: '9px', padding: '2px 7px', borderRadius: '20px',
                          }}>
                            {t}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <button
                    className={`add-btn ${isAdded ? 'added' : ''}`}
                    onClick={e => { e.stopPropagation(); isAdded ? removeFromBuilder(item.id) : addToBuilder(item) }}
                  >
                    {isAdded ? '✓' : '+'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="section">
          <div className="section-title">STEP 3 — 내 조합 ({items.length}개)</div>
          <div className="selected-chips">
            {items.map(item => (
              <div key={item.id} className="selected-chip">
                {item.name}
                <button onClick={() => removeFromBuilder(item.id)}>×</button>
              </div>
            ))}
          </div>
          <div className="section-title" style={{ marginTop: '16px' }}>기능성 커버리지</div>
          <div className="heatmap">
            {allTagsList.map(tag => {
              const color = TAG_COLOR_MAP[tag]
              const isCovered = coveredTags.includes(tag)
              return (
                <div key={tag} className="hm-cell" style={isCovered ? {
                  background: color?.active || '#0C5F46', color: '#fff',
                } : {
                  background: '#F1EFE8', color: '#B4B2A9',
                }}>
                  {tag}
                </div>
              )
            })}
          </div>

          <InteractionPanel items={items} />
          <FormCompatibility items={items} />

          <button
            onClick={() => setShowSaveModal(true)}
            style={{
              marginTop: '20px', width: '100%',
              background: '#0C5F46', color: '#fff',
              border: 'none', borderRadius: '10px',
              padding: '12px', fontSize: '14px', fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            프로젝트로 저장
          </button>
        </div>
      )}

      {showSaveModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '24px',
            width: '280px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>
              프로젝트 이름
            </div>
            <input
              autoFocus
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="예: 30대 여성 피로개선 v1"
              style={{
                width: '100%', boxSizing: 'border-box',
                border: '1px solid #D1D5DB', borderRadius: '8px',
                padding: '10px 12px', fontSize: '13px', marginBottom: '16px',
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowSaveModal(false)}
                style={{
                  flex: 1, padding: '10px', borderRadius: '8px',
                  border: '1px solid #D1D5DB', background: '#fff',
                  fontSize: '13px', cursor: 'pointer',
                }}
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={!projectName.trim()}
                style={{
                  flex: 1, padding: '10px', borderRadius: '8px',
                  border: 'none', background: projectName.trim() ? '#0C5F46' : '#D1D5DB',
                  color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuilderPage