import express from 'express'
import stockRouter from './stock'

const router = express.Router()

router.use('/stock', stockRouter)

export default router