import { useState } from 'react'

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

  const copyToClipboard = (project) => {
    const text = `[${project.name}]\n` +
      project.items.map(item =>
        `• ${item.name}\n  ${item.functionalClaims.map(c => c.claim).join(' / ')}`
      ).join('\n')
    navigator.clipboard.writeText(text)
    alert('클립보드에 복사됐어요!')
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
        <div key={project.id} className="project-card">
          <div className="project-top">
            <div className="project-name">{project.name}</div>
            <button className="delete-btn" onClick={() => deleteProject(project.id)}>삭제</button>
          </div>
          <div className="project-tags">
            {[...new Set(project.items.flatMap(i => i.tags))].slice(0, 5).map(tag => (
              <span key={tag} className="tag-pill green">{tag}</span>
            ))}
          </div>
          <div className="project-items">
            {project.items.map(item => (
              <div key={item.id} className="project-item">• {item.name}</div>
            ))}
          </div>
          <button className="copy-btn" onClick={() => copyToClipboard(project)}>
            클립보드 복사
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProjectPage