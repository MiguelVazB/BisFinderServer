import { Router } from 'express';
const userRouter = Router();
import Users from "../models/userModel.js"

userRouter.post("/login", async (req, res) => {
    const {id, name, picture} = req.body
    if (!id) return res.status(400).json({'message': 'ID required.'});
    try {
        const foundUser = await Users.findOne({id:id})
        if (foundUser){
            res.status(200).json('Login success')
        }else{
            const user = new Users({
                id: id,
                name: name,
                picture: picture
            })
            const newUser = user.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }  
})

userRouter.put("/likes", async (req, res) => {
   const {user, likes} = req.body
   try {
    const foundUser = await Users.findOne({id:user.id})
    foundUser.likes = likes
    const updatedUser = await foundUser.save()

    res.json(updatedUser)
   } catch (error) {
    // console.log(error)
    console.log("user not logged in")
   }
})

userRouter.get("/getLikes", async (req, res) => {
    try {
        if (req.query.user){
            const {id} = req.query.user
            const user = await Users.findOne({id:id})
            res.status(200).json(user?.likes) 
        }  
    } catch (error) {
        console.log(error)
    }
})

export default userRouter;