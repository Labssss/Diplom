const db = require('../db.js')
const { validationResult } = require('express-validator')

class UsefullController {
    async createUseful(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании заметки", errors})
            }

            const user_id = req.user.id
            const {title, description, url} = req.body
            const {rows: [useful, ...any]}  = await db.query('INSERT INTO api.useful (user_id, title, description, url) values ($1, $2, $3, $4) RETURNING id, title, description, url', [user_id, title, description, url])
            res.json(useful)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Creation useful error'})
        }
    }

    async getUsefuls(req, res) {
        try {
            const user_id = req.user.id
            const {rows} = await db.query('SELECT id, title, description, url FROM api.useful WHERE user_id = $1 ORDER BY id', [user_id])
            res.json(rows)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get usefuls error'})
        }
    }

    async updateUseful(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при изменении заметки", errors})
            }

            const user_id = req.user.id
            const {id, title, description, url} = req.body
            const {rows: [useful, ...any]}  = await db.query('UPDATE api.useful SET title = $1, description = $2, url = $3 WHERE id = $4 AND user_id = $5 RETURNING id, title, description, url', [title, description, url, id, user_id])
            res.json(useful)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update useful error'})
        }
    }

    async deleteUseful(req, res) {
        try {
            const user_id = req.user.id
            const id = req.params.id
            const {rows: [useful, ...any]}  = await db.query('DELETE FROM api.useful WHERE id = $1 AND user_id = $2 RETURNING id, title, description, url', [id, user_id])
            res.json(useful)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Delete useful error'})
        }
    }
}

module.exports = new UsefullController()