require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const http = require("http");
const fs = require('fs')
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const Chats = require("./models/Chats");
// const csrf = require('csurf')
var path = require('path')
const bodyParser = require('body-parser')
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })
// const { sendProjectMessage } = require('./controllers/chat-controller');
// const { default: ChatEditor } = require('../ATMOS-react/src/pages/ProjectDashboard/Board/ChatEditor');

const { apiDoc } = require('./utils/docs');
const corsOptions = {
    origin: 'http://localhost:4001',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,

}


// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Atmos API',
//             version: '1.0.0',
//             description: 'Atmos API',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:4000',
//             },
//         ],
//     },
//     apis: ['./routes/*.js'],
// };



// const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDoc));

app.use(morgan('tiny', { stream: accessLogStream }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors);

// console.log(jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…yNTh9.fxYHW9HAMNvw5hj0_EE_2XQQZ0O2VVRzLLg3XRcmvEI', process.env.TOKEN_SECRET));

connectDB();

// const corsOptions = {
//     origin: '*',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// }

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/user', require('./routes/user-routes'));
app.use('/project', require('./routes/project-routes'));
app.use('/section', require('./routes/section-routes'));
app.use('/task', require('./routes/task-routes'));
app.use('/note', require('./routes/note-routes'));
app.use('/chat', require('./routes/chat-routes'));


const server = http.createServer(app);
app.use('/admin', require('./routes/admin-routes'));


const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:4001",
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("load_project", (data) => {
        socket.join(data)
    })
    socket.on("send_message", (data) => {
        console.log("dfd", data)
        const send = async () => {
            try {
                const status = new Chats(data);
            } catch (error) {

            }
        }
        socket.to(data.projectid).emit("receive_message", data)
    })
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})

server.listen(port, () => {
    console.log(`ATMOS Backend server started on port ${port}`);
});

// To Do

// TASK
// Create Task - DONE
// Update Task - DONE
// Delete Task - DONE

// SECTION
// Create Section - DONE
// Update Section - DONE
// Delete Section - DONE

// PROJECT
// Create Project - DONE
// Update Project -
// Delete Project -

// USER
// Create User
// Update User
// Delete User





