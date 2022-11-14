/*************************************** FUNCTION TO NORMALIZE ARRAY ***************************************/
// normalize function to turn array of objects into object of objects:
// uses "id" specifically as key
// { 1: { id: 1, ...}, 2: { id: 2, ...}, 3: { id: 3 ...}, ... }
export function normalizeArray(arr) {
  let obj = {};
  if (Array.isArray(arr)) arr.forEach(el => obj[el.id] = el);
  return obj;
};
