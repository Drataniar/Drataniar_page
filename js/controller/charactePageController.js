const connection = require('../mariadb');

const nameButtonList = (req, res) => {
    const role_name = req.body.role_name;
    const star = req.body.star;
    const sql = 'SELECT name, id, avatar FROM characterPage WHERE role = ? AND star = ?';
    connection.query(sql, [role_name, star], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB 오류', err: err });
        res.json(results);
    });
}


const loadCharacterImage = (req, res) => {
   const  id  = parseInt(req.body.id);
   console.log(id);
    const sql = 'SELECT name, picture FROM characterPage WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'DB 오류' , err :err});
        }
        res.json(results[0]);
    });
}

const rolesBtn = (req, res) => {
    const sql = 'SELECT * FROM character_role_info'; //데이터베이스에서 검색
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'DB 오류' , err :err});
        res.json(results);
    });
}

const roleRarityBtn = (req, res) => {
    const role_name = req.body.role_name;
    const sql = 'SELECT DISTINCT star FROM characterPage WHERE role = ?';
    connection.query(sql, [role_name], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB 오류' , err :err});
        res.json(results);
    });
}

module.exports = {
    nameButtonList,
    loadCharacterImage,
    rolesBtn,
    roleRarityBtn
};