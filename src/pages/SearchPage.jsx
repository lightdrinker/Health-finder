import { useState } from 'react'
import IngredientCard from '../components/IngredientCard'
import IngredientDetail from '../components/IngredientDetail'

function SearchPage({ ingredients, loadingAPI, onSelect, selected, onAddToBuilder, builder }) {
  const [query, setQuery] = useState('')

  const search = (q) => {
    if (!q) return []
    return ingredients.filter(item =>
      item.name.includes(q) ||
      item.tags.some(t => t.includes(q)) ||
      item.functionalClaims.some(c => c.claim.includes(q))
    )
  }

  const results = search(query)

  if (selected) {
    return <IngredientDetail item={selected} onBack={() => onSelect(null)} onAddToBuilder={() => { onAddToBuilder(selected); onSelect(null) }} />
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="app-title">건식 성분 마스터</h1>
        <p className="app-sub">
          고시형 97종{loadingAPI ? ' · 개별인정형 로딩 중...' : ` · 전체 ${ingredients.length}종`}
        </p>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="성분명 또는 기능성 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && <button className="clear-btn" onClick={() => setQuery('')}>✕</button>}
        </div>
      </div>

      <div className="search-results">
        {query === '' && (
          <div className="empty-state">
            <p>성분명이나 기능성 키워드를 입력하세요</p>
            <p className="empty-sub">예: 비타민, 항산화, 눈건강</p>
          </div>
        )}
        {query !== '' && results.length === 0 && (
          <div className="empty-state">
            <p>검색 결과가 없어요</p>
          </div>
        )}
        {results.map(item => (
          <IngredientCard
            key={item.id}
            item={item}
            onSelect={() => onSelect(item)}
            onAddToBuilder={() => onAddToBuilder(item)}
            isInBuilder={!!builder?.find(i => i.id === item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchPage