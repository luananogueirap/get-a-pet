import api from '../../../utils/api'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet() {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const history = useHistory()

  async function registerPet(pet) {
    let msgType = 'success'
    let success = true

    const formData = new FormData()

    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append(`images`, pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api
      .post(`pets/create`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        success = false
        return {
          message:
            err.response?.data?.message ||
            err.message ||
            'Não foi possível cadastrar o pet',
        }
      })

    setFlashMessage(data.message, msgType)
    if (success) {
      history.push('/pet/mypets')
    }
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Register a Pet</h1>
        <p>It will then be available for adoption</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Register" />
    </section>
  )
}

export default AddPet
