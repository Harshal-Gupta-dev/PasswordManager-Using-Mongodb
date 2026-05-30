const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const dotenv=require('dotenv')
const cors= require("cors");


const port = 3000
dotenv.config();

app.use(express.json())
app.use(cors())

const url=process.env.MONGOURI;

const client = new MongoClient(url)
const dbname= "Passop";

async function ConnectDB() {
  await client.connect();
  console.log("database is connected");
}


app.get('/', async (req, res) => {
  const db=client.db(dbname);
  const collection = db.collection("password");
  const findresult = await collection.find({}).toArray();
  res.json(findresult);
})

app.post('/', async (req, res) => {
  const db=client.db(dbname);
  const collection=db.collection("password")
  const findresult=await collection.insertOne(req.body);
 res.send({success:true, result: findresult })
})

app.put('/',async(req,res)=>{
  const db=client.db(dbname);
  const collection=db.collection("password")
  const findresult=await collection.updateOne({id: req.body.id}, {$set:req.body});
  res.send({success:true, result: findresult })
})


app.delete('/', async(req, res) => {
  const db=client.db(dbname)
  const collection= db.collection("password")
  const findresult=await collection.deleteOne({id:req.body.id})
  res.send({success:true, result: findresult })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})