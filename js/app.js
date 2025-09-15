const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(3000);

//메인페이지
const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter);

//페이지 전환
const pageRouter = require('./routes/pageRouter');
app.use('/page', pageRouter);

//비디오페이지
const videoRouter = require('./routes/videoList');
app.use('/video', videoRouter);

//캐릭터페이지
const characterPageRouter = require('./routes/characterPageRouter');
app.use('/character',characterPageRouter);

//이벤트페이지
const eventPageRouter = require('./routes/eventPageRouter');
app.use('/event', eventPageRouter);