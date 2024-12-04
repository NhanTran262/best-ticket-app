export const useFormatDateFull = (data) => {
  let date = new Date(data)
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = `0${Math.floor(date.getHours() / 60)}`.slice(-2);
  let minute = `0${Math.floor(date.getMinutes() / 60)}`.slice(-2);
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return "Ngày " + day + " tháng " + month + " năm " + year + " " + " lúc " + hour + ":" + minute
}
