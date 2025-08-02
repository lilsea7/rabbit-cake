// routes/userRoutes.js
import express from 'express';
import { loginUser, registerUser, getProfile, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authMiddleware, getProfile);
userRouter.post('/update', authMiddleware, upload.single('avatar'), updateProfile);

export default userRouter;