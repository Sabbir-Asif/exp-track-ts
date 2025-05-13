import { incomeCategories, expenseCategories } from "./categories";
import { records, deleteRecord } from "./records";

export function renderSummary(): void {

    let monthHeading = document.getElementById('current-month') as HTMLHeadingElement;
    let incomeSpan = document.getElementById('total-income') as HTMLSpanElement;
    let expenseSpan = document.getElementById('total-expense') as HTMLSpanElement;
    let remainingSpan = document.getElementById('total-remaining') as HTMLSpanElement;


    const now: Date = new Date();
    const month: number = now.getMonth();
    const monthName : string = now.toLocaleString('default', { month: 'long' });
    const year : number = now.getFullYear();

    let income: number = 0, expense: number = 0;

    records.forEach(record => {
        const d = new Date(record.date);
        if (d.getMonth() === month && d.getFullYear() === year) {
            if (record.type === 'income') income += record.amount;
            if (record.type === 'expense') expense += record.amount;
        }
    });

    monthHeading.textContent = monthName + ' ' + year;
    incomeSpan.textContent = income.toString();
    expenseSpan.textContent = expense.toString();
    remainingSpan.textContent = (income - expense).toString();
}


enum Months {
    January = 0,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export type FilterMonths = keyof typeof Months | "";

export function renderRecords(filterYear : string = "", filterMonth : FilterMonths = ""): void {

    const filterYearNumber = parseInt(filterYear);

    const years = [...new Set(records.map(r => new Date(r.date).getFullYear()))];
    const months = [...new Set(records.map(r => new Date(r.date).toLocaleString('default', { month: 'long' })))];

    // console.log("years", years);
    // console.log("months", months);
    const yearSelect = document.getElementById('filter-year') as HTMLSelectElement;
    const monthSelect = document.getElementById('filter-month') as HTMLSelectElement;
    const yearOptions = years.map(y => `<option value="${y}">${y}</option>`).join('');
    const monthOptions = months.map((m) => `<option value="${m}">${m}</option>`).join('');
    yearSelect.innerHTML = yearOptions.length ? `${yearOptions}` : `<option>None</option>`;
    monthSelect.innerHTML = monthOptions.length ? `${monthOptions}` : `<option>None</option>`;

    // console.log("yearSelect", yearSelect);
    // console.log("monthSelect", monthSelect);

    const tbody = document.querySelector('#records-table tbody') as HTMLTableSectionElement;
    tbody.innerHTML = "";

    records.forEach((r, index) => {
        const d = new Date(r.date);
        if ((filterYear === "" || d.getFullYear() == filterYearNumber) && (filterMonth === "" || d.getMonth() === Months[filterMonth])) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${r.type}</td>
        <td>${r.category}</td>
        <td>${r.amount}</td>
        <td>${new Date(r.date).toLocaleDateString()}</td>
        <td><button onclick="handleDelete(${index})">Delete</button></td>
      `;
            tbody.appendChild(tr);
        }
    });
}


export function renderReports(selectedYear : string = ""): void {

    const yearSelect = document.getElementById('report-year') as HTMLSelectElement;
    const years = [...new Set(records.map(r => new Date(r.date).getFullYear()))];
    const yearOptions = years.map(y => `<option value="${y}">${y}</option>`).join('');
    yearSelect.innerHTML = yearOptions.length ? `${yearOptions}` : `<option>None</option>`;
    yearSelect.value = selectedYear;
    yearSelect.addEventListener('change', (e) => {
        const selectedYear = (e.target as HTMLSelectElement).value;
        renderReports(selectedYear);
    });

    const tbody = document.querySelector('#yearly-expense-table tbody') as HTMLTableSectionElement;
    tbody.innerHTML = "";

    for (let m = 0; m < 12; m++) {
        let monthExpense : number = 0;
        let monthIncome : number = 0;
        records.forEach(r => {
            const d = new Date(r.date);
            if (r.type === 'expense' && d.getFullYear() === parseInt(selectedYear) && d.getMonth() === m) {
                monthExpense += r.amount;
            } else if (r.type === 'income' && d.getFullYear() == parseInt(selectedYear) && d.getMonth() === m) {
                monthIncome += r.amount;
            }
        });

        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${new Date(0, m).toLocaleString('default', { month: 'long' })}</td>
      <td>${monthExpense}</td>
      <td>${monthIncome}</td>
    `;
        tbody.appendChild(tr);
    }
}


export function showPopup(type : string) : void {
    let popUp = document.getElementById('popup-form') as HTMLDivElement;
    let popUpType = document.getElementById('popup-type') as HTMLInputElement;
    popUp.style.display = 'block';
    popUpType.value = type;
    populateCategories(type);
}

export function hidePopup() {
    let popUp = document.getElementById('popup-form') as HTMLDivElement;
    popUp.style.display = 'none';
}


function populateCategories(type : string ) : void {
    const select = document.getElementById('popup-category') as HTMLSelectElement;
    select.innerHTML = '';
    const list = type === 'income' ? incomeCategories : expenseCategories;

    list.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

declare global {
    interface Window {
        handleDelete: (index: number) => void;
    }
}

const handleDelete = function (index : number) {
    if (confirm('Are you sure?')) {
        deleteRecord(index);
        renderSummary();
        renderRecords();
    }
};