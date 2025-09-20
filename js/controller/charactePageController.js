const db = require('../mariadb');

const nameButtonList = async (req, res) => {
    try {
        const role_name = req.body.role_name;
        const star = req.body.star;
        const sql = 'SELECT name, id, avatar FROM characterPage WHERE role = ? AND star = ?';
        const results = await db.query(sql, [role_name, star]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

const loadCharacterImage = async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const sql = 'SELECT name, picture FROM characterPage WHERE id = ?';
        const results = await db.query(sql, [id]);
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

const rolesBtn = async (req, res) => {
    try {
        const sql = 'SELECT * FROM character_role_info';
        const results = await db.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

const roleRarityBtn = async (req, res) => {
    try {
        const role_name = req.body.role_name;
        const sql = 'SELECT DISTINCT star FROM characterPage WHERE role = ?';
        const results = await db.query(sql, [role_name]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

module.exports = {
    nameButtonList,
    loadCharacterImage,
    rolesBtn,
    roleRarityBtn
};