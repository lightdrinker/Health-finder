function IngredientDetail({ item, onBack, onAddToBuilder }) {
  return (
    <div className="detail-page">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>← 뒤로</button>
        <div className="detail-name">{item.name}</div>
        <div className="detail-meta">
          <span className={`badge ${item.type === '고시형' ? 'badge-green' : 'badge-blue'}`}>
            {item.type}
          </span>
          <span className="card-category">{item.category}</span>
        </div>
      </div>

      <div className="detail-body">
        <div className="section-title">기능성</div>
        {item.functionalClaims.map((c, i) => (
          <div key={i} className="claim-line">
            <span className="claim-emoji">{c.emoji}</span>
            <span className="claim-text">{c.claim}</span>
          </div>
        ))}

        {item.rda && (
          <div className="rda-card">
            <div className="rda-label">{item.rdaType}</div>
            <div className="rda-value">
              {item.rda} <span className="rda-unit">{item.rdaUnit}</span>
            </div>
            {item.upperLimit && <div className="rda-note">{item.upperLimit}</div>}
          </div>
        )}

        {item.companyName && (
          <div className="company-card">
            <div className="section-title">인정 정보</div>
            <div className="company-name">{item.companyName}</div>
            {item.certNumber && <div className="cert-number">인정번호: {item.certNumber}</div>}
          </div>
        )}
      </div>

      <button className="cta-btn" onClick={onAddToBuilder}>
        + 조합에 추가
      </button>
    </div>
  )
}

export default IngredientDetail