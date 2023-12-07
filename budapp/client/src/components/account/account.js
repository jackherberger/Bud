import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import "./AccountDisplay.css";
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
// const baseUrl = "http://localhost:8000";

function AccountDisplay(props) {
  const [info, setInfo] = useState({
    balance: 0,
    income: 0,
    saving: 0,
    spending: 0,
  });

  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("+"); // + for deposit, - for withdr
  const [selectedAccount, setSelectedAccount] = useState("balance");
  const INVALID_TOKEN = "INVALID_TOKEN"; // for token usage and passes valid authenticated requests
  const [token, setToken] = useState(localStorage.getItem("token"));

  const adjustedBalance = info.balance - info.spending;

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  useEffect(() => {
    console.log("useEffect in AccountDisplay triggered");
    if (token !== null && token !== INVALID_TOKEN) {
      getInfo();
    }
  }, [props.accountId, props.customerId]);

  // Get the info needed for account from accounts and transaction
  function getInfo() {
    if (token !== null && token !== INVALID_TOKEN) {
      console.log(token);
      Promise.all([
        fetch(`${baseUrl}/account/` + props.accountId, {
          method: "GET",
          headers: addAuthHeader({
            "Content-Type": "application/json",
          }),
        }).then((res) => res.json()),
        fetch(`${baseUrl}/transactions/` + props.customerId, {
          method: "GET",
          headers: addAuthHeader({
            "Content-Type": "application/json",
          }),
        }).then((res) => res.json()),
      ])
        .then(([accountData, transactions]) => {
          // Extract necessary data from the responses
          const accountInfo = accountData.account[0];
          const spendingList = transactions[0].transaction_list;

          // Calculate total spending
          const totalSpending = spendingList.reduce(
            (acc, transaction) => acc + parseInt(transaction.price, 10),
            0
          );
          accountInfo.spending = totalSpending;

          // Update state or perform other actions with the data
          setInfo(accountInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Update the account when adding or subtracting to the three catagories
  function updateAccount(type) {
    let newAmount = 0;
    if (type === "+") {
      newAmount = info[selectedAccount] + amount;
    } else if (type === "-") {
      newAmount = info[selectedAccount] - amount;
    }

    fetch(`${baseUrl}/account/${props.accountId}/${selectedAccount}`, {
      method: "PATCH",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        [selectedAccount]: newAmount,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(selectedAccount);
          console.log(props.accountId);
          setInfo({ ...info, [selectedAccount]: newAmount });
          setAmount(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <div className="account-display">
        <h1>Account</h1>
        <h2>Balance: {adjustedBalance}</h2>
        <h2>Income: {info.income}</h2>
        <h2>Savings: {info.saving}</h2>
        <h2>Spendings: {info.spending}</h2>
      </div>
      <div className="input-container">
        <input
          type="number"
          name="dollars"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="amount-input"
        />
        <select
          value={transactionType}
          name="transactionoption"
          onChange={(e) => setTransactionType(e.target.value)}
          className="transaction-select"
        >
          <option value="+">Deposit</option>
          <option value="-">Withdraw</option>
        </select>
        <select
          value={selectedAccount}
          name="accountoption"
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="account-select"
        >
          <option value="balance">Balance</option>
          <option value="income">Income</option>
          <option value="saving">Savings</option>
        </select>
        <button
          value="deposit"
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
        <ChartComponent
          balance={adjustedBalance}
          income={info.income}
          savings={info.saving}
          spendings={info.spending}
        />
      </div>
    </React.Fragment>
  );
}

export default AccountDisplay;
