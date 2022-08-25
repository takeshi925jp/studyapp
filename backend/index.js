const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = process.env.PORT || 3000

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'studyapp'
});

app.get("/api", (req, res) => {
  connection.query(
    'SELECT * FROM `user`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results[0].id});
    }
  );
  console.log("接続終了(正常)");
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})