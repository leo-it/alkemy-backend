require('dotenv').config();
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

let USER = "leo",
PASSWORD = "leoeslomas",
DB = "alkemy"
const DB_URL=`mongodb://${USER}:${PASSWORD}@cluster0-shard-00-00.yz03y.mongodb.net:27017,cluster0-shard-00-01.yz03y.mongodb.net:27017,cluster0-shard-00-02.yz03y.mongodb.net:27017/${DB}?ssl=true&replicaSet=atlas-ump2qn-shard-0&authSource=admin&retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

mongoose.connect(DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, () => {
    console.log('MongoDB conectado');
})


const app = express();
 app.use(cors());
app.use(express.json()); 
//app.use('/' , routes );

try {
    app.listen(PORT, () => { //Escuchamos al puesto PORT
        console.log(`Server on port  http://localhost:${PORT}`);
    })
} catch (error) {
    console.log(`Error on port ${PORT}`, error); //En caso de error veremos esto en nuestra consola
}


