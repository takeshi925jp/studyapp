const express = require('express')
const mysql = require('mysql2')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const port = process.env.PORT || 3000

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'studyapp'
});

/*
セッション初期設定
*/
const session_opt = {
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};

app.use(session(session_opt));


/*
セッションチェック
*/
app.get("/checkSession", (req, res) => {
  if (req.session.login) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
    //req.session.login = undefined;
  }
});

/*
ログアウト
*/
app.get("/logout", (req, res) => {
    req.session.login = undefined;
    res.json({ result: true });
});


/*
カレンダーイベント取得
*/
app.get("/getEvents", (req, res) => {
  connection.query(
    'SELECT * FROM `schedule`',//where句はとりあえず後で考える
    function (err, results, fields) {
      if (err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("接続終了(正常)");
      res.json({ events: results });
    }
  );
  console.log("接続終了(正常)");
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*
ユーザー新規登録
*/
app.post("/registapi", (req, res) => {
  connection.query(
    "insert into user (login_id, user_name, password, mailaddress) values ('" + req.body.loginId + "','" + req.body.userName + "','" + req.body.password + "','" + req.body.mailaddress + "');",
    function (err, results, fields) {
      if (err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("接続終了(正常)");
      res.json({ message: req.body.resultMessage });
    }
  );
  console.log("接続終了");
});

/*
カレンダーイベント登録
*/
app.post("/registschedule", (req, res) => {
  connection.query(
    "insert into schedule (title, user_id, study_start, study_end, start_time, end_time, tag, content) values ('" + req.body.title + "','" + req.body.userId + "','" + req.body.dateStart + "','" + req.body.dateEnd + "','" + req.body.startTime + "','" + req.body.endTime + "','" + req.body.tag + "','" + req.body.context + "');",
    function (err, results, fields) {
      if (err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("接続終了(正常)");
      res.json({ message: req.body.resultMessage });
    }
  );
  console.log("接続終了");
});

/*
完了登録
*/
app.post("/registcomplete", (req, res) => {
  connection.query(
    "update schedule set complete_flg=1 where " + "study_start='" + req.body.ymd + "' and start_time='" + req.body.startTime + "';",
    function (err, results, fields) {
      if (err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("接続終了(正常)");
      res.json({ message: req.body.resultMessage });
    }
  );
  console.log("接続終了");
});

/*
ログイン
*/
app.post('/login', (req, res) => {
  connection.query(
    "select count(*) from user where login_id = '" + req.body.loginId + "' and password = '" + req.body.password + "'",
    function (err, results, fields) {
      if (err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("接続終了(正常)");
      if (results[0]['count(*)'] > 0) {
        req.session.login = req.body.loginId;//セッションloginの有無でログインを判定
      }
      res.json({ message: results[0] });
    }
  );
  console.log("接続終了");
});

/*
学習履歴取得
*/
app.get('/getHistory', (req, res) => {
  connection.query(
    "select * from schedule where complete_flg = '1'",
    function (err, results, fields) {
      if (err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({ result: results });
    }
  );
  console.log("接続終了");
});



app.listen(port, () => {
  console.log(`listening on *:${port}`);
})