const express = require("express")
const swaggerUI = require("swagger-ui-express")
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml')
const fileUpload=require("express-fileupload")

const app = express()
app.use(express.json())
app.use(fileUpload)
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs))

let users = [
    {id:1, name:"Tom"},
    {id:2, name:"Sony"},
    {id:3, name:"Mony"}
]

app.get("/string",(req,res)=>{
    res.status(200).send("This is a string")
})
app.get("/user",(req,res)=>{
    const obj= {id:1, name:"Tom"}
    res.status(200).send(obj)
})
app.get("/users",(req,res)=>{
    res.status(200).send(users)
})
app.get("/users/:id",(req,res)=>{
    console.log(req.params.id)
    const newobj = users.find((data)=> data.id === parseInt(req.params.id))
    console.log(newobj)
    res.status(200).send(newobj)
})
app.post("/create",(req,res)=>{
    users = [req.body,...users]
    res.status(200).send(users)
})
app.get("/usersQuery",(req,res)=>{
    console.log(req.query.id)
    const newobj = users.find((data)=> data.id === parseInt(req.query.id))
    console.log(newobj)
    res.status(200).send(newobj)
})
//npm install express-fileupload
app.post("/upload",(req,res)=>{
    const file = req.files.file
    let path = __dirname+"/upload/"+"file"+Date.now()+".jpg"
    file.mv(path,(err)=>{
        res.send("OK")
    })
})
app.listen(8000,()=>{
    console.log("server running")
})