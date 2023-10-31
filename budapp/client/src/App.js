import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionTable from "./TransactionTable";
// import CategoryPieChart from './CategoryPieChart';
import "./App.css"; // Import your CSS file
import Login from "./login";
import SignUp from "./signup";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Function to generate a random transaction
    const generateRandomTransaction = (id) => {
      const randomName = `Item ${id}`;
      const randomPrice = (Math.random() * 100).toFixed(2);
      const year = 2023;
      const month = Math.floor(Math.random() * 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1; // Choose any day within the month
      const randomDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const categories = [
        "Groceries",
        "Clothes",
        "Gas",
        "Rent",
        "Utilites",
        "Enterntainment",
        "Electronics",
        "Travel",
        "Other",
      ];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      return {
        id,
        name: randomName,
        price: parseFloat(randomPrice),
        date: randomDate,
        category: randomCategory,
      };
    };

    // Generate 10 random transactions
    const randomTransactions = [];
    for (let id = 1; id <= 10; id++) {
      randomTransactions.push(generateRandomTransaction(id));
    }

    setTransactions(randomTransactions);
  }, []); // Empty dependency array to run this effect only once

  return (
    //   <div className="App">
    //     <h1> Bud™️ </h1>
    //     <p>The smart transaction tracker.</p>
    //     {/* <TransactionTable transactions={transactions} /> */}
    //     <Router>
    //       <Routes>
    //         <Route exact path="/" element={<Login />} />
    //         <Route path = "/transactions" element={<TransactionTable transactions={transactions} />} />
    //       </Routes>
    //     </Router>
    //     {/* <CategoryPieChart transactions={transactions} /> */}
    //   </div>
    <div className="App">
      <h1> Bud™️ </h1>
      <p>The smart transaction tracker.</p>
      {/* <TransactionTable transactions={transactions} /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/transactions"
            element={<TransactionTable transactions={transactions} />}
          />
        </Routes>
      </Router>
      {/* <CategoryPieChart transactions={transactions} /> */}
    </div>
  );
}

export default App;
