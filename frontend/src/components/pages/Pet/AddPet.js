import api from '../../../utils/api'
import styles from './AddPet.module.css'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import PetForm from '../../form/PetForm'

import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet(){

return(
    <section className={styles.addpet_header}>
        <div>
            <h1>Pet register</h1>
            <p>The pet will be disponible to adoption</p>
        </div>
        <PetForm btnText='Register pet'/>
    </section>
    )
}

export default AddPet
