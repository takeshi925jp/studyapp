import React, { useEffect, useState, useLayoutEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Select from "react-select";
import Selectbox from '../modules/Selectbox'

export default function Modal(props) {

    const today = new Date();

    const setStart = (date) => {
        setDateStart(date);
    };

    const setEnd = (date) => {
        setDateEnd(date);
    };

    const [title, setTitle] = useState('');
    const [dateStart, setDateStart] = useState(new Date);
    const [dateEnd, setDateEnd] = useState(new Date);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [tag, setTag] = useState('');
    const [context, setContext] = useState('');

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    const changeTag = (event) => {
        setTag(event.target.value);
    };
    const changeContext = (event) => {
        setContext(event.target.value);
    };

    const selectS = (selectTime) => {
        setStartTime(selectTime);
    };
    const selectE = (selectTime) => {
        setEndTime(selectTime);
    };


    const sSelectParam = {
        name : "startselect",
        label : "開始時刻 ",
        selectItem : selectS.bind(this)
    }
    const eSelectParam = {
        name : "endselect",
        label : "終了時刻 ",
        selectItem : selectE.bind(this)
    }

    const checkModal = () => {

        if (title == false) {
            return "タイトルを入力してください。"
        }
        if (dateStart == null || dateEnd == null) {
            return "日付を入力してください。"
        }
        if ((dateStart.getTime() == dateEnd.getTime()) && (startTime.length == 0 || endTime.length == 0)) {
            return "開始日付、終了日付を入力してください。"
        }
        if (dateStart.getTime() > dateEnd.getTime()) {
            return "終了日付の方が後にくるように設定してください。"
        }
        if ((dateStart.getTime() != dateEnd.getTime()) && (startTime.length != 0 || endTime.length != 0)) {
            return "日をまたぐ場合は時刻は入力しないでください。"
        }
        if ((startTime.length != 0 || endTime.length != 0) && (startTime >= endTime)) {
            return "終了時刻の方が大きくなるようにしてください。"
        }

        if (tag.length > 30) {
            return "タグは30文字以内で入力してください。"
        }
        if (context.length > 50) {
            return "内容は50文字以内で入力してください。"
        }
        return "";
    };

    return (
        <>
            <div id="modal" className="modal" onClick={(event) => { event.stopPropagation() }}>
                <div id="modal-box">
                    <div id="title1">
                        スケジュール登録
                    </div>
                    <div>
                        <input id="input-area-mini" placeholder="タイトルを入力" value={title} onChange={changeTitle} required></input>
                    </div>
                    <div>
                        <DatePicker selected={dateStart} dateFormat="yyyy/MM/dd" onChange={(date) => { setStart(date) }} minDate={today} />
                    </div>
                    <div>
                        <DatePicker selected={dateEnd} dateFormat="yyyy/MM/dd" onChange={(date) => { setEnd(date) }} minDate={today} />
                    </div>

                    <div>
                        <Selectbox {...sSelectParam} />
                    </div>
                    <div>
                        <Selectbox {...eSelectParam} />
                    </div>

                    <div>
                        <input id="input-area-mini" placeholder="タグ" value={tag} onChange={changeTag}></input>
                    </div>

                    <div>
                        <input id="input-area-mini" placeholder="内容を入力" value={context} onChange={changeContext}></input>
                    </div>
                    <div id="blank"></div>
                    <button
                        id="c-button"
                        type="button"
                        onClick={() => {
                            let message = checkModal();
                            props.clickChildButton({ title, dateStart, dateEnd, startTime, endTime,  tag, context, message});
                        }}>登録
                    </button>
                    <div id="blank"></div>

                </div>
            </div>

        </>
    );
};