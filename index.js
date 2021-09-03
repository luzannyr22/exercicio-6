const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)

// We need to parse JSON coming from requests
app.use(express.json())

app.get('/', (re, res) => {
  res.send('EU ESTOU FUNCTIONANDO2!!!')
})

// List tasks
app.get('/tasks', async (req, res) => {
  const data = await tasks.findAll()
  res.send(data)
})

// Create task
app.post('/tasks', async (req, res) => {
  const body = req.body
  const data = await tasks.create(body)
  res.json(data)
})

// Show task
app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const data = await tasks.findByPk(taskId)
  res.send(data)
})

// Update task
app.put('/tasks/:id', async (req, res) => {
  const body = req.body
  const taskId = req.params.id
  const task = await tasks.findByPk(taskId)
  task.update(body)
  res.send(task)
  
})

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const data = await tasks.findByPk(taskId)
  if(data){
    await tasks.destroy({ where: { id: taskId }}) 
    res.send(`Enviando  ${taskId} -> ${data.description } para el infierno`)
  }
  else{
    res.send(`Não encontramos a tareda de id ${taskId}`)
  }
})

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})
