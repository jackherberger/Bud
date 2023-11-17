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

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8000/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // const handleAddTransaction = (newTransaction) => {
  //   // Update the transactions array by adding the new transaction
  //   setTransactions([...transactions, newTransaction]);
  // };

  const onAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();
      setTransactions([...transactions, data]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/transactions"
            element={
              <div style={{ display: "flex" }}>
                <div style={{ flex: 2 }}>
                  <TransactionTable
                    transactions={transactions}
                    onAddTransaction={onAddTransaction}
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
