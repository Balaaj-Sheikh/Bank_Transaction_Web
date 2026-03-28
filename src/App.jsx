// Import React hooks for state and lifecycle management
import { useState, useEffect } from "react";

// Import icons for UI display
import { FaMoneyBill, FaFolderOpen } from "react-icons/fa";

// Main App component
const App = () => {

  // State to store account balance
  // It initializes from localStorage so data persists after refresh
  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem("balance")) || 0;
  });

  // State to store transaction history (array of objects)
  // Also initialized from localStorage
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  // State to show temporary user messages (e.g., success messages)
  const [message, setMessage] = useState("");

  // useEffect runs whenever balance or transactions change
  // It saves updated data into localStorage (data persistence)
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  // Function to handle deposit form submission
  const handleDeposit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Get amount and description from form inputs
    const amount = parseFloat(e.target.amount.value);
    const description = e.target.description.value;

    // Validate amount (must be positive number)
    if (!amount || amount <= 0) return;

    // Update balance by adding deposit amount
    setBalance(balance + amount);

    // Add new transaction object to history
    setTransactions([
      ...transactions,
      {
        type: "deposit",
        amount,
        description,
        date: new Date().toISOString(), // Store date in ISO format
      },
    ]);

    // Show confirmation message
    setMessage(`You deposited ${amount} $ into your account`);

    // Clear message after 5 seconds
    setTimeout(() => setMessage(""), 5000);

    // Reset form fields
    e.target.reset();
  };

  // Function to handle withdrawal form submission
  const handleWithdrawal = (e) => {
    e.preventDefault(); // Prevent page reload

    // Get amount and description
    const amount = parseFloat(e.target.amount.value);
    const description = e.target.description.value;

    // Validate amount
    if (!amount || amount <= 0) return;

    // Deduct amount from balance
    setBalance(balance - amount);

    // Add withdrawal transaction to history
    setTransactions([
      ...transactions,
      {
        type: "withdrawal",
        amount,
        description,
        date: new Date().toISOString(),
      },
    ]);

    // Show confirmation message
    setMessage(`You withdrew ${amount} $ from your account`);

    // Remove message after 5 seconds
    setTimeout(() => setMessage(""), 5000);

    // Reset form
    e.target.reset();
  };

  // Function to clear all transactions
  const handleClearTransactions = () => {

    // Ask user for confirmation before deleting data
    if (window.confirm("Are you sure?")) {

      // Clear transaction history
      setTransactions([]);

      // Show confirmation message
      setMessage("All transactions have been cleared!");

      // Remove message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }
  };

  // JSX UI rendering
  return (
    <div className="app">

      {/* Decorative top section */}
      <div className="top">
        <div className="glow">
          <div className="glow-secondary"></div>
        </div>
      </div>

      <div className="container">

        {/* Sidebar section for user inputs */}
        <aside className="sidebar">
          <h2>Manage Your Account</h2>

          {/* Deposit form */}
          <form onSubmit={handleDeposit}>
            <h3>Deposit</h3>

            {/* Input for deposit amount */}
            <input type="number" placeholder="Deposit Amount" name="amount" />

            {/* Input for optional description */}
            <textarea
              placeholder="Description ..."
              name="description"
            ></textarea>

            {/* Submit button */}
            <button className="deposit-btn">Deposit</button>
          </form>

          {/* Withdrawal form */}
          <form onSubmit={handleWithdrawal}>
            <h3>Withdrawal</h3>

            {/* Input for withdrawal amount */}
            <input
              type="number"
              placeholder="Withdrawal Amount"
              name="amount"
            />

            {/* Input for optional description */}
            <textarea
              placeholder="Description ..."
              name="description"
            ></textarea>

            {/* Submit button */}
            <button className="withdrawal-btn">Withdraw</button>
          </form>

          {/* Button to clear all transactions */}
          <button
            className="clearBtn"
            onClick={handleClearTransactions}
          >
            Clear Transaction History
          </button>
        </aside>

        {/* Main content section */}
        <div className="main">

          {/* Header showing balance and messages */}
          <div className="main-header">

            {/* Balance display */}
            <div className="balance">
              <p>
                <FaMoneyBill />
                Your Current Account Balance
              </p>

              {/* Format balance with commas */}
              <h1>$ {balance.toLocaleString()}</h1>
            </div>

            {/* Conditional message display */}
            <div className="message">
              {message && <p>{message}</p>}
            </div>
          </div>

          {/* Transactions list */}
          <div className="transactions">

            {/* If transactions exist, display them */}
            {transactions.length > 0 ? (
              transactions.map((t, i) => (

                // Each transaction card
                <div key={i} className={`transaction-box ${t.type}`}>

                  {/* Show type */}
                  <h2>{t.type === "deposit" ? "Deposit" : "Withdrawal"}</h2>

                  {/* Show amount with + or - sign */}
                  <p>
                    {t.type === "deposit" ? "+" : "-"} {t.amount} $
                  </p>

                  {/* Show description if available */}
                  {t.description && (
                    <p>Payment Description: {t.description}</p>
                  )}

                  {/* Format and display date */}
                  <p className="date">
                    {t.date
                      ? new Date(t.date).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Date not available"}
                  </p>
                </div>
              ))
            ) : (

              // If no transactions exist
              <p className="no-transaction">
                <span>
                  <FaFolderOpen />
                </span>
                You have no transaction in your history
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component so it can be used in other files
export default App;