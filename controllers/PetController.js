const { Agent } = require('http')
const Pet = require('../models/Pet')

module.exports = class PetController{

    static async create(req, res){

        const {name, age, weight, color} = req.body

        const available = true

        if(!name){
            res.status(422).json({message: 'name required'})
        }

        if(!age){
            res.status(422).json({message: 'age required'})
        }

        if(!weight){
            res.status(422).json({message: 'weight required'})
        }

        if(!color){
            res.status(422).json({message: 'color required'})
        }

    }

}