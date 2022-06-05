const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const corsConFig = require('./config/cors.config');
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require('./config/database.config');

connectToMongoDB()
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsConFig));



const authRouter = require('./routes/auth.routes');
const postsRouter = require('./routes/posts.routes');
const userRouter = require('./routes/user.routes');
const commentsRouter = require('./routes/comments.routes');


app.use('/api', authRouter);
app.use('/api', postsRouter);
app.use('/api', userRouter);
app.use('/api', commentsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('server running at '+PORT));

module.exports = app;
