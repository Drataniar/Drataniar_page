
const db = require('../mariadb');

const showVideoList = async (req, res) => {
    try {
        const sql = 'SELECT video.name, video.stage_ID, video.video_url, video.link_ID, stage_info.event_name, video.upload_date FROM video,stage_info WHERE video.stage_ID = stage_info.stage_ID';
        const results = await db.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

const searchVideos = async (req, res) => {
    try {
        const { option, searchText } = req.body;
        let sql = 'SELECT video.name, video.stage_ID, video.video_url, video.link_ID, stage_info.event_name, video.upload_date FROM video,stage_info WHERE video.stage_ID = stage_info.stage_ID';
        let params = [];

        if (option && searchText) {
            if (option === 'name') {
                sql += ' AND video.name LIKE ?';
            } else if (option === 'stage') {
                sql += ' AND video.stage_ID LIKE ?';
            } else if (option === 'stage_KR') {
                sql += ' AND stage_info.event_name LIKE ?';
            }
            params.push(`%${searchText}%`);
        }

        const results = await db.query(sql, params);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

const getStages = async (req, res) => {
    try {
        const sql = 'SELECT stage_ID, event_name, release_date FROM stage_info';
        const results = await db.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

module.exports = {
    showVideoList,
    searchVideos,
    getStages
};