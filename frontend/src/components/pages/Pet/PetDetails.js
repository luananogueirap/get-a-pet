import api from '../../../utils/api'

import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './PetDetails.module.css'

import RoundedImage from '../../layout/RoundedImage'
import { Context } from '../../../context/UserContext'
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails() {
  const { id } = useParams()
  const { authenticated } = useContext(Context)
  const { setFlashMessage } = useFlashMessage()
  const [pet, setPet] = useState(null)

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

  async function scheduleVisit() {
    if (!authenticated) {
      setFlashMessage('Faça login para agendar uma visita.', 'error')
      return
    }

    try {
      const response = await api.patch(
        `/pets/schedule/${id}`,
        {},
        { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } },
      )
      setPet((currentPet) => ({
        ...currentPet,
        adopter: { name: 'Visit scheduled' },
      }))
      setFlashMessage(response.data.message, 'success')
    } catch (error) {
      setFlashMessage(
        error.response?.data?.message || 'Não foi possível agendar a visita.',
        'error',
      )
    }
  }

  if (!pet) return null

  return (
    <section className={styles.details}>
      <div className={styles.header}>
        <h1>{pet.name}</h1>
        <p>{pet.available ? 'Available for adoption' : 'Already adopted'}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.images}>
          {pet.images?.map((image) => (
            <RoundedImage
              key={image}
              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              alt={pet.name}
            />
          ))}
        </div>

        <div className={styles.info}>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Weight:</strong> {pet.weight}kg</p>
          <p><strong>Color:</strong> {pet.color}</p>
          {pet.description && <p><strong>About:</strong> {pet.description}</p>}
          {pet.user && (
            <div className={styles.owner}>
              <h2>Owner</h2>
              <p>{pet.user.name}</p>
              {pet.user.phone && <p>{pet.user.phone}</p>}
            </div>
          )}
          {pet.available && (
            <button type="button" onClick={scheduleVisit}>
              Schedule a visit
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default PetDetails
