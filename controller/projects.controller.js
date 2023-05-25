const db = require('../db.js')
const { validationResult } = require('express-validator')

class ProjectsController {
    async createProject(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании заметки", errors})
            }

            const user_id = req.user.id
            const {url} = req.body
            const {rows: [project, ...any]}  = await db.query('INSERT INTO api.projects (user_id, url) values ($1, $2) RETURNING id, url', [user_id, url])
            res.json(project)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Creation project error'})
        }
    }

    async getProjects(req, res) {
        try {
            const user_id = req.user.id
            const {rows} = await db.query('SELECT id, url FROM api.projects WHERE user_id = $1 ORDER BY id', [user_id])
            res.json(rows)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get projects error'})
        }
    }

    async updateProject(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при изменении заметки", errors})
            }

            const user_id = req.user.id
            const {id, url} = req.body
            const {rows: [project, ...any]}  = await db.query('UPDATE api.projects SET url = $1 WHERE id = $2 AND user_id = $3 RETURNING id, url', [url, id, user_id])
            res.json(project)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update project error'})
        }
    }

    async deleteProject(req, res) {
        try {
            const user_id = req.user.id
            const id = req.params.id
            const {rows: [project, ...any]}  = await db.query('DELETE FROM api.projects WHERE id = $1 AND user_id = $2', [id, user_id])
            res.json(project)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Delete project error'})
        }
    }
    
}

module.exports = new ProjectsController()