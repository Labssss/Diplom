const db = require('../db.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")

const generateAccessToken = (id, email, role, phone) => {
    const payload = {
        id,
        email,
        role,
        phone
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }

            const {email, password, phone} = req.body;
            const {rows: [existingEmail, ...anyExistingEmail]} = await db.query('SELECT * FROM auth.users WHERE Email = $1', [email])
            if (existingEmail) {
                return res.status(400).json({message: "Пользователь с таким почтовым адресом уже существует"})
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const {rows: [user]} = await db.query('INSERT INTO auth.users (email, password, phone) values ($1, $2, $3) RETURNING *', [email, hashPassword, phone])
            const token = generateAccessToken(user.id, user.email, user.role, user.phone)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const {rows: [user, ...anyusers]} = await db.query('SELECT * FROM auth.users WHERE email = $1', [email])
            if (!user) {
                return res.status(400).json({message: `Пользователь ${email} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.email, user.role, user.phone)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()