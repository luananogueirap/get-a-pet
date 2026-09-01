const User = require('../models/User')

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
    }
}