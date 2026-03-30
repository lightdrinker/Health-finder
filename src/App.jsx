import { useState, useEffect, useRef } from 'react'
import SearchPage from './pages/SearchPage'
import DBPage from './pages/DBPage'
import BuilderPage from './pages/BuilderPage'
import ProjectPage from './pages/ProjectPage'
import { ingredients as baseIngredients } from './data/ingredients'
import { fetchIndividualIngredients } from './api/foodsafety'
import './components/styles.css'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [builder, setBuilder] = useState([])
  const [allIngredients, setAllIngredients] = useState(baseIngredients)
  const [loadingAPI, setLoadingAPI] = useState(true)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const pageRef = useRef(null)

  useEffect(() => {
    fetchIndividualIngredients().then(individual => {
      setAllIngredients([...baseIngredients, ...individual])
      setLoadingAPI(false)
    }).catch(() => {
      setLoadingAPI(false)
    })
  }, [])

  const showToast = (msg) => {
    setToast(null)
    clearTimeout(toastTimer.current)
    requestAnimationFrame(() => {
      setToast(msg)
      toastTimer.current = setTimeout(() => setToast(null), 2200)
    })
  }

  const addToBuilder = (item) => {
    if (builder.find(i => i.id === item.id)) return
    setBuilder(prev => [...prev, item])
    showToast(`${item.name} 조합에 추가됐어요`)
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    requestAnimationFrame(() => {
      if (pageRef.current) pageRef.current.scrollTop = 0
    })
  }

  const saveProject = (name) => {
    const project = {
      id: Date.now().toString(),
      name,
      items: builder,
      createdAt: new Date().toISOString(),
    }
    const saved = JSON.parse(localStorage.getItem('hf-projects') || '[]')
    localStorage.setItem('hf-projects', JSON.stringify([project, ...saved]))
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'search':
        return (
          <SearchPage
            ingredients={allIngredients}
            loadingAPI={loadingAPI}
            onSelect={setSelectedIngredient}
            selected={selectedIngredient}
            onAddToBuilder={addToBuilder}
            builder={builder}
          />
        )
      case 'db':
        return (
          <DBPage
            ingredients={allIngredients}
            loadingAPI={loadingAPI}
            onSelect={setSelectedIngredient}
            selected={selectedIngredient}
            onAddToBuilder={addToBuilder}
            builder={builder}
          />
        )
      case 'builder':
        return (
          <BuilderPage
            items={builder}
            setItems={setBuilder}
            ingredients={allIngredients}
            onSaveProject={saveProject}
          />
        )
      case 'project':
        return <ProjectPage />
      default:
        return null
    }
  }

  return (
    <div className="app">
      <div className="page-content" ref={pageRef}>
        {renderPage()}
      </div>
      {toast && <div className="toast">{toast}</div>}
      <nav className="bottom-nav">
        <button className={activeTab === 'search' ? 'active' : ''} onClick={() => { switchTab('search'); setSelectedIngredient(null) }}>
          <span className="nav-icon">🔍</span>
          <span>검색</span>
        </button>
        <button className={activeTab === 'db' ? 'active' : ''} onClick={() => { switchTab('db'); setSelectedIngredient(null) }}>
          <span className="nav-icon">📋</span>
          <span>성분DB</span>
        </button>
        <button className={activeTab === 'builder' ? 'active' : ''} onClick={() => switchTab('builder')}>
          <span className="nav-icon-wrap">
            ⚗️
            {builder.length > 0 && <span className="nav-badge">{builder.length}</span>}
          </span>
          <span>조합</span>
        </button>
        <button className={activeTab === 'project' ? 'active' : ''} onClick={() => switchTab('project')}>
          <span className="nav-icon">📁</span>
          <span>프로젝트</span>
        </button>
      </nav>
    </div>
  )
}

export default App