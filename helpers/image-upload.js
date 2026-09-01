const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destionation: function(req, file, cb){
        let folder = ""

        if(req.baseUrl.include('users')){
            folder = 'users'
        } else if(req.baseUrl.includes('pets')){
            folder = 'pets'
        }

        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('please send just jpg or png'))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}