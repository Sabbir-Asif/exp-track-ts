import { getRecords, saveRecords, RecordItem } from './storage';

export let records : RecordItem[] = getRecords();

export function addRecord(type: "income" | "expense", category: string, amount: number, date: string) {
    const record = { type, amount, category, date };
    records.push(record);
    saveRecords(records);
}

export function deleteRecord(index: number) {
    records.splice(index, 1);
    saveRecords(records);
}
