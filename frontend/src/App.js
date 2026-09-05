import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// pages
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
    <Switch>
      <Route path ="/login">
        <Login />
      </Route>
      <Route path ="/register">
        <Register />
      </Route>
      <Route path ="/">
        <Home />
      </Route>
    </Switch>
    </Router>
  )
}

export default App;
