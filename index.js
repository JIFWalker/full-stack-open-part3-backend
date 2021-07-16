require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Contact = require('./models/Contact')
morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})


// Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//Gets all contact data from database
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})


// Adds person to database
app.post('/api/persons', (request, response, next) => {
    const id = Math.floor(Math.random() * 1000000)
    const body = request.body
    const person = new Contact({
      _id: id,
      name: body.name,
      number: body.number
    })

    person.save()
      .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })


// Updates number for specified contact
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, contact)
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})


// Displays number of contacts and the current local date
app.get('/info', (request, response) => {
  Contact.countDocuments(({}), function(err, results){
    response.send(`
    <p>Phonebook has info for ${results} people</p>
    <p>${Date()}</p>`
    )
  })
})


// Gets a specific contact's data from their ID
app.get('/api/persons/:id', (request,response) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Deletes a contact from the phonebook
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Error handling middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

// Port configuration
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})