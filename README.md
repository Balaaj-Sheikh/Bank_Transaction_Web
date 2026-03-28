# 💳 React Bank Transaction App (Beginner Project)

## 📌 Overview

This project is a simple **Bank Transaction Application** built using React.
It allows users to manage a virtual account by performing basic banking operations such as:

* Depositing money
* Withdrawing money
* Viewing transaction history
* Persisting account data using browser storage

This project was created as part of learning **React fundamentals**, focusing on state management, events, and data persistence.

---

## 🚀 Features

### 💰 Account Management

* Deposit money with an optional description
* Withdraw money with an optional description
* Real-time balance updates

### 📜 Transaction History

* Displays all transactions (deposit & withdrawal)
* Each transaction includes:

  * Type (Deposit / Withdrawal)
  * Amount
  * Description (if provided)
  * Date & time

### 💾 Data Persistence

* Uses `localStorage` to store:

  * Account balance
  * Transaction history
* Data remains after page refresh

### 🧹 Data Control

* Clear all transaction history with confirmation prompt

### 🎨 User Interface

* Modern dark-themed UI
* Responsive design (desktop, tablet, mobile)
* Visual distinction between deposit and withdrawal

---

## 🧠 Concepts Practiced

This project demonstrates the following React concepts:

### 1. State Management

* `useState` for:

  * Balance
  * Transactions
  * User messages

### 2. Side Effects

* `useEffect` to sync data with `localStorage`

### 3. Event Handling

* Form submission handling
* Preventing default browser behavior

### 4. Conditional Rendering

* Display transactions only when available
* Show fallback UI when no transactions exist

### 5. Data Handling

* Working with arrays of objects
* JSON parsing and stringifying
* Date formatting

---

## 📂 Project Structure

```bash
src/
│
├── App.js        # Main React component (logic + UI)
├── index.js      # Entry point
├── App.css       # Styling (or separate CSS file)
```

---

## 📦 Dependencies

* React
* react-icons

Install manually if needed:

```bash
npm install react-icons
```

---

## 🛠️ How It Works

### 🔹 1. State Initialization

```js
const [balance, setBalance] = useState(() => {
  return parseFloat(localStorage.getItem("balance")) || 0;
});
```

* Retrieves stored balance from `localStorage`
* Defaults to `0` if no data exists

---

### 🔹 2. Transactions State

```js
const [transactions, setTransactions] = useState(() => {
  return JSON.parse(localStorage.getItem("transactions")) || [];
});
```

* Stores all transaction records
* Loaded from `localStorage`

---

### 🔹 3. Persisting Data

```js
useEffect(() => {
  localStorage.setItem("balance", balance);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [balance, transactions]);
```

* Automatically updates stored data when state changes

---

### 🔹 4. Transaction Object Structure

Each transaction is saved as:

```js
{
  type: "deposit" | "withdrawal",
  amount: number,
  description: string,
  date: string (ISO format)
}
```

---

### 🔹 5. Deposit Flow

* User enters amount and description
* Validates input (must be positive)
* Adds amount to balance
* Stores transaction in history
* Displays confirmation message

---

### 🔹 6. Withdrawal Flow

* User enters amount and description
* Validates input
* Deducts amount from balance
* Saves transaction

⚠️ Note:
The current version **does not prevent withdrawing more than the available balance**.

---

### 🔹 7. Clearing Transactions

```js
if (window.confirm("Are you sure?")) {
  setTransactions([]);
}
```

* Prompts user for confirmation
* Clears all stored transactions

---

## 📱 Responsive Design

The layout adapts to different screen sizes:

* **Desktop:** Sidebar + main content
* **Tablet:** Stacked layout
* **Mobile:**

  * Reduced spacing
  * Smaller text
  * Disabled heavy visual effects

---

## ⚠️ Limitations

* No backend (data stored only in browser)
* No authentication system
* Balance can go negative
* Data is lost if browser storage is cleared

---

## 🎯 Learning Outcome

This project helps you understand:

* React component structure
* Managing and updating state
* Handling forms and user input
* Persisting data in the browser
* Building responsive UIs

---

## 📄 License

This project is open-source and free to use for educational purposes.

---

## 🙌 Acknowledgment

This project was built as a beginner-level exercise to practice React and understand how basic financial transaction systems work.

---
