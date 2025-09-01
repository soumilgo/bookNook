const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const resourcesRouter = require('./routes/resourceRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/resources', resourcesRouter);
app.use('/feedback', feedbackRouter);

app.listen(4000, () => console.log('Server running on port 4000'));