const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
}

const password = process.argv[2]

const url =
    `mongodb+srv://JIFWalker:${password}@full-stack-open.h5eg8.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Contact = mongoose.model('Contact', contactSchema) 

if (process.argv.length > 3) {
    const contact = new Contact ({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then(result => {
        console.log(`added ${contact.name}: ${contact.number} to the phonebook`)
        mongoose.connection.close()
    })
} else {
    Contact.find({}).then(result => {
        console.log('phonebook: ')
        result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

