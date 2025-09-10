const express = require('express');
const router = express.Router();

const {showVideoList,searchVideos,getStages} = require('../controller/videoListController');

router.use(express.json());

//전체 영상 목록
router.get('/homeList',showVideoList);
//검색한 영상 목록
router.post('/search',searchVideos);
//스테이지 목록 버턴으로 불러오기
router.get('/stagesBtn', getStages);

module.exports = router;

