
const connection = require('../mariadb');

const showEventList = (req, res) => {
    const sql = 'SELECT event_title, notice_link, start_date, end_date, img_link FROM eventPage'; //데이터베이스에서 검색
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'DB 오류' });
        res.json(results);
    });
}


module.exports = {
    showEventList
};