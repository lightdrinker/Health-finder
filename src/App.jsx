import { useState, useEffect } from 'react'
import SearchPage from './pages/SearchPage'
import DBPage from './pages/DBPage'
import BuilderPage from './pages/BuilderPage'
import ProjectPage from './pages/ProjectPage'
import { ingredients as baseIngredients } from './data/ingredients'
import { fetchIndividualIngredients } from './api/foodsafety'
import './components/styles.css'

function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [builder, setBuilder] = useState([])
  const [allIngredients, setAllIngredients] = useState(baseIngredients)
  const [loadingAPI, setLoadingAPI] = useState(true)

  useEffect(() => {
    fetchIndividualIngredients().then(individual => {
      setAllIngredients([...baseIngredients, ...individual])
      setLoadingAPI(false)
    }).catch(() => {
      setLoadingAPI(false)
    })
  }, [])

  const addToBuilder = (item) => {
    setBuilder(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item])
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
          />
        )
      case 'builder':
        return <BuilderPage items={builder} setItems={setBuilder} ingredients={allIngredients} />
      case 'project':
        return <ProjectPage />
      default:
        return null
    }
  }

  return (
    <div className="app">
      <div className="page-content">
        {renderPage()}
      </div>
      <nav className="bottom-nav">
        <button className={activeTab === 'search' ? 'active' : ''} onClick={() => { setActiveTab('search'); setSelectedIngredient(null) }}>
          <span className="nav-icon">🔍</span>
          <span>검색</span>
        </button>
        <button className={activeTab === 'db' ? 'active' : ''} onClick={() => { setActiveTab('db'); setSelectedIngredient(null) }}>
          <span className="nav-icon">📋</span>
          <span>성분DB</span>
        </button>
        <button className={activeTab === 'builder' ? 'active' : ''} onClick={() => setActiveTab('builder')}>
          <span className="nav-icon">⚗️</span>
          <span>조합</span>
        </button>
        <button className={activeTab === 'project' ? 'active' : ''} onClick={() => setActiveTab('project')}>
          <span className="nav-icon">📁</span>
          <span>프로젝트</span>
        </button>
      </nav>
    </div>
  )
}

export default App