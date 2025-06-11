import express from 'express'
import { userCredits, paymentRazorpay, verifyRazorpay, clerkWebhooks, updateAllUsersCredits } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebhooks)
userRouter.get('/credits', authUser, userCredits)
userRouter.post('/pay-razor', authUser, paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay)
userRouter.post('/update-all-credits', updateAllUsersCredits)
// userRouter.post("/pay-stripe", authUser, paymentStripe)
// userRouter.post("/verify-stripe", authUser, verifyStripe)

export default userRouter