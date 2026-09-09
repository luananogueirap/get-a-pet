import {useState, useContext} from 'react'
import Input from '../../form/Input'

import {Link} from 'react-router-dom'

import styles from '../../form/Form.module.css'

import {Context} from '../../../context/UserContext'

function Login(){
    const [user, setUser] = useState({})
    const {login} = useContext (Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }
    
return(
    <section className={styles.form_container}>
        <h1>Login</h1>
        <form>
        <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Enter your email"
            handleOnChange={handleChange}/>
        <Input
            text="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            handleOnChange={handleChange}/>
        <input type="submit" value="Log In"/>
        </form>
        <p>
            Don't have an account? <Link to="/register">Click here</Link>
        </p>
    </section>
)

}

export default Login
