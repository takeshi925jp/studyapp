function convertDateStr(date) {
    //"/"区切りで配列を取得
    let dateArray = date.split('/');
    let month = dateArray[1];
    let day = dateArray[2];
    if (dateArray[1].length < 2) {
        month = '0' + dateArray[1]
    }
    if (dateArray[2].length < 2) {
        day = '0' + dateArray[2]
    }

    let result = dateArray[0] + month + day;

    return result;
}