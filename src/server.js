require('dotenv').config();
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const helmet = require('helmet')
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const morgan = require('morgan')


/* variables */
let USER = "leo",
    PASSWORD = "leoeslomas",
    DB = "alkemy"
const DB_URL = `mongodb://${USER}:${PASSWORD}@cluster0-shard-00-00.yz03y.mongodb.net:27017,cluster0-shard-00-01.yz03y.mongodb.net:27017,cluster0-shard-00-02.yz03y.mongodb.net:27017/${DB}?ssl=true&replicaSet=atlas-ump2qn-shard-0&authSource=admin&retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('MongoDB conectado');
})

//midlewares
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
/* app.use(express.json()); */
app.use(bodyParser.json());
app.use(cors());
app.use(helmet())
app.use(morgan())


app.use('/' , routes );



try {
    app.listen(PORT, () => { 
        console.log(`Server on port  http://localhost:${PORT}`);
    })
} catch (error) {
    console.log(`Error on port ${PORT}`, error); 
}

module.exports=app