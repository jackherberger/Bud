import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TransactionTable from "./TransactionTable"
import CategoryPieChart from "./CategoryPieChart"
import DateBarChart from "./DateBarChart"
import "./App.css"
import Login from "./login"
import SignUp from "./signup"
import Navbar from "./Navbar"
import Home from "./Home"
import AccountDisplay from "./components/account/account"
import { set } from "mongoose"

function App() {
  const [transactions, setTransactions] = useState([])
  const [customerId, setCustomerId] = useState("")
  const [accountId, setAccountId] = useState("parent")
  // fetch customer info once login
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        console.log("in trans customerId:", customerId)
        const response = await fetch(
          `http://localhost:8000/transactions/${customerId}`
        )
        const data = await response
          .json()
          .then((data) => {
            return data
          })
          .then((res) => {
            return res[0]
          })
        setTransactions(data.transaction_list)
        onSetAccountId(data.account)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchCustomerInfo()
    if (customerId) {
      console.log("logged in", customerId, accountId)
    }
  }, [customerId])

  // const handleAddTransaction = (newTransaction) => {
  //   // Update the transactions array by adding the new transaction
  //   setTransactions([...transactions, newTransaction]);
  // };
  const onAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch(
        `http://localhost:8000/transactions/${customerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTransaction),
        }
      )

      const data = await response
        .json()
        .then((data) => {
          return data
        })
        .then((res) => {
          return res.transaction_list
        })
      console.log("data", data)
      setTransactions(data)
    } catch (error) {
      console.error("Error adding transaction:", error)
    }
  }

  const onSetCustomerId = (customerId) => {
    setCustomerId(customerId)
    console.log("ran in app", customerId)
  }

  const onSetAccountId = (accountId) => {
    setAccountId(accountId)
    console.log("ran in app", accountId)
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/login"
            element={
              <Login
                setCustomerId={onSetCustomerId}
                setAccountId={onSetAccountId}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/transactions"
            element={
              <div style={{ display: "flex" }}>
                <div style={{ flex: 2 }}>
                  <TransactionTable
                    transactions={transactions}
                    onAddTransaction={onAddTransaction}
                    customerId={customerId}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <CategoryPieChart
                    transactions={transactions}
                    onAddTransaction={onAddTransaction}
                  />
                </div>
                <div>
                  <DateBarChart transactions={transactions} />
                </div>
              </div>
            }
          />
          <Route
            path="/account"
            element={
              <AccountDisplay
                accountId={accountId}
                customerId={customerId}
                onAddTransaction={onAddTransaction}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
