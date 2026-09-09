import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

function MyPets(){
    const [pets, setPets] = useState([])

    return(
        <section>
            <div>
            <h1>MyPets</h1>
            <Link to="/pet/add">Register Pet</Link>
            </div>
            <div>
                {pets.length > 0 && <p>Registered pets</p>}
                {pets.length === 0 && <p>No pets registered</p>}
            </div>
        </section>
    )
}

export default MyPets