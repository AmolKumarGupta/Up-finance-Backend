import express from 'express'
import Auth from '../controllers/Auth'
import auth from '../middlewares/auth'

const router = express.Router()

router.post('/signup', Auth.signup)
router.post('/login', auth, Auth.login)

export default router
