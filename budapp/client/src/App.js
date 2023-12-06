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
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("customerId")
  )
  const [accountId, setAccountId] = useState(localStorage.getItem("accountId"))
  const INVALID_TOKEN = "INVALID_TOKEN"
  const [token, setToken] = useState(localStorage.getItem("token"))

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      }
    }
  }
  // fetch customer info once login - if token invalid, don't fetch - maybe add "PLEASE LOGIN"
  useEffect(() => {
    if (token !== null && token !== INVALID_TOKEN) {
      console.log(token)
      const fetchCustomerInfo = async () => {
        try {
          console.log("in trans customerId:", customerId)
          const response = await fetch(
            `http://localhost:8000/transactions/${customerId}`,
            {
              method: "GET",
              headers: addAuthHeader({
                "Content-Type": "application/json",
              }),
            }
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
    }
    if (customerId) {
      console.log("logged in", customerId, accountId)
    }
  }, [customerId])

  // const handleAddTransaction = (newTransaction) => {
  //   // Update the transactions array by adding the new transaction
  //   setTransactions([...transactions, newTransaction]);
  // };
  const onAddTransaction = async (newTransaction) => {
    if (token !== null && token !== INVALID_TOKEN) {
      try {
        const response = await fetch(
          `http://localhost:8000/transactions/${customerId}`,
          {
            method: "POST",
            headers: addAuthHeader({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(newTransaction),
          }
        )

        const data = await response.json()
        const updatedTransactions = data.transaction_list

        // Update the transactions state
        setTransactions(updatedTransactions)

        // Calculate the total spending from the updated transactions
        const totalSpending = updatedTransactions.reduce(
          (acc, transaction) => acc + parseInt(transaction.price, 10),
          0
        )

        // Update spending in the accounts database
        fetch(`http://localhost:8000/account/${accountId}/spending`, {
          method: "PATCH",
          headers: addAuthHeader({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            spending: totalSpending,
          }),
        })
          .then((res) => {
            if (res.ok) {
              console.log("Spending updated successfully in the database")
            } else {
              console.log("Failed to update spending in the database")
            }
          })
          .catch((error) => {
            console.error("Error updating spending in the database:", error)
          })
      } catch (error) {
        console.error("Error adding transaction:", error)
      }
    }
  }

  const onSetCustomerId = (customerId) => {
    localStorage.setItem("customerId", customerId)
    setCustomerId(customerId)
  }

  const onSetAccountId = (accountId) => {
    localStorage.setItem("accountId", accountId)
    setAccountId(accountId)
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
            element={<Login setCustomerId={onSetCustomerId} />}
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
                    setTransactions={setTransactions}
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
              <AccountDisplay accountId={accountId} customerId={customerId} />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
