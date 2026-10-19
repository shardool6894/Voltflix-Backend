const express = require('express')
const authRouter = express.Router();
const { middleWareFn } = require('../middleware/auth')
const { validateRequest } = require('../middleware/zod')
const { registerValidation, loginValidation } = require('../zodSchemas/users')
const { login, register, logout, getProfile, updateProfile, changePassword, deleteProfile } = require('../controllers/auth');
const { authLimiter } = require('../middleware/rateLimiter');
authRouter.post('/login', authLimiter, validateRequest(loginValidation), login)
authRouter.post('/register', authLimiter, validateRequest(registerValidation), register)
authRouter.post('/logout', logout)
authRouter.get("/me", middleWareFn, getProfile);
authRouter.put("/me", middleWareFn, updateProfile);
authRouter.put("/change-password", middleWareFn, changePassword);
authRouter.delete("/me", middleWareFn, deleteProfile);
module.exports = { authRouter }