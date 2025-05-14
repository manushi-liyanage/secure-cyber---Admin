const express = require('express')
const {registerUser , loginUser} = require('../controllers/authController');
const {body} = require('express-validator')

const router = express.Router()

// router.post('/' , async (req , res)=>{
//     const {name , email, password} = req.body

//     try{
//         const auth = await Auth.create({name , email , password})
//         res.status(200).json(auth)
//     }catch(error){
//         res.status(400).json({error :error.message})
//     }
// })


router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], registerUser);

router.post('/login', loginUser);

module.exports = router