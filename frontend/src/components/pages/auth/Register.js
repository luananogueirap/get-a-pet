import Input from '../../form/Input'
import styles from '../../form/Form.module.css'
import {Link} from 'react-router-dom'
import { useState, useContext} from 'react'
import {Context} from '../../../context/UserContext'
 
function Register(){
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name] : e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        register(user)
    }

return(
    <section className={styles.form_container} > 
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
         <Input
         text='Name'
         type='text'
         name='name'
         placeholder='Your name'
         handleOnChange={handleChange}
         />
         <Input
         text='Cellphone'
         type='text'
         name='phone'
         placeholder='Your phone'
         handleOnChange={handleChange}
         />
         <Input
         text='E-mail'
         type='email'
         name='email'
         placeholder='Your email'
         handleOnChange={handleChange}
         />
         <Input
         text='Password'
         type='password'
         name='password'
         placeholder='Your password'
         handleOnChange={handleChange}
         />
         <Input
         text='Confirm password'
         type='password'
         name='confirmpassword'
         placeholder='Confirm your password'
         handleOnChange={handleChange}
         />
         <input type='submit' value='Register'/>
         </form>
         <p>
            Already have account? <Link to='/login'>Click here</Link>
         </p>
    </section>
)

}

export default Register