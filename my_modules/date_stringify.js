function stringifyDate(dateObj, separator) {
  const year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        date = dateObj.getDate();
  return year + separator + month + separator + date;
}

module.exports = stringifyDate;