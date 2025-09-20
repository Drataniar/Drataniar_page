const db = require('../mariadb');

const selectOperator = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json({ error: 'DB 오류', err });
    }
}

module.exports = {
    selectOperator
};