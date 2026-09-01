const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController{

    static async register(req, res){
        const {name, email, phone, password, confirmpassword} = req.body

        if(!name){
            res.status(422).json({message: 'obligatory name'})
            return
        }
        if(!email){
            res.status(422).json({message: 'email name'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'obligatory phone'})
            return
        }
        if(!password){
            res.status(422).json({message: 'obligatory password'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'obligatory confirm password'})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: 'obligatory same password'})
            return
        }

        const userExists = await User.findOne({email: email})

        if(userExists){
            res.status(422).json({
                message: 'please, put other email'
            })
            return
        }

        //password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })
        
        try{
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)
        } catch(error){
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: 'email is obligatory'})
            return
        }

        if(!password){
            res.status(422).json({message: 'password is obligatory'})
            return
        }

        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'email not registered'})
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        
        if(!checkPassword){
            res.status(422).json({message: 'invalid password'})
            return
        }

        await createUserToken(user, req, res)
    }
}