
const connection = require('../mariadb');

const showVideoList = (req, res) => {
    const sql = 'SELECT video.name, video.stage_ID, video.video_url, video.link_ID, stage_info.event_name, video.upload_date FROM video,stage_info WHERE video.stage_ID = stage_info.stage_ID'; //데이터베이스에서 검색
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'DB 오류' });
        res.json(results);
    });
}

const searchVideos = (req, res) => {    
    const { option, searchText } = req.body;
    let sql = 'SELECT video.name, video.stage_ID, video.video_url, video.link_ID, stage_info.event_name, video.upload_date FROM video,stage_info WHERE video.stage_ID = stage_info.stage_ID';
    let params = [];

    console.log(option, searchText);
    console.log(option === 'stage');


    if (option && searchText) {
        if (option === 'name') {
            sql += ' AND video.name LIKE ?';
            console.log(sql);
        } else if (option === 'stage') {
            sql += ' AND video.stage_ID LIKE ?';
            console.log(sql);
        } else if (option === 'stage_KR') {
            sql += ' AND stage_info.event_name LIKE ?';
            console.log(sql);
        }
        params.push(`%${searchText}%`);
        console.log(params);
    }

    connection.query(sql, params, (err, results) => {
        console.log(results);
        if (err) return res.status(500).json({ error: 'DB 오류' });
        res.json(results);
    });
}



const getStages = (req, res) => {
     const sql = 'SELECT stage_ID, event_name, release_date FROM stage_info'; //데이터베이스에서 검색
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'DB 오류' });
        res.json(results);
    });
}


module.exports = {
    showVideoList,
    searchVideos,
    getStages
};