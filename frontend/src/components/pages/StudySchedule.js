import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import Header from '../modules/Header'
import Title from '../modules/Title'
import IconMenu from '../modules/IconMenu'
import Calender from '../modules/Calender'
import Modal from '../pages/Modal'

export const StudySchedule = () => {

  function convertDateStr(dateStr) {
    //"/"区切りで配列を取得
    let dateArray = dateStr.split('/');
    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    let result = year + month + day;
    return result;
  }

  const [displayFlg, setDisplayFlg] = useState(false);
  useLayoutEffect(() => {
    fetch('/checkSession')
      .then((res) => res.json())
      .then((data) => {
        if (!data.result) {
          window.location = "/login";
        } else {
          setDisplayFlg(true);
        }
      }
      );
  }, [])

  const [calenderParam, setCalenderParam] = useState([]);
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [modalFlg, setModalFlg] = useState(false);

  const exchange = (el) => {
    const temp = [];
    el.forEach((elem, index) => {
      temp.push({ 
        title: elem.title, 
        start: elem.study_start + "T" + elem.start_time + ":00", 
        end: elem.study_end + "T" + elem.end_time + ":00",
        color:"#49B9A7",

      });
    })
    setEvents(temp);
  }

  useEffect(() => {
    fetch('/getEvents')
      .then((res) => res.json())
      .then((data) =>
        exchange(data.events));
  }, [])

  const update = (param) => {

    console.log(param.message);

    if (param.message.length > 0) {
      setMessage(param.message);
      return;
    }

    setCalenderParam(param);

    let start = convertDateStr(param.dateStart.toLocaleDateString());
    let end = convertDateStr(param.dateEnd.toLocaleDateString());

    fetch('/registschedule', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(
        {
          title: param.title,
          userId: '1',
          dateStart: start,
          dateEnd: end,
          startTime: param.startTime,
          endTime: param.endTime,
          tag: param.tag,
          context: param.context,
          resultMessage: '登録完了'
        }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) =>
        setMessage(data.message));
  }

  const modalChange = () => {
    setModalFlg(!modalFlg);
  }

  const headerInfo = { title: '学習予定一覧', returnFlg: false, logoutFlg: true }
  const display = { studyschedule: false, studying: false, history: true }

  const calenderEvent = { calenderEvent: events }
  return (
    <>
      {displayFlg &&
        <>
          <Header {...headerInfo} />
          <IconMenu {...display} />
          {!modalFlg &&
            <button
              id="a-button"
              type="button"
              onClick={modalChange}>スケジュールを登録
            </button>
          }

          {modalFlg &&
            <Modal clickChildButton={update.bind(this)} />
          }

          <div id="blank"></div>
          {modalFlg &&
            <button
              id="a-button"
              type="button"
              onClick={modalChange}>閉じる
            </button>
          }
          <div id="regist-message">
            {message}
          </div>
          <Calender {...calenderEvent} />


        </>
      }
    </>
  );
};