function getRelativeTime(date) {
    if (!date) {
        return "some time ago";
    }

    var now = new Date(Date.now());

    var time = 0;
    var unit = "";

    var secDiff = now.getSeconds() - date.getSeconds();
    if (secDiff > 0) {
        time = secDiff;
        unit = "second";
    }

    var minDiff = now.getMinutes() - date.getMinutes();
    if (minDiff > 0) {
        time = minDiff;
        unit = "minute";
    }
    
    var hrDiff = now.getHours() - date.getHours();
    if (hrDiff > 0) {
        time = hrDiff;
        unit = "hour";
    }

    var monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff > 0) {
        time = monthDiff;
        unit = "month";
    }

    var yearDiff = now.getFullYear() - date.getFullYear();
    if (yearDiff > 0) {
        time = yearDiff;
        unit = "year"
    }

    if (time === 0) {
        return "just now"
    } else if (time !== 1) {
        unit += "s"
    }

    return time + " " + unit + " ago";
}

export { getRelativeTime };