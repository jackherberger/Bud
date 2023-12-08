import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './TransactionTable.css'

function TransactionTable({
  setTransactions,
  customerId,
  transactions,
  onAddTransaction
}) {
  const INVALID_TOKEN = 'INVALID_TOKEN'
  const [token, setToken] = useState(localStorage.getItem('token'))
  const categories = [
    'Groceries',
    'Clothes',
    'Gas',
    'Rent',
    'Utilities',
    'Entertainment',
    'Electronics',
    'Travel',
    'Other'
  ]

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      }
    }
  }

  const [newTransaction, setNewTransaction] = useState({
    name: '',
    price: '',
    date: '',
    category: categories[0] // Default category
  })

  // Changed FETCH METHOD TO GET AND TWEAKED RETURNED JSON
  useEffect(() => {
    const fetchTransactionInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/transactions/${customerId}`,
          {
            method: 'GET',
            headers: addAuthHeader({
              'Content-Type': 'application/json'
            })
          }
        )
        const data = await response.json()
        setTransactions(data[0].transaction_list)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      }
    }
    if (token !== null && token !== INVALID_TOKEN) {
      fetchTransactionInfo()
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTransaction({
      ...newTransaction,
      [name]: value
    })
  }

  const handleAddTransaction = async () => {
    try {
      await onAddTransaction(newTransaction)

      setNewTransaction({
        name: '',
        price: '',
        date: '',
        category: categories[0]
      })
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  return (
    <div>
      <div className='add-transaction-form'>
        <input
          type='text'
          name='name'
          placeholder='Item'
          value={newTransaction.name}
          onChange={handleInputChange}
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={newTransaction.price}
          onChange={handleInputChange}
        />
        <DatePicker
          name='date'
          selected={newTransaction.date ? new Date(newTransaction.date) : null}
          onChange={(date) => {
            const formattedDate = date.toISOString().split('T')[0]
            setNewTransaction({
              ...newTransaction,
              date: formattedDate
            })
          }}
          placeholderText='Select Date'
        />
        <select
          name='category'
          value={newTransaction.category}
          onChange={handleInputChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button value='Add' onClick={handleAddTransaction}>
          Add
        </button>
      </div>
      <table className='transaction-table'>
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
  )
}

export default TransactionTable
