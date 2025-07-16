import { getRecords, saveRecords } from './storage.js';
export let records = getRecords();
export function addRecord(type, category, amount, date) {
    const record = { type, amount, category, date };
    records.push(record);
    saveRecords(records);
}
export function deleteRecord(index) {
    records.splice(index, 1);
    saveRecords(records);
}
