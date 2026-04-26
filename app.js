import express, { json } from 'express';
import { MongoClient } from 'mongodb';

const app=express();
const port=3000;

const url="mongodb://localhost:27017"

const dbName="studb";
const client= new MongoClient(url);

app.use(express.json());
app.set('view engine','ejs');


// app.get('/data',async(req,res)=>{
//     try{
// await client.connect()

// const db=client.db(dbName)
// const collection= db.collection('students')
// const data= await collection.find({}).toArray();

// // res.json(data)

// // send data to ejs template
// res.render('index',{students:data});

//     } catch(err){
// console.log(err);
// res.status(500).send({error:"Error occured"})
//     }
// })

// rest api mongodb 🙌❤

let db;

// data base connection function 

async function connectToDB() {
    await client.connect();
console.log('connected to server correctly');
db=client.db(dbName)
}

app.get('/students',async(req,res)=>{
    await connectToDB();// ensure db connection
    const data= await db.collection('students').find({}).toArray();
    res.json(data)
})

app.get('/ui',async(req,res)=>{
    await connectToDB();// ensure db connection
    const data= await db.collection('students').find({}).toArray();
    res.render('index',{students:data})
})


app.listen(port,()=>{
    console.log(`server running on ${port}`);
    
})
