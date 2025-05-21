const express = require('express');

const app = express()

const cors = require('cors')

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/todo_List")
.then(()=>{
  console.log("DB Connected..!")
})
.catch((error)=>{
  console.log("MongoDB error"+error.message)
})

const todoSchema = new mongoose.Schema({
    title:{
    required: true, 
    type: String
  },
  description:String,
  quanity:Number
})

const todoModel = mongoose.model('extool',todoSchema)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/todo", async (req, res) => {
  const { title, description,quanity } = req.body;
  try {
    const newTodos = new todoModel({ title, description, quanity});
    await newTodos.save();
    res.status(201).json(newTodos);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/todo", async(req,res) => {
  try {
      const todos = await todoModel.find();
      res.json(todos);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
  } 
});

app.delete("/todo/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
  }catch(error){
    console.log(error);
    res.status(500).json({message: error.message})
  }
})


app.use("/",(req,res)=>{
  res.send(`
    <h1>Hello Developer</h1>
    `)
})

const port = 3300;
app.listen(port, ()=>{
  console.log("Server is running"+port)
})