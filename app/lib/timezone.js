const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const timezone = 'Asia/Calcutta';

let now = () => {
    return moment.utc().format();
}

let getLocalTime = () => {
    return moment().tz(timezone).format();
}

let convertToLocalTimeWithFormat = (time) => {
    return momentTimeZone.tz(time, timezone).format('LLLL');
}

let convertToLocalTime = (time) => {
    return momentTimeZone.tz(time, timezone).format();
}

module.exports = {
    now : now,
    getLocalTime : getLocalTime,
    convertToLocalTime : convertToLocalTime,
    convertToLocalTimeWithFormat : convertToLocalTimeWithFormat
}