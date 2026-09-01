const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

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


    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else{
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){

        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(422).json({message: 'user not found'})
            return
        }

        res.status(200).json({user})
    }

    static async editUser (req, res){

        // check user
        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const { name, email, phone, password, confirmpassword } = req.body || {}


        let image = ''

        if(req.file){
            user.image = req.file.filename
        }

        //validations

        if(!name){
            res.status(422).json({message: 'obligatory name'})
            return
        }
        if(!email){
            res.status(422).json({message: 'email name'})
            return
        }
        
        //email check

        const userExists = await User.findOne({email:email})

        if(user.email !== email && userExists){
            res.status(422).json({message: 'email required'})
            return
        }

        user.email = email

        //

        if(!phone){
            res.status(422).json({message: 'obligatory phone'})
            return
        }

        user.phone = phone
        
        if(password != confirmpassword){
            res.status(422).json({message: `password incorrect`})
            return
        } else if (password === confirmpassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try{
            await User.findOneAndUpdate(
                {_id: user._id},
                {$set: user},
                {new : true}
            )
            res.status(200).json({message: 'user updated'})
        } catch(err){
            res.status(500).json({message: err})
            return
        }
    }
}
