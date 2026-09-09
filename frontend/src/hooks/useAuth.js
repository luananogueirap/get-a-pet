import api from '../utils/api'

import { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user){

        let msgText = 'Sucessfull register'
        let msgType = 'success'

        try {
            const response = await api.post('/users/register', user)
            await authUser(response.data)

        } catch(error){
            msgText = error.response?.data?.message || 'Erro ao conectar com o servidor'
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
      }

      async function authUser(data){

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        history.push('/')

      }

      function logout(){
        const msgText = 'logout'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        history.push('/')
        setFlashMessage(msgText, msgType)
      }

    return {authenticated, register, logout}
}
