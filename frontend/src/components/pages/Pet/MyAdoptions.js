import api from '../../../utils/api'

import { useEffect, useState } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyAdoptions() {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    if (!token) return

    api
      .get('/pets/myadoptions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => setPets(response.data.pets))
      .catch(() => {
        setFlashMessage('Não foi possível carregar suas adoções.', 'error')
      })
  }, [token, setFlashMessage])

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>My Adoptions</h1>
      </div>
      <div className={styles.petslist_container}>
        {pets.map((pet) => (
          <div key={pet._id} className={styles.petlist_row}>
            <RoundedImage
              src={`${process.env.REACT_APP_API}/images/pets/${pet.images?.[0]}`}
              alt={pet.name}
              width="px75"
            />
            <span className="bold">{pet.name}</span>
            <div className={styles.actions}>
              <p>Adoption in progress</p>
            </div>
          </div>
        ))}
        {pets.length === 0 && <p>You have no adoptions yet!</p>}
      </div>
    </section>
  )
}

export default MyAdoptions
