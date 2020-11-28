const express = require('express')

const TodoCtrl = require('../controllers/todo-controller')

const router = express.Router()

router.get('/todos', TodoCtrl.getTodos)
router.get('/todos/:id', TodoCtrl.getTodo)
router.post('/todos/create', TodoCtrl.createTodo)
router.post('/todos/edit/:id', TodoCtrl.editTodo)
router.delete('/todos/delete/:id', TodoCtrl.deleteTodo)

router.get('/categories', TodoCtrl.getCategories)
router.post('/categories/create', TodoCtrl.createCategory)
router.post('/categories/edit/:id', TodoCtrl.editCategory)

module.exports = router
