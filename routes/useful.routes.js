const Router = require('express')
const router = new Router();
const usefulController = require('../controller/useful.controller')
const roleMiddleware = require('../middleware/roleMiddleware')
const {check} = require("express-validator")

router.post('/useful', roleMiddleware(["USER"]), [
    check('title', "Title не может быть пустым").notEmpty(),
    check('url', "Url не может быть пустым").notEmpty(),
], usefulController.createUseful)
router.get('/useful', roleMiddleware(["USER"]), usefulController.getUsefuls)
router.put('/useful', roleMiddleware(["USER"]), [
    check('title', "Title не может быть пустым").notEmpty(),
    check('url', "Url не может быть пустым").notEmpty(),
], usefulController.updateUseful)
router.delete('/useful/:id', roleMiddleware(["USER"]), usefulController.deleteUseful)

module.exports = router