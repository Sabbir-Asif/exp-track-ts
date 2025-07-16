# Expense Tracker Project in TypeScript

This project is created for learning purpose. To keep the things basic and understandtable wee kept the functionalities simple. This is the converted version of the expense tracker project written in javascript.

### Links
- <a href="https://sabbir-asif.github.io/exp-track-ts/"> Live Demo</a>
- <a href="https://github.com/Sabbir-Asif/exp-track">Link of the original project written in Javascript</a>

## Features

- Add Income/Expense
- Delete Income/Expense
- Filter by Year and Month
- Yearly and Monthly Summary

## Folder Structure

```bash
├──dist
|   ├── app.js
|   ├── categories.js
|   ├── records.js
|   ├── storage.js
|   ├── ui.js
├──src
|   ├── app.ts
|   ├── categories.ts
|   ├── records.ts
|   ├── storage.ts
|   ├── ui.ts
├──index.html
├──style.css

```
## Key Changes

### Record Type
- The `Record` type is now defined as a TypeScript interface, which provides better type checking for ts compiler.

```ts
type RecordItem = {
    amount : number,
    category: string,
    date: string;
    type: "income" | "expense";
}

// storage.ts
function getRecords(): RecordItem[]
function saveRecords(records: RecordItem[]) : void
// records.ts
function addRecord(type: "income" | "expense", category: string, amount: number, date: string)

```

### Categories are defined as String Literal Types

```ts
// categories.ts
type IncomeCategories = "Salary" | "Freelance" | "Gift" | "Other";
type ExpenseCategories = "Food" | "Transport" | "Entertainment" | "Bills" | "Other";

```

### Months as Enum
As dateObject.getMonth() returns numbers mapped to month names from January to December (0-11), And when I want to see records which are filtered by month, I get month name (Januyary - December) as string. So I created an enum to map the month names to numbers.

```ts
// ui.ts
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

```

### Type Assertion

Declaring the type of the HTML elements

```ts
// ui.ts
let monthHeading = document.getElementById('current-month') as HTMLHeadingElement;
// app.ts
(document.getElementById('add-expense-btn') as HTMLButtonElement).addEventListener('click', () => showPopup('expense'));

```

These are the major changes I made so far to convert the project from JavaScript to TypeScript.

