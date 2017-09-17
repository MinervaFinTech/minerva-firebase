
module.exports.isEmpty = function(stringVal) {
    if(stringVal !== null && stringVal !== undefined && stringVal !== "") {
        return false;
    }
    return true;
}
module.exports.isNotEmpty = function(stringVal) {
    return !module.exports.isEmpty(stringVal);
}

const months = {"jan":0,"feb":1,"mar":2,"apr":3,"may":4,"jun":5,"jul":6,"aug":7,"sep":8,"oct":9,"nov":10,"dec":11};
const monthNums = {0:"Jan",1:"Feb",2:"Mar",3:"Apr",4:"May",5:"Jun",6:"Jul",7:"Aug",8:"Sep",9:"Oct",10:"Nov",11:"Dec"};
module.exports.getDateFromPrettyString = function(prettyStr) {
    var dateComps = prettyStr.split(" ");
    var day = dateComps[0];
    var month = months[dateComps[1].toLowerCase()];
    var year = dateComps[2];
    return new Date(year, month, day);
}
module.exports.getPrettyStringFromDate = function(date) {
    var currentDay = date.getUTCDate();
    var currentMonth = monthNums[date.getUTCMonth()];
    var currentYear = date.getUTCFullYear();
    return currentDay + " " + currentMonth + " " + currentYear;
}

module.exports.getLastTradedDate = function(dateObj) {
    var hours = dateObj.getUTCHours();
    if(hours < 12) {
        dateObj.setUTCDate(dateObj.getUTCDate() - 1);
    }

    var dayOfMonth = dateObj.getUTCDate();
    var dayOfWeek = dateObj.getUTCDay();

    if(dayOfWeek == 6) {
        dateObj.setUTCDate(dateObj.getUTCDate() - 1);
    } else if(dayOfWeek == 0) {
        dateObj.setUTCDate(dateObj.getUTCDate() - 2);
    }

    return dateObj;
}