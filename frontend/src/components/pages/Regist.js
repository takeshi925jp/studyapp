import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Header from '../modules/Header'
import Footer from '../modules/Footer'
import InputArea from '../modules/InputArea'
import IconMenu from '../modules/IconMenu'

export const Regist = () => {

  const [loginId, setLoginId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [mailaddress, setMailaddress] = useState("");

  const onChangeLoginId = (event) => setLoginId(event.target.value);
  const onChangeUseName = (event) => setUserName(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onChangeRePassword = (event) => setRePassword(event.target.value);
  const onChangeMailaddress = (event) => setMailaddress(event.target.value);

  const info1 = { item: loginId, onChangeItem: onChangeLoginId, holder: 'ログインIDを入力', type: 'text' }
  const info2 = { item: userName, onChangeItem: onChangeUseName, holder: 'ユーザー名を入力', type: 'text' }
  const info3 = { item: password, onChangeItem: onChangePassword, holder: 'パスワードを入力', type: 'password' }
  const info4 = { item: rePassword, onChangeItem: onChangeRePassword, holder: 'パスワードを再入力', type: 'password' }
  const info5 = { item: mailaddress, onChangeItem: onChangeMailaddress, holder: 'メールアドレスを入力', type: 'email' }

  const [message, setMessage] = useState("");

  const registCheck = () => {
    let resultMessage = '';
    if (loginId.length < 8 || loginId.length > 16) {
      return "ログインIDは8文字以上16文字以下で入力してください。";
    }
    if (userName.length > 30) {
      return "ユーザー名は30文字以下で入力してください。";
    }
    if (password.length < 8 || password.length > 16) {
      return "パスワードは8文字以上16文字以下で入力してください。";
    }
    if (rePassword.length < 8 || rePassword.length > 16) {
      return "再パスワードは8文字以上16文字以下で入力してください。";
    }
    if (password !== rePassword) {
      return "パスワードが一致していません。";
    }

    return resultMessage;
  }

  const regist = () => {

    let resultMessage = registCheck();
    if (resultMessage) {
      setMessage(resultMessage);
      return;
    }

    fetch('/registapi', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(
        {
          loginId: loginId,
          userName: userName,
          password: password,
          mailaddress: mailaddress,
          resultMessage:'登録が完了しました。'
        }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) =>{
        setMessage(data.message);
        setLoginId("");
        setUserName("");
        setPassword("");
        setRePassword("");
        setMailaddress("");
      });
  }

  const headerInfo = { title: 'アカウント登録画面', returnFlg: false, logoutFlg: false }
  const display = { studyschedule: false, studying: false, history: false , login: true}
  return (
    <>
      <Header {...headerInfo}/>
      <IconMenu {...display} />
      <div id="blank"></div>
      <div>
        <InputArea {...info1} />
      </div>
      <div>
        <InputArea {...info2} />
      </div>
      <div>
        <InputArea {...info3} />
      </div>
      <div>
        <InputArea {...info4} />
      </div>
      <div>
        <InputArea {...info5} />
      </div>
      <div id="blank"></div>
      <button
        id="c-button"
        type="button"
        onClick={regist}>アカウントを登録
      </button>
      <div id="blank"></div>
      <div id="error_message">
        {message}
      </div>
      <Footer />
    </>
  );
};