import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

// context
import { UserProvider } from './context/UserContext'

// pages
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
        <Container>
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
        </Container>
      <Footer/>
      </UserProvider>
    </Router>
  )
}

export default App;
