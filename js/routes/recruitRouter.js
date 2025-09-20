const express = require('express');
const router = express.Router();

const {selectOperator} = require('../controller/recruitController');

router.use(express.json());

//조건에 맞는 오퍼레이터 모두 선택하기
router.post('/selectOperator',selectOperator);



module.exports = router;

