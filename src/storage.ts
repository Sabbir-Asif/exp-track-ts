type RecordItem = {
    amount : number,
    category: string,
    date: string;
    type: "income" | "expense";
}


function getRecords(): RecordItem[] {
    if (localStorage.getItem('records') === null) return [];
    else {
        return JSON.parse(localStorage.getItem('records') as string) as RecordItem[];
    }
}

function saveRecords(records: RecordItem[]) : void {
    localStorage.setItem('records', JSON.stringify(records));
}


export  { getRecords, saveRecords, RecordItem };
