const express = require('express');
const httpServer = express();
const bodyParser = require('body-parser')
const { createFile , readAllFils } = require('./utils/filesystem')

httpServer.use(bodyParser.json())

httpServer.listen(3000,"0.0.0.0",() => {
  console.log("server start success");
  console.log("website deployed success!");
})

const todos = [];

httpServer.get("/todos" , (req,res) => {
  return res.json({
     "message" : "Data Fetched success!",
     data : todos
  })
})

httpServer.post("/createTodos" , (req,res) => {
  todos.push(req.body)
  return res.status(200).json({
    "message" : "Data send success!"
  })
})

httpServer.get("/todo/:todoId" , (req,res) => {
  const { todoId } = req.params

  const matchingData = todos.find((todo) => todo.id == todoId)
  if(matchingData){
    return res.status(200).json({
      message : 'Todo fetch success!',
      data : matchingData
    })
  } else{
    return res.status(404).json({
      message : 'No Data found'
    })
  }
  
})

httpServer.post("/createFile" , async (req,res) =>{
   try { 
    await createFile(JSON.stringify(req.body))
    return res.status(201).json({
      message : "File Created success"
    })
   }catch(error){
    return res.status(500).json({
      message : "File not created",
      error : error
    })
   }
})

httpServer.get("/readFile" , async (req,res) =>{
  try { 
   const filenames = await readAllFils(JSON.stringify(req.body))
   return res.status(201).json({
     message : "File read success",
     files : filenames
   })
  }catch(error){
   return res.status(500).json({
     message : "No files found",
     error : error
   })
  }
})