const { Agent } = require('http')
const Pet = require('../models/Pet')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController{

    static async create(req, res){

        const {name, age, weight, color} = req.body
        
        const images = req.files

        const available = true

        if(!name){
            res.status(422).json({message: 'name required'})
            return
        }

        if(!age){
            res.status(422).json({message: 'age required'})
            return
        }

        if(!weight){
            res.status(422).json({message: 'weight required'})
            return
        }

        if(!color){
            res.status(422).json({message: 'color required'})
            return
        }

        if(!images){
            res.status(422).json({message: 'images required'})
            return
        }

        // pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try{

            const newPet = await pet.save()
            res.status(201).json({
                message: 'succesfull register',
                newPet
            })

        } catch(error){
            res.status(500).json({message: error})
        }
    }
}