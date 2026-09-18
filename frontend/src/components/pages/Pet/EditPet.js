import api from '../../../utils/api'

import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPet() {
  const { id } = useParams()
  const history = useHistory()
  const [pet, setPet] = useState(null)
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((response) => setPet(response.data.pet))
      .catch((error) => {
        setFlashMessage(
          error.response?.data?.message || 'Não foi possível carregar o pet.',
          'error',
        )
      })
  }, [id, setFlashMessage])

  async function updatePet(petData) {
    const formData = new FormData()

    Object.keys(petData).forEach((key) => {
      if (key === 'images') {
        petData[key].forEach((image) => formData.append('images', image))
      } else if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt') {
        formData.append(key, petData[key])
      }
    })

    try {
      const response = await api.patch(`/pets/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setFlashMessage(response.data.message, 'success')
      history.push('/pet/mypets')
    } catch (error) {
      setFlashMessage(
        error.response?.data?.message || 'Não foi possível atualizar o pet.',
        'error',
      )
    }
  }

  if (!pet) return null

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Edit Pet</h1>
        <p>Update the pet information</p>
      </div>
      <PetForm handleSubmit={updatePet} petData={pet} btnText="Save" />
    </section>
  )
}

export default EditPet
