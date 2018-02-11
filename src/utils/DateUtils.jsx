import moment from 'moment';

export function momentToSql(moment) {
    
    var d = moment.toDate();
    var sqlDate = d.getFullYear() + "/" +  
        ("00" + (d.getMonth() + 1)).slice(-2) + "/" + 
        ("00" + d.getDate()).slice(-2) + " " + 
        ("00" + d.getHours()).slice(-2) + ":" + 
        ("00" + d.getMinutes()).slice(-2) + ":" + 
        ("00" + d.getSeconds()).slice(-2);
    return sqlDate;
}

export function dataTimeString(date) {
    return moment(date).format('MM/DD/YYYY hh:mm:ss');
}

export function dateWithoutSeconds(sqlDate) {
    var date = new Date(line.date);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    return date;
}
