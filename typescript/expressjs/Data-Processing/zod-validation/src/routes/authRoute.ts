import express from 'express';
import { validateData } from '../middleware/validationMiddleware';
import { userRegistrationSchema, userLoginSchema } from '../validationSchemas/authSchema';

const userRouter = express.Router();

import { registerUser, loginUser } from '../controllers/authController';

userRouter.post('/register', validateData(userRegistrationSchema), registerUser);
userRouter.post('/login', validateData(userLoginSchema), loginUser);

export default userRouter;