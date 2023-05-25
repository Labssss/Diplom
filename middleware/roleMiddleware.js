const jwt = require('jsonwebtoken')
const {secret} = require('../config')


module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const user = jwt.verify(token, secret)
            let hasRole = false
            if (user.role.includes(role)) {
                hasRole = true
            }
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            req.user = user
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};