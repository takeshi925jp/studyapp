import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Header from '../modules/Header'
import Footer from '../modules/Footer'
import '../../css/style.css';

export const Login = () => {

  const [message, setMessage] = useState('');
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState(0);

  const onChangeLoginId = (event) => setLoginId(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);

  const loginCheck = () => {
    let checkResult = false;
    if(loginId.match(/^[A-Za-z0-9]*$/)){
      checkResult = true;
    }
    return checkResult;
  }

  const login = (param) => {
    let result = loginCheck();
    if (!result) {
      setMessage('ログインIDは半角英数字で入力してください');
      return;
    }
    fetch('/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(
        {
          loginId: loginId,
          password: password
        }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
      pageMove(data.message['count(*)']);

      });
  }

  const pageMove = (cnt) => {
    if (cnt > 0) {
      window.location = "/studyschedule";

    } else {
      //ログイン失敗
      setMessage('ログインに失敗しました。');
    }
  }

  const headerInfo = { title: 'ログイン画面', returnFlg: false, logoutFlg: false }

  return (
    <>
      <Header {...headerInfo}/>

      <div id="blank"></div>
      <div>
        <input
          id="input-area"
          type="text"
          placeholder="ログインIDを入力"
          value={loginId}
          onChange={onChangeLoginId}
        />
      </div>

      <div>
        <input
          id = "input-area"
          type = "password"
          placeholder="パスワードを入力"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div id="blank"></div>

      <button
        id="c-button"
        type="button"
        onClick={login}>ログイン
      </button>

      <div id="blank"></div>
      <div id="error_message">
        {message}
      </div>      
      <div>
        <a href="/regist">アカウントを登録していない場合は新規登録</a>
      </div>

      <Footer />
    </>
  );
};