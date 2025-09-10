const express = require('express');
const router = express.Router();

const {showEventList} = require('../controller/eventPageController');

router.use(express.json());

//전체 이벤트 목록
router.get('/eventList',showEventList);

module.exports = router;

