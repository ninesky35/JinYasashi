const mongo = require('mongoose')
mongo.connect('mongodb+srv://Overnait:overunaito@fuu.7yyao.mongodb.net/Bots?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).then(db => {
  console.log('Base de datos conectada.')
})