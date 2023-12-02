import React, { useEffect, useState } from "react";
import "./TransactionTable.css";

function TransactionTable({ setTransactions, customerId, transactions, onAddTransaction }) {
  const categories = [
    "Groceries",
    "Clothes",
    "Gas",
    "Rent",
    "Utilities",
    "Entertainment",
    "Electronics",
    "Travel",
    "Other",
  ];

  const [newTransaction, setNewTransaction] = useState({
    name: "",
    price: "",
    date: "",
    category: categories[0], // Default category
  });

  useEffect(() => {
    const fetchTransactionInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/transactions/${customerId}`);
        const data = await response.json().then((data) => { return data }).then(res => { return res[0] });
        setTransactions(data.transaction_list);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactionInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const handleAddTransaction = async () => {
    try {
      await onAddTransaction(newTransaction);

      setNewTransaction({
        name: "",
        price: "",
        date: "",
        category: categories[0],
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div>
      <div className="add-transaction-form">
        <input
          type="text"
          name="name"
          placeholder="Item"
          value={newTransaction.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newTransaction.price}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
        />
        <select
          name="category"
          value={newTransaction.category}
          onChange={handleInputChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddTransaction}>Add</button>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>${transaction.price}</td>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
        {/* ... Table headers and existing transactions */}
      </table>
    </div>
  );
}

export default TransactionTable;
