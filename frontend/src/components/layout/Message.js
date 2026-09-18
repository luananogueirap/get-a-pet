import { useState, useEffect } from 'react'
import styles from './Message.module.css'
import bus from '../../utils/bus'

function Message(){
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    function formatMessage(value){
        if(typeof value === 'string') return value
        if(value?.errors){
            return Object.values(value.errors)
                .map((error) => error.message)
                .join(' ')
        }
        return value?.message || 'Ocorreu um erro inesperado'
    }

    useEffect(() => {

        bus.addListener('flash', ({message, type}) => {
            setVisibility(true)
            setMessage(formatMessage(message))
            setType(type)

            setTimeout(() => {
                setVisibility(false)
            }, 3000)

        })

    }, [])

    return(
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        )
    )
}

export default Message
