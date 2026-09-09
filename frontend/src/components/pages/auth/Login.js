import {useState, useContext} from 'react'
import Input from '../../form/Input'

import styles from '../../form/From.module.css'

import {Context} from '../../../context/UserContext'

function Login(){

    function handleChange(e){}
    
return(
    <section className={styles.form_container}>
        <h1>Login</h1>
        <form>
            <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            handleOnChange={handleChange}/>
        </form>
    </section>
)

}

export default Login