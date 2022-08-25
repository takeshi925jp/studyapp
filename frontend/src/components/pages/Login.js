import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Header from '../modules/Header'
import Footer from '../modules/Footer'

export const Login = () => {

  const [message, setMessage] = useState('');//必要
  const [todoText, setTodoText] = useState("");//必要　ログインID
  const [todoText2, setTodoText2] = useState("");//必要　パスワード

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onChangeTodoText2 = (event) => setTodoText2(event.target.value);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) =>
        setMessage(data.message));
  }, [])

  return (
    <>
      <Header />
      {message}
      <div className="input-area">
        <input
          placeholder="ログインIDを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
      </div>

      <div className="input-area">
        <input
          placeholder="パスワードを入力"
          value={todoText2}
          onChange={onChangeTodoText2}
        />
      </div>

      <Button variant="contained" color="primary">
        ログイン
      </Button>
      <div>
        <a href="リンク先のパス">アカウントを登録していない場合は新規登録</a>
      </div>

      <Footer />
    </>
  );
};