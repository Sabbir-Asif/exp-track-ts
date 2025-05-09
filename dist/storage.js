function getRecords() {
    if (localStorage.getItem('records') === null)
        return [];
    else {
        return JSON.parse(localStorage.getItem('records'));
    }
}
function saveRecords(records) {
    localStorage.setItem('records', JSON.stringify(records));
}
export { getRecords, saveRecords };
