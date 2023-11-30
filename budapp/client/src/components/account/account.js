import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import "./AccountDisplay.css";

function AccountDisplay(props) {
  const accountId = props.accountId; // sample id
  const [info, setInfo] = useState({
    balance: 0,
    income: 0,
    saving: 0,
  });
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("+"); // + for deposit, - for withdraw
  const [selectedAccount, setSelectedAccount] = useState("balance");

  function getInfo() {
    fetch("http://localhost:8000/account/" + accountId)
      .then((res) => res.json())
      .then((json) => setInfo(json.account[0]))
      .catch((error) => {
        console.log(error);
      });
  }

  function updateAccount(type) {
    let newAmount = 0;
    if (type === "+") {
      newAmount = info[selectedAccount] + amount;
    } else if (type === "-") {
      newAmount = info[selectedAccount] - amount;
    }

    fetch(`http://localhost:8000/account/${accountId}/${selectedAccount}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [selectedAccount]: newAmount,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setInfo({ ...info, [selectedAccount]: newAmount });
          setAmount(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>Account</h1>
        <h2>Balance: ${info.balance}</h2>
        <h2>Income: ${info.income}</h2>
        <h2>Savings: ${info.saving}</h2>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="amount-input"
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="transaction-select"
        >
          <option value="+">Deposit</option>
          <option value="-">Withdraw</option>
        </select>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="account-select"
        >
          <option value="balance">Balance</option>
          <option value="income">Income</option>
          <option value="saving">Savings</option>
        </select>
        <button
          onClick={() => updateAccount(transactionType)}
          className={`update-button ${
            transactionType === "+" ? "deposit" : "withdraw"
          }`}
        >
          {transactionType === "+" ? "Deposit" : "Withdraw"} ${amount} to{" "}
          {selectedAccount}
        </button>
      </div>
      <div className="chart-container">
        <ChartComponent data={info} />
      </div>
    </React.Fragment>
  );
}

export default AccountDisplay;
