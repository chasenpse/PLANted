/**
 * Adds 2 days to date
 * @type {function(*): number}
 * @param date
 * @return date
 */
module.exports = generateTokenDate = date => date.setDate(date.getDate() + 2);