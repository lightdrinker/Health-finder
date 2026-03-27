import { useState } from 'react'
import IngredientCard from '../components/IngredientCard'
import IngredientDetail from '../components/IngredientDetail'

function DBPage({ ingredients, loadingAPI, onSelect, selected, onAddToBuilder }) {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [activeTag, setActiveTag] = useState(null)

  const categories = ['전체', '영양성분', '기능성원료', '식이섬유원료', '개별인정형']
  const allTags = [...new Set(ingredients.flatMap(i => i.tags))]

  const filtered = ingredients.filter(item => {
    const categoryMatch = activeCategory === '전체' || item.category === activeCategory
    const tagMatch = !activeTag || item.tags.includes(activeTag)
    return categoryMatch && tagMatch
  })

  if (selected) {
    return (
      <IngredientDetail
        item={selected}
        onBack={() => onSelect(null)}
        onAddToBuilder={() => { onAddToBuilder(selected); onSelect(null) }}
      />
    )
  }

  return (
    <div className="db-page">
      <div className="db-header">
        <h2>성분 DB</h2>
        <p>{loadingAPI ? '로딩 중...' : `${filtered.length}개`}</p>
      </div>
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => { setActiveCategory(cat); setActiveTag(null) }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="tag-filters">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag-chip ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="ingredient-list">
        {filtered.map(item => (
          <IngredientCard
            key={item.id}
            item={item}
            onSelect={() => onSelect(item)}
            onAddToBuilder={() => onAddToBuilder(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default DBPage