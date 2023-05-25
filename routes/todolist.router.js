const Router = require('express')
const router = new Router();
const todoListController = require('../controller/todolist.controller')
const roleMiddleware = require('../middleware/roleMiddleware')
const {check} = require("express-validator")

router.post('/todolist', roleMiddleware(["USER"]), [
    check('title', "Title не может быть пустым").notEmpty(),
    check('complete_date', "Complete_date не может быть пустым").notEmpty(),
], todoListController.createTodoList)
router.get('/todolist', roleMiddleware(["USER"]), todoListController.getTodoLists)
router.put('/todolist', roleMiddleware(["USER"]), [
    check('title', "Title не может быть пустым").notEmpty(),
], todoListController.updateTodoList)
router.delete('/todolist/:id', roleMiddleware(["USER"]), todoListController.deleteTodoList)

module.exports = router