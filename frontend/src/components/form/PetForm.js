import { useState } from "react"
import formStyles from './Form.module.css'

import Input from './Input'
import Select from './Select'

function PetForm({ handleSubmit, petData, btnText }){

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["White", "Brown", "Orange", "Caramel"]

    function onFileChange(e){
      const images = Array.from(e.target.files || [])
      setPreview(images)
      setPet({...pet, images})
    }

    function handleChange(e){
      setPet({...pet, [e.target.name] : e.target.value})
    }

    function handleColor(e){
      setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e){
      e.preventDefault()
      handleSubmit(pet)
    }

    return (
       <form className={formStyles.form_container} onSubmit={submit}>
        <div className={formStyles.preview_pet_images}>
          {preview.length > 0
            ? preview.map((image, index) => (
                <img src={URL.createObjectURL(image)} 
                className={formStyles.preview_pet_images_img}
                alt={pet.name} 
                key={`${pet.name} + ${index}`} 
                />
            )): 
          pet.images &&
          pet.images.map((image, index) => (
                <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
                className={formStyles.preview_pet_images_img}
                alt={pet.name} 
                key={`${pet.name} + ${index}`} 
                />
          ))
        }
        </div>
            <Input 
              text="Pet images"
              type="file"
              name="images"
              handleOnChange={onFileChange}          
              multiple={true}     
            />
             <Input 
              text="Pet name"
              type="text"
              name="name"
              placeholder="Pets name"
              handleOnChange={handleChange}          
              value={pet.name || ''}
            />
             <Input 
              text="Pet age"
              type="text"
              name="age"
              placeholder="Pets age"
              handleOnChange={handleChange}          
              value={pet.age || ''}
            />
             <Input 
              text="Pet weight"
              type="number"
              name="weight"
              placeholder="Pets weight"
              handleOnChange={handleChange}          
              value={pet.weight || ''}
            />
            <Select
              name="color"
              text="Select color"
              options={colors}
              handleOnChange={handleColor}  
              value={pet.color || ''}
            />
            <input type="submit" value={btnText}/>
       </form>
    )
}

export default PetForm
