import { useState, useEffect } from 'react'
import Header from '../modules/Header'
import Footer from '../modules/Footer'
import IconMenu from '../modules/IconMenu'

export const History = () => {

    const display = { studyschedule: true, studying: false, history: false }
    const [list, setList] = useState([]);
    const [timelist, setTimelist] = useState([]);
    const [totaltimelist, setTotaltimelist] = useState([]);

    const getStudyTime = (start, end) => {

        let result = 0;
        //03:00～04:00
        let endHour = end.substring(0, 2);
        let endMinute = end.substring(3, 5);
        let startHour = start.substring(0, 2);
        let startMinute = start.substring(3, 5);

        if (end.substring(0, 1) == '0') {
            endHour = end.substring(1, 2);
        }
        if (end.substring(3, 4) == '0') {
            endMinute = end.substring(4, 5);
        }

        if (start.substring(0, 1) == '0') {
            startHour = start.substring(1, 2);
        }
        if (start.substring(3, 4) == '0') {
            startMinute = start.substring(4, 5);
        }

        result = (parseInt(endHour) * 60 + parseInt(endMinute)) - (parseInt(startHour) * 60 + parseInt(startMinute));
        return result;
    }

    const createList = (datelist) => {

        console.log("ok");

        let yearList = [];
        let monthList = [];
        let dayList = [];
        let monthTimeList = [];
        let dayTimeList = [];

        let tempYear = '';
        let tempMonth = '';

        let multiFlg = false;

        datelist.forEach((elem, index) => {

            let start = elem.study_start.substring(0, 4) + "年" + elem.study_start.substring(4, 6) + "月" + elem.study_start.substring(6, 8) + "日" + "   " + "【" + elem.start_time + "～" + elem.end_time + "】";
            //同じ月を入れていく
            if (tempMonth == false || start.substring(4, 6) == tempMonth) {
                dayList.push(start);
                dayTimeList.push(getStudyTime(elem.start_time, elem.end_time));
                tempMonth = start.substring(4, 6);
                tempYear = start.substring(0, 4);
            } else {
                multiFlg = true;//ひと月以上あった場合true
                //ひと月分push
                monthList.push(['(' + tempYear + '年)' + ',' + tempMonth, dayList]);
                monthTimeList.push(dayTimeList);
                dayList = [];
                dayList.push(start);
                dayTimeList = [];
                dayTimeList.push(getStudyTime(elem.start_time, elem.end_time));
                tempMonth = start.substring(4, 6);
                tempYear = start.substring(0, 4);
            }
        })

        monthList.push(['(' + tempYear + '年)' + ',' + tempMonth, dayList]);
        monthTimeList.push(dayTimeList);

        let monthTotalTimeList = [];

        for (let i = 0; i < monthTimeList.length; i++) {
            let total = 0;
            for (let j = 0; j < monthTimeList[i].length; j++) {
                total = total + monthTimeList[i][j]/60
            }
            monthTotalTimeList.push(total);
        }

        setTotaltimelist(monthTotalTimeList);
        setTimelist(monthTimeList);
        setList(monthList);
    }

    useEffect(() => {
        fetch('/getHistory')
            .then((res) => res.json())
            .then((data) => {
                createList(data.result)
            });
    }, [])

    const info = { title: '学習履歴', returnFlg: false }

    return (
        <>
            <Header {...info} />
            <IconMenu {...display} />

            <div>
                {list.map((elem, index) => {
                    return (
                        <>
                        <div id="history-month-box">
                            {elem[1].map((e, i) => {
                                return (
                                    <div key={e} className="list-row">
                                        {e}　　　学習時間 {timelist[index][i]}分
                                    </div>
                                );
                            })}
                            <div id="history-total-time">
                                月の合計時間：{totaltimelist[index]}h
                            </div>
                        </div>
                        </>
                    );
                })}
            </div>

            <Footer />
        </>
    );
};