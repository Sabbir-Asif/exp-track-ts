import { incomeCategories, expenseCategories } from "./categories.js";
import { records, deleteRecord } from "./records.js";
export function renderSummary() {
    let monthHeading = document.getElementById('current-month');
    let incomeSpan = document.getElementById('total-income');
    let expenseSpan = document.getElementById('total-expense');
    let remainingSpan = document.getElementById('total-remaining');
    const now = new Date();
    const month = now.getMonth();
    const monthName = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    let income = 0, expense = 0;
    records.forEach(record => {
        const d = new Date(record.date);
        if (d.getMonth() === month && d.getFullYear() === year) {
            if (record.type === 'income')
                income += record.amount;
            if (record.type === 'expense')
                expense += record.amount;
        }
    });
    monthHeading.textContent = monthName + ' ' + year;
    incomeSpan.textContent = income.toString();
    expenseSpan.textContent = expense.toString();
    remainingSpan.textContent = (income - expense).toString();
}
var Months;
(function (Months) {
    Months[Months["January"] = 0] = "January";
    Months[Months["February"] = 1] = "February";
    Months[Months["March"] = 2] = "March";
    Months[Months["April"] = 3] = "April";
    Months[Months["May"] = 4] = "May";
    Months[Months["June"] = 5] = "June";
    Months[Months["July"] = 6] = "July";
    Months[Months["August"] = 7] = "August";
    Months[Months["September"] = 8] = "September";
    Months[Months["October"] = 9] = "October";
    Months[Months["November"] = 10] = "November";
    Months[Months["December"] = 11] = "December";
})(Months || (Months = {}));
export function renderRecords(filterYear = "", filterMonth = "") {
    const filterYearNumber = parseInt(filterYear);
    const years = [...new Set(records.map(r => new Date(r.date).getFullYear()))];
    const months = [...new Set(records.map(r => new Date(r.date).toLocaleString('default', { month: 'long' })))];
    // console.log("years", years);
    // console.log("months", months);
    const yearSelect = document.getElementById('filter-year');
    const monthSelect = document.getElementById('filter-month');
    const yearOptions = years.map(y => `<option value="${y}">${y}</option>`).join('');
    const monthOptions = months.map((m) => `<option value="${m}">${m}</option>`).join('');
    yearSelect.innerHTML = yearOptions.length ? `${yearOptions}` : `<option>None</option>`;
    monthSelect.innerHTML = monthOptions.length ? `${monthOptions}` : `<option>None</option>`;
    // console.log("yearSelect", yearSelect);
    // console.log("monthSelect", monthSelect);
    const tbody = document.querySelector('#records-table tbody');
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
export function renderReports(selectedYear = "") {
    const yearSelect = document.getElementById('report-year');
    const years = [...new Set(records.map(r => new Date(r.date).getFullYear()))];
    const yearOptions = years.map(y => `<option value="${y}">${y}</option>`).join('');
    yearSelect.innerHTML = yearOptions.length ? `${yearOptions}` : `<option>None</option>`;
    yearSelect.value = selectedYear;
    yearSelect.addEventListener('change', (e) => {
        const selectedYear = e.target.value;
        renderReports(selectedYear);
    });
    const tbody = document.querySelector('#yearly-expense-table tbody');
    tbody.innerHTML = "";
    for (let m = 0; m < 12; m++) {
        let monthExpense = 0;
        let monthIncome = 0;
        records.forEach(r => {
            const d = new Date(r.date);
            if (r.type === 'expense' && d.getFullYear() === parseInt(selectedYear) && d.getMonth() === m) {
                monthExpense += r.amount;
            }
            else if (r.type === 'income' && d.getFullYear() == parseInt(selectedYear) && d.getMonth() === m) {
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
export function showPopup(type) {
    let popUp = document.getElementById('popup-form');
    let popUpType = document.getElementById('popup-type');
    popUp.style.display = 'block';
    popUpType.value = type;
    populateCategories(type);
}
export function hidePopup() {
    let popUp = document.getElementById('popup-form');
    popUp.style.display = 'none';
}
function populateCategories(type) {
    const select = document.getElementById('popup-category');
    select.innerHTML = '';
    const list = type === 'income' ? incomeCategories : expenseCategories;
    list.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}
window.handleDelete = function (index) {
    if (confirm('Are you sure?')) {
        deleteRecord(index);
        renderSummary();
        renderRecords();
    }
};
