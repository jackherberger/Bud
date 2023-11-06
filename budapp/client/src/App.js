import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionTable from "./TransactionTable";
// import CategoryPieChart from './CategoryPieChart';
import "./App.css"; // Import your CSS file
import Login from "./login";
import SignUp from "./signup";

function App() {
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

      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/transactions"
            element={<TransactionTable/>}
          />
        </Routes>
      </Router>
      {/* <CategoryPieChart transactions={transactions} /> */}
    </div>
  );
}

export default App;
