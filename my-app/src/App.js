import './App.css'
import './components/navbar'
import Sidebar from './components/sidebar'
import { Switch, Route } from 'react-router-dom'
import Index from './components'
import CtaButtons from './components/cta-buttons'
import RoundButtons from './components/round-buttons'

function App() {
  return (
    <div className="App">
      <div className="page-layout">
        <Sidebar />
        <div className="content">
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route path="/" exact component={Index} />
                <Route path="/components/cta-buttons" component={CtaButtons} />
                <Route
                  path="/components/round-buttons"
                  component={RoundButtons}
                />
              </Switch>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default App
