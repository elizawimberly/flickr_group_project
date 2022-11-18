/******************************** GENERATE GREETING FROM A RANDOM LANGUAGE **********************************/
const languages = [
    { language: "Arabic", greeting:	"Asalaam alaikum" },
    { language: "Bulgarian", greeting: "Zdraveĭte" },
    { language: "Burmese", greeting: "Mingalaba" },
    { language: "Chinese",	greeting: "Nǐn hǎo" },
    { language: "Dutch", greeting: "Goede dag" },
    { language: "English", greeting: "Hello" },
    { language: "French", greeting: "Bonjour" },
    { language: "Gaelic", greeting: "Dia dhuit" },
    { language: "German", greeting: "Guten tag" },
    { language: "Greek", greeting: "Kalimera" },
    { language: "Hebrew", greeting: "Shalom aleichem" },
    { language: "Hindi", greeting: "Namastē" },
    { language: "Hungarian", greeting: "Szia" },
    { language: "Icelandic", greeting: "Góðan dag" },
    { language: "Indonesian", greeting: "Selamat siang" },
    { language: "Italian", greeting: "Salve" },
    { language: "Japanese",	greeting: "Konnichiwa" },
    { language: "Kannada", greeting: "Namaskara" },
    { language: "Khmer", greeting: "Suostei" },
    { language: "Korean", greeting: "Anyoung haseyo" },
    { language: "Polish", greeting: "Cześć" },
    { language: "Polish", greeting: "Dzień dobry!" },
    { language: "Portuguese", greeting: "Olá" },
    { language: "Romanian",	greeting: "Bună ziua" },
    { language: "Russian", greeting: "Zdravstvuyte" },
    { language: "Spanish", greeting: "Hola" },
    { language: "Swahili", greeting: "Habari" },
    { language: "Swedish", greeting: "God dag" },
    { language: "Tahitian", greeting: "Ia ora na" },
    { language: "Turkish", greeting: "Merhaba" },
    { language: "Vietnamese", greeting: "Xin chào" },
    { language: "Welsh", greeting: "Shwmae" },
    { language: "Zulu",	greeting: "Ngiyakwemukela" },
]

export function generateInternationalGreeting() {
    let res = (Math.random() * 100).toFixed(0) % languages.length
    return languages[res]
}


/***************************************** ALBUM PLACEHOLDER IMAGE *****************************************/
export const albumPlaceholderImage = "https://www.springsmontessori.com/wp-content/uploads/2022/06/Photo-Coming-Soon.png"



/*********************************** CONVERT ISO STRING TO "Month Year" ************************************/
export function convertDate(iso) {

  let year = iso.slice(0, 4);
  let month = iso.slice(5, 7);

  if (month === 1) {
      month = 'January'
  } else if (month === 2) {
      month = 'February'
  } else if (month === 3) {
      month = 'March'
  } else if (month === 4) {
      month = 'April'
  } else if (month === 5) {
      month = 'May'
  } else if (month === 6) {
      month = 'June'
  } else if (month === 7) {
      month = 'July'
  } else if (month === 8) {
      month = 'August'
  } else if (month === 9) {
      month = 'September'
  } else if (month === 10) {
      month = 'October'
  } else if (month === 11) {
      month = 'November'
  } else if (month === 12) {
      month = 'December'
  }

  return month.concat(' ', year)
}


/*************************************** FUNCTION TO NORMALIZE ARRAY ***************************************/
// normalize function to turn array of objects into object of objects:
// uses "id" specifically as key
// { 1: { id: 1, ... }, 2: { id: 2, ... }, 3: { id: 3 ... }, ... }
export function normalizeArray(arr) {
  let obj = {};
  if (Array.isArray(arr)) arr.forEach(el => obj[el.id] = el);
  return obj;
};
