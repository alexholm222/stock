export function setDate() {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  let fMonth;
  switch (month) {
    case 0: fMonth = "января"; break;
    case 1: fMonth = "февраля"; break;
    case 2: fMonth = "марта"; break;
    case 3: fMonth = "апреля"; break;
    case 4: fMonth = "мая"; break;
    case 5: fMonth = "июнья"; break;
    case 6: fMonth = "июлья"; break;
    case 7: fMonth = "августа"; break;
    case 8: fMonth = "сентября"; break;
    case 9: fMonth = "октября"; break;
    case 10: fMonth = "ноября"; break;
    case 11: fMonth = "декабря"; break;
    default:
  }

  const dateText = `${day < 10 ? `0${day}` : `${day}`}.${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}.${year}`;
  const dateText2 = `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-${day < 10 ? `0${day}` : `${day}`}`;
  const dateText3 = `${day < 10 ? `0${day}` : `${day}`} ${fMonth}`;
  return { dateText, dateText2, dateText3};
};

export function setDate2(n) {
  const date = new Date(n);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  let fMonth;
  switch (month) {
    case 0: fMonth = "января"; break;
    case 1: fMonth = "февраля"; break;
    case 2: fMonth = "марта"; break;
    case 3: fMonth = "апреля"; break;
    case 4: fMonth = "мая"; break;
    case 5: fMonth = "июнья"; break;
    case 6: fMonth = "июлья"; break;
    case 7: fMonth = "августа"; break;
    case 8: fMonth = "сентября"; break;
    case 9: fMonth = "октября"; break;
    case 10: fMonth = "ноября"; break;
    case 11: fMonth = "декабря"; break;
    default:
  }

  const dateText = `${day < 10 ? `0${day}` : `${day}`}.${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}.${year}`;
  const dateText2 = `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-${day < 10 ? `0${day}` : `${day}`}`;
  const dateText3 = `${day < 10 ? `0${day}` : `${day}`} ${fMonth}`;
  return { dateText, dateText2, dateText3};
};

export const dateContract = (n) => {
  const date = new Date(n);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  const dateText = `${day < 10 ? `0${day}` : `${day}`}.${month < 10 ? `0${month + 1}` : `${month}`}.${year}`;
  return dateText;
}

export const dateContract2 = (n) => {
  const date = new Date(n);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  const dateText = `${year}-${month < 10 ? `0${month + 1}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
  return dateText;
}

export const compareDate = (d) => {
  const date1 = new Date();
  const date2 = new Date(d);
  const diffDays = (date2 - date1) / (1000 * 60 * 60 * 24);
  return {
    status: (diffDays > 7 || d == null) ? 'active' : (diffDays <= 7 && diffDays > 0) ? 'deadline' : 'disabled',
    diffDays
  }
}

