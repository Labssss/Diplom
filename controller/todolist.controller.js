const db = require('../db.js')
const { validationResult } = require('express-validator')

class TodoListController {
    async createTodoList(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании задачи", errors})
            }

            const user_id = req.user.id
            const {complete_date, title, description} = req.body
            const {rows: [newTodoList, ...any]}  = await db.query('INSERT INTO api.todolist (user_id, complete_date, title, description) values ($1, $2, $3, $4) RETURNING id, complete_date, title, description', [user_id, complete_date, title, description])
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Creation todolist error'})
        }
    }

    async getTodoLists(req, res) {
        try {
            const user_id = req.user.id
            const {rows} = await db.query('SELECT complete_date::text FROM api.todolist WHERE user_id = $1 GROUP BY complete_date ORDER BY complete_date', [user_id])
            const dates = rows

            let todoLists = await Promise.all(dates.map(async e => {
                let {rows} = await db.query('SELECT id, complete_date::text, title, description, completed FROM api.todolist WHERE complete_date = $1 AND user_id = $2 ORDER BY id', [e.complete_date, user_id])
                return {
                    date: e.complete_date,
                    items: rows
                }
            }))
            res.json(todoLists)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get todolist error'})
        }
    }

    async updateTodoList(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при изменении задачи", errors})
            }

            const user_id = req.user.id
            const {id, title, description} = req.body

            if (req.query.completed) {
                const {rows: [todoList, ...any]} = await db.query('UPDATE api.todolist SET completed = TRUE WHERE id = $1 AND user_id = $2 RETURNING id, complete_date::text, title, description, completed', [id, user_id])
                return res.json(todoList)
            }

            const {rows: [todoList, ...any]} = await db.query('UPDATE api.todolist SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING id, complete_date::text, title, description, completed', [title, description, id, user_id])
            res.json(todoList)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update todolist error'})
        }
    }

    async deleteTodoList(req, res) {
        try {
            const user_id = req.user.id
            const id = req.params.id
            const {rows: [todoList, ...any]}  = await db.query('DELETE FROM api.todolist WHERE id = $1 AND user_id = $2', [id, user_id])
            res.json(todoList)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Delete todolist error'})
        }
    }
    
}

module.exports = new TodoListController()