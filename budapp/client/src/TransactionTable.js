import React, { useState } from 'react';
import './TransactionTable.css'; // Import your CSS file

function TransactionTable({ transactions }) {
  
      
      
  const categories = ['Groceries', 'Clothes', 'Gas', 'Rent', 'Utilites', 'Enterntainment', 'Electronics', 'Travel', 'Other'];

  return (
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
            <td>
              <select value={transaction.category}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;


