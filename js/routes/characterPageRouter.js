const express = require('express');
const router = express.Router();

const {nameButtonList,loadCharacterImage,rolesBtn,roleRarityBtn} = require('../controller/charactePageController');

router.use(express.json());

//전체 캐릭터 이름 가져와서 보내주기
router.post('/btnList',nameButtonList);

//캐릭터 이미지 가져와서 보내주기
router.post('/picture',loadCharacterImage);

//직군 조회
router.get('/rolesBtn',rolesBtn);

//직군 성급 조회
router.post('/roleRarity',roleRarityBtn);


module.exports = router;

