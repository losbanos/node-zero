function setExpireTime(day) {
    const date = new Date();
    date.setTime(date.getTime() + (day * 24) * 60 * 60 * 1000);
    return date;
}

module.exports = {
    setExpireTime
};