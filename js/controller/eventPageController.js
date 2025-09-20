
const db = require('../mariadb');

const showEventList = async (req, res) => {
    try {
        const sql = 'SELECT event_title, notice_link, start_date, end_date, img_link FROM eventPage';
        const results = await db.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

module.exports = {
    showEventList
};