const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',      // MySQL 서버 주소
  user: 'root',        // MySQL 사용자명
  password: 'root',    // MySQL 비밀번호
  database: 'd_ark' // 사용할 데이터베이스명
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공!');
});

// 연결 종료는 connection.end() 사용

module.exports = connection;
// 다른 파일에서 사용할 때 사용합니다