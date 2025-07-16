import { addRecord } from './records';
import { renderSummary, renderRecords, renderReports, showPopup, hidePopup, FilterMonths } from './ui';


function init() {
    renderSummary();
    renderRecords();

    (document.getElementById('add-expense-btn') as HTMLButtonElement).addEventListener('click', () => showPopup('expense'));
    (document.getElementById('add-income-btn') as HTMLButtonElement).addEventListener('click', () => showPopup('income'));

    (document.getElementById('popup-cancel') as HTMLButtonElement).addEventListener('click', hidePopup);
    (document.getElementById('popup-save') as HTMLButtonElement).addEventListener('click', () => {
        const type = (document.getElementById('popup-type') as HTMLInputElement).value as "income" | "expense";
        const category = (document.getElementById('popup-category') as HTMLSelectElement).value;
        const amount = parseFloat((document.getElementById('popup-amount') as HTMLInputElement).value);
        const date = (document.getElementById('popup-date') as HTMLInputElement).value;

        if (!amount || !category || !date) {
            alert('Fill all fields');
            return;
        }

        addRecord(type, category, amount, date);
        hidePopup();
        renderSummary();
        renderRecords();
    });

    (document.getElementById('apply-filters-btn') as HTMLButtonElement).addEventListener('click', () => {
        const year = (document.getElementById('filter-year') as HTMLSelectElement).value;
        const month = ((document.getElementById('filter-month') as HTMLSelectElement).value) as FilterMonths;
        // console.log(year, month);
        renderRecords(year, month);
    });

    (document.getElementById('show-reports-btn') as HTMLButtonElement).addEventListener('click', () => {
        let reportButton = document.getElementById('show-reports-btn') as HTMLButtonElement;
        let reportsSection = document.getElementById('reports-section') as HTMLDivElement;
        if (reportButton.innerText === 'Show Reports') {
            reportButton.innerText = 'Hide Reports';
            const year = (document.getElementById('report-year') as HTMLSelectElement).value;
            renderReports(year);
            reportsSection.style.display = 'block';
        } else {
            reportButton.innerText = 'Show Reports';
            reportsSection.style.display = 'none';
        }

    });
}

init();
