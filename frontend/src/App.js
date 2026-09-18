import { Switch, Route } from 'react-router-dom'

// components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from './components/layout/Message'
// context
import { UserProvider } from './context/UserContext'

// pages
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/Pet/MyPets'
import MyAdoptions from './components/pages/Pet/MyAdoptions'
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'

function App() {
  return (
      <UserProvider>
      <Navbar />
        <Message/>
        <Container>
          <Switch>
      <Route path ="/login">
        <Login />
      </Route>
      <Route path ="/register">
        <Register />
      </Route>
      <Route path ="/user/profile">
        <Profile />
        </Route>
      <Route path ="/pet/mypets">
        <MyPets />
        </Route>
      <Route path ="/pet/myadoptions">
        <MyAdoptions />
        </Route>
          <Route path ="/pet/add">
        <AddPet />
      </Route>
      <Route path="/pet/edit/:id">
        <EditPet/>
      </Route>
      <Route path ="/pet/:id">
        <PetDetails />
      </Route>
      <Route path ="/">
        <Home />
      </Route>
    </Switch>
        </Container>
      <Footer/>
      </UserProvider>
  )
}

export default App;
