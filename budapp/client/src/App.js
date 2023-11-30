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

function App() {
  const [transactions, setTransactions] = useState([]);
  const [customerId, setCustomerId] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("in trans customerId:", customerId)
        const response = await fetch(`http://localhost:8000/transactions/${customerId}`);
        const data = await response.json().then((data) => { return data }).then(res => { return res[0].transaction_list });
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [customerId]);

  // const handleAddTransaction = (newTransaction) => {
  //   // Update the transactions array by adding the new transaction
  //   setTransactions([...transactions, newTransaction]);
  // };

  const onAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch(`http://localhost:8000/transactions/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json().then((data) => { return data }).then(res => { return res.transaction_list });
      console.log("data", data);
      setTransactions(data);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const onSetCustomerId = (customerId) => {
    setCustomerId(customerId);
    console.log("ran in app", customerId);
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login setCustomerId={onSetCustomerId}/>} />
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
          <Route path="/account" element={<AccountDisplay />}
            customerId={customerId}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
