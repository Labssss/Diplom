const Router = require('express')
const router = new Router();
const projectsController = require('../controller/projects.controller')
const roleMiddleware = require('../middleware/roleMiddleware')
const {check} = require("express-validator")

router.post('/projects', roleMiddleware(["USER"]), [
    check('url', "Url не может быть пустым").notEmpty(),
], projectsController.createProject)
router.get('/projects', roleMiddleware(["USER"]), projectsController.getProjects)
router.put('/projects', roleMiddleware(["USER"]), [
    check('url', "Url не может быть пустым").notEmpty(),
], projectsController.updateProject)
router.delete('/projects/:id', roleMiddleware(["USER"]), projectsController.deleteProject)

module.exports = router