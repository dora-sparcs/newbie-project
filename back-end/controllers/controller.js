const Todo = require('../models/todo-model')
const Category = require('../models/category-model')

getTodos = async(req, res) => {
  await Todo.find({}, (err, todos) => {
    if(err) {
      return res.status(400).json({ success: false, error: err })
    }
    if(!todos.length) {
      return res.status(404)
                .json({ success: false, error: `Todo not found` })
    }
    return res.status(200).json(todos)
  })
  .catch(err => console.log(err))
}

getTodo = (req, res) => {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    res.json(todo);
  });
}

createTodo = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a todo',
    })
  }

  const todo = new Todo(body)

  if(!todo) {
    return res.status(400).json({ success: false, error: err })
  }

  todo.save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: todo._id,
          message: 'Todo created!',
        })
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: 'Todo not created!',
        })
      })
}

editTodo = async(req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Todo.findById({ _id: req.params.id }, (err, todo) => {
    if(err) {
      return res.status(404).json({
        err,
        message: 'Todo not found!',
      })
    }
    todo.todo_description = body.todo_description
    todo.todo_date = body.todo_date
    todo.todo_category = body.todo_category
    todo.todo_completed = body.todo_completed
    todo.save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: todo._id,
            message: 'Todo updated!',
          })
        })
        .catch(error => {
          return res.status(404).json({
            error,
            message: 'Todo not updated!',
          })
        })
  })
}

deleteTodo = async(req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id }, (err, todo) => {
    if(err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!todo) {
      return res.status(404)
                .json({ success: false, error: `Todo not found` })
    }

    return res.status(200).json({ success: true, data: todo })
  })
  .catch(err => console.log(err))
}

getCategories = async(req, res) => {
  await Category.find({}, (err, categories) => {
    if(err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!categories.length) {
      return res.status(404)
                .json({ success: false, error: `Category not found` })
    }
    return res.status(200).json(categories)
  })
  .catch(err => console.log(err))
}

createCategory = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a category',
    })
  }

  const category = new Category(body)

  if(!category) {
    return res.status(400).json({ success: false, error: err })
  }

  category.save()
          .then(() => {
            return res.status(201).json({
              success: true,
              id: category._id,
              message: 'Category created!',
            })
          })
          .catch(error => {
            return res.status(400).json({
              error,
              message: 'Category not created!',
            })
          })
}

editCategory = async(req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Category.findById({ _id: req.params.id }, (err, category) => {
    if(err) {
      return res.status(404).json({
        err,
        message: 'Category not found!',
      })
    }
    category.category_name = body.category_name
    category.category_selected = !body.category_selected
    category.save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: category._id,
            message: 'Category updated!',
          })
        })
        .catch(error => {
          return res.status(404).json({
            error,
            message: 'Category not updated!',
          })
        })
  })
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
  getCategories,
  createCategory,
  editCategory,
}
