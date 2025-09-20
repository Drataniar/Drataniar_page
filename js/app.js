const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(3000);

// 정적 파일 제공 (html, css, js, img)
app.use(express.static(__dirname + '/../html'));
app.use(express.static(__dirname + '/../css'));
app.use(express.static(__dirname + '/../js'));
app.use(express.static(__dirname + '/../img'));

//메인페이지
const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter);


//비디오페이지
const videoRouter = require('./routes/videoList');
app.use('/video', videoRouter);

//캐릭터페이지
const characterPageRouter = require('./routes/characterPageRouter');
app.use('/character',characterPageRouter);

//이벤트페이지
const eventPageRouter = require('./routes/eventPageRouter');
app.use('/event', eventPageRouter);

//공개모집 페이지
const recruitRouter = require('./routes/recruitRouter');
app.use('/recruit', recruitRouter);