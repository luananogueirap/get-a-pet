const { Agent } = require('http')
const Pet = require('../models/Pet')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

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

        if(images.length === 0){
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

    static async getAll(req, res){

        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets
        })
    }

    static async getAllUserPets(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets
        })
    }

    static async getAllUserAdoptions(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets
        })
    }

    static async getPetById(req, res){

        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({message: 'invalid id'})
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(422).json({message: 'pet not found'})
        }

        res.status(200).json({
            pet:pet
        })
    }

}