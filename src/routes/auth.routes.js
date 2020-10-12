import {Router} from 'express'

const router = Router()

import * as AuthCtrl from '../controllers/auth.controller'

router.post('/singin', AuthCtrl.singIn)
router.post('/singup', AuthCtrl.singUp)

export default router