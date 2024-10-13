const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const { emit } = require("process");
const PORT = process.env.PORT || 3000;

const app = express();

const userData = [{}]

const server = http.createServer(app);

const io = new Server(server,{
    cors:true
});

app.get("/",(req,res)=>{
  res.send("server start");
});

io.on("connection",(socket)=>{

   socket.on('disconnect',(name)=>{
     console.log(name,"user left");
   })

   socket.on("joined",({name,id})=>{
      console.log(name,"user joined");
      userData[id] = name;
      socket.broadcast.emit('joined-other-user',userData[id]);
   })

   socket.on("message",(data)=>{
      io.emit('send',data);
   })

});

server.listen(PORT,()=>{
    console.log(`server run on http://localhost:${PORT}`);
})