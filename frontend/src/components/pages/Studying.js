import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useTimer } from 'use-timer'
import Header from '../modules/Header'
import Footer from '../modules/Footer'
import IconMenu from '../modules/IconMenu'


export function Studying(props) {

    const [message, setMessage] = useState('');

    function complete() {
        let ymd = getParam('ymd');
        let startHour = addZero(parseInt(getParam('startHour')));
        let startMinute = addZero(parseInt(getParam('startMinute')));

        fetch('/registcomplete', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(
                {
                    ymd: ymd,
                    startTime: startHour + ":" + startMinute,
                    resultMessage: '完了'
                }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((data) =>
                //setMessage(data.message));
                window.location = "/studyschedule");

    }

    function addZero(target) {
        let result = '';

        if (target < 10) {
            result = '0' + target;
        } else {
            result = target;
        }
        return result;
    }

    function calculate() {
        let result = 0;
        result = (parseInt(getParam('endHour')) * 3600) + (parseInt(getParam('endMinute')) * 60)
            - (parseInt(getParam('startHour')) * 3600) - (parseInt(getParam('startMinute')) * 60)
        return result;
    }

    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const [displayFlg, setDisplayFlg] = useState(true);
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

    const cntime = calculate();
    const { time, start, pause, reset, status } = useTimer();

    const [timeLeft, setTimeLeft] = useState(3600);

    var h = Math.floor((cntime - time) / 3600);
    var m = Math.floor(((cntime - time) - h * 3600) / 60);
    var s = (cntime - time) % 60;

    if (h < 1) {
        h = 0;
    }
    if (m < 1) {
        m = 0;
    }
    if (s < 1) {
        s = 0;
    }

    let hh = addZero(h);
    let mm = addZero(m);
    let ss = addZero(s);

    if (cntime - time < 0) {
        complete();
    }

    const display = { studyschedule: true, studying: false, history: true }

    const headerInfo = { title: '学習画面', returnFlg: false, logoutFlg: true }

    return (
        <>
            {displayFlg &&
                <>
                    <Header {...headerInfo} />
                    <IconMenu {...display} />
                    <Footer />

                    <div>
                        <div id="digital-box">
                            <div id="digital">
                                {hh}:{mm}:{ss}
                            </div>
                        </div>
                        <div>
                            <button id="b-button" onClick={start}>Start</button>
                            <button id="b-button" onClick={pause}>Pause</button>
                            <button id="b-button" onClick={reset}>Reset</button>
                        </div>
                        {status === 'RUNNING' && <p>Running...</p>}
                        <div id="blank"></div>
                        <div>
                            <button id="c-button" onClick={complete}>学習を完了する</button>
                        </div>
                        {message}
                    </div>
                </>
            }
        </>
    );
};