const getYearMontDay = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return { year, month, day }
}
const getToDays = (year,month,day) => {
  return new Date(year,month,day)
}

export {
  getYearMontDay,
  getToDays
}