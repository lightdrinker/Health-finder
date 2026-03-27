function IngredientCard({ item, onSelect, onAddToBuilder }) {
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
        <button className="add-to-builder" onClick={e => { e.stopPropagation(); onAddToBuilder(); }}>
          + 조합
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