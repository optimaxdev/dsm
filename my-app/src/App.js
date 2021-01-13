import './App.css'
import './components/navbar'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import { Switch, Route } from 'react-router-dom'
import Index from './components'
import CtaButtons from './components/cta-buttons'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <div className="content">
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route path="/" exact component={Index} />
                <Route path="/components/cta-buttons" component={CtaButtons} />
              </Switch>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default App
