function IngredientCard({ item, onSelect, onAddToBuilder, isInBuilder }) {
  return (
    <div className="ingredient-card" onClick={onSelect}>
      <div className="card-top">
        <div>
          <div className="card-name">{item.name}</div>
          <div className="card-meta">
            <span className={`badge ${item.type === '고시형' ? 'badge-green' : 'badge-blue'}`}>
              {item.type}
            </span>
            <span className="card-category">{item.category}</span>
            {item.rda && <span className="card-rda">{item.rda}{item.rdaUnit}</span>}
          </div>
        </div>
        <button
          className={`add-to-builder${isInBuilder ? ' added' : ''}`}
          onClick={e => { e.stopPropagation(); if (!isInBuilder) onAddToBuilder() }}
        >
          {isInBuilder ? '✓ 추가됨' : '+ 조합'}
        </button>
      </div>
      <div className="card-claims">
        {item.functionalClaims.map((c, i) => (
          <div key={i} className="claim-line">
            <span className="claim-emoji">{c.emoji}</span>
            <span className="claim-text">{c.claim}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IngredientCard