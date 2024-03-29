const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ehowy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function  run(){
    try{
         await client.connect();
         const todoCollection = client.db("todoApp").collection("todos")
         app.get('/todos' , async(req,res)=>{
              const query = {}
              const cursor = todoCollection.find(query)
              const todos = await cursor.toArray()
              res.send(todos)
         })
        //app.post todo
         app.post('/todo' , async(req,res)=>{
              const newTodo = req.body ;
              const result = await todoCollection.insertOne(newTodo)
              res.send(result)
            })
     // To-do-id create 
         app.delete('/todos/:id' , async(req,res)=>{
              const id = req.params.id ;
              const query = {_id: ObjectId(id)}
              const result  = await todoCollection.deleteOne(query)
              res.send(result)
            })
    }
    finally{
         //await client.close();
    
    }
    }
    run().catch(console.dir);
    
    
    app.get('/', (req, res) => {
      res.send('Todo server is runnig')
    })
    
    app.listen(port, () => {
      console.log('listenig to the port ' , port)
    })