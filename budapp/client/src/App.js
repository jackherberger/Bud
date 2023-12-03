import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionTable from "./TransactionTable";
import CategoryPieChart from "./CategoryPieChart";
import DateBarChart from "./DateBarChart";
import "./App.css";
import Login from "./login";
import SignUp from "./signup";
import Navbar from "./Navbar";
import Home from "./Home";
import AccountDisplay from "./components/account/account";
import { set } from "mongoose";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [customerId, setCustomerId] = useState(localStorage.getItem("customerId"));
  const [accountId, setAccountId] = useState(localStorage.getItem("accountId"));
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(localStorage.getItem("token"));

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }
  // fetch customer info once login - if token invalid, don't fetch - maybe add "PLEASE LOGIN"
  useEffect(() => {
    if (token !== INVALID_TOKEN) {
      const fetchCustomerInfo = async () => {
        try {
          console.log("in trans customerId:", customerId)
          const response = await fetch(`http://localhost:8000/transactions/${customerId}`, {
            method: "GET",
            headers: addAuthHeader({
              "Content-Type": "application/json"
            }),
          });
          const data = await response.json();
          setTransactions(data[0].transaction_list);
          onSetAccountId(data[0].account);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
      fetchCustomerInfo();
      if (customerId) {
        console.log("logged in", customerId, accountId)
      }
    }
  }, [customerId]);
  // const handleAddTransaction = (newTransaction) => {
  //   // Update the transactions array by adding the new transaction
  //   setTransactions([...transactions, newTransaction]);
  // };
  const onAddTransaction = async (newTransaction) => {
    if (token !== INVALID_TOKEN) {
      try {
        const response = await fetch(`http://localhost:8000/transactions/${customerId}`, {
          method: "POST",
          headers: addAuthHeader({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(newTransaction),
        });

        const res = await response.json();
        const data = res.transaction_list;
        console.log("data", data);
        setTransactions(data);
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
    }
  };

  const onSetCustomerId = (customerId) => {
    localStorage.setItem("customerId", customerId);
    setCustomerId(customerId);
  }

  const onSetAccountId = (accountId) => {
    localStorage.setItem("accountId", accountId);
    setAccountId(accountId);
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login setCustomerId={onSetCustomerId} />} />
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
          <Route path="/account" element={<AccountDisplay accountId={accountId}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
