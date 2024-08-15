import { createServer } from "http"
import { Server } from "socket.io"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
})

io.on('connection', (socket) => {
    console.log("socket connected successfully", socket.id)

    socket.on('Order-food', (loc) => {
        console.log("Order recieved", socket.id)
        io.emit('deliver-food', {...loc, id: socket.id})
    })

    socket.on('update-location', (obj) => {
        console.log(obj)
        socket.to(obj.id).emit('recieve-location', {...obj})
    })
})


app.get('/', (req, res) => {
    res.send("Hello World")
})

httpServer.listen(3000, () => {
    console.log("listening on port 3000")
})
