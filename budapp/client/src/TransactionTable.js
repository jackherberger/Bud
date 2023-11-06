import React, { useState, useEffect } from 'react';
import './TransactionTable.css'; // Import your CSS file

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  const generateRandomTransaction = (id) => {
    const randomName = `Item ${id}`;
    const randomPrice = (Math.random() * 100).toFixed(2);
    const year = 2023;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const randomDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const categories = ['Groceries', 'Clothes', 'Gas', 'Rent', 'Utilities', 'Entertainment', 'Electronics', 'Travel', 'Other'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    return {
      id,
      name: randomName,
      price: parseFloat(randomPrice),
      date: randomDate,
      category: randomCategory,
    };
  };

  const generateInitialTransactions = () => {
    const randomTransactions = [];
    for (let id = 1; id <= 10; id++) {
      randomTransactions.push(generateRandomTransaction(id));
    }
    setTransactions(randomTransactions);
  };

  useEffect(() => {
    generateInitialTransactions();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('Groceries');
  const [inputAmount, setInputAmount] = useState(0);

  const addTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      name: `New Item`,
      price: parseFloat(inputAmount),
      date: new Date().toLocaleDateString('sv-SE'),
      category: selectedCategory,
    };

    setTransactions([...transactions, newTransaction]);
    setInputAmount(0);
    setSelectedCategory('Groceries');
  };

  const categories = ['Groceries', 'Clothes', 'Gas', 'Rent', 'Utilities', 'Entertainment', 'Electronics', 'Travel', 'Other'];

  return (
    <div>
      <div>
        <label htmlFor="category">Choose a category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount">Enter the amount:</label>
        <input
          type="number"
          id="amount"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>

      <button onClick={addTransaction}>Add</button>

      <h2>Transactions</h2>
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
              <td>${transaction.price.toFixed(2)}</td>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
