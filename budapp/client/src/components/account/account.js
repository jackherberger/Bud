import React, { useEffect, useState } from "react"
import ChartComponent from "./ChartComponent"
import "./AccountDisplay.css"

function AccountDisplay(props) {
  const [info, setInfo] = useState({
    balance: 0,
    income: 0,
    saving: 0,
    spending: 0,
  })
  const [amount, setAmount] = useState(0)
  const [transactionType, setTransactionType] = useState("+") // + for deposit, - for withdr
  const [selectedAccount, setSelectedAccount] = useState("balance")

  const adjustedBalance = info.balance - info.spending

  useEffect(() => {
    console.log("useEffect in AccountDisplay triggered")
    getInfo()
  }, [props.accountId, props.customerId])

  function getInfo() {
    Promise.all([
      fetch("http://localhost:8000/account/" + props.accountId).then((res) =>
        res.json()
      ),
      fetch("http://localhost:8000/transactions/" + props.customerId).then(
        (res) => res.json()
      ),
    ])
      .then(([accountData, transactions]) => {
        // Extract necessary data from the responses
        const accountInfo = accountData.account[0]
        console.log(accountInfo)
        const spendingList = transactions[0].transaction_list
        console.log(transactions)
        // Calculate total spending
        const totalSpending = spendingList.reduce(
          (acc, transaction) => acc + parseInt(transaction.price, 10),
          0
        )
        accountInfo.spending = totalSpending

        accountInfo.balance -= totalSpending

        // Update state or perform other actions with the data
        setInfo(accountInfo)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function updateAccount(type) {
    let newAmount = 0
    if (type === "+") {
      newAmount = info[selectedAccount] + amount
    } else if (type === "-") {
      newAmount = info[selectedAccount] - amount
    }

    fetch(
      `http://localhost:8000/account/${props.accountId}/${selectedAccount}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [selectedAccount]: newAmount,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(selectedAccount)
          console.log(props.accountId)
          setInfo({ ...info, [selectedAccount]: newAmount })
          setAmount(0)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      <div>
        <h1>Account</h1>
        <h2>Balance: ${adjustedBalance}</h2>
        <h2>Income: ${info.income}</h2>
        <h2>Savings: ${info.saving}</h2>
        <h2>Spendings: ${info.spending}</h2>
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
        <ChartComponent
          balance={adjustedBalance}
          income={info.income}
          savings={info.saving}
          spendings={info.spending}
        />
      </div>
    </React.Fragment>
  )
}

export default AccountDisplay
