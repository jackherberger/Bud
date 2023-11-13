import React, { useEffect, useState } from "react"

function AccountDisplay() {
  const accountId = "654f1da3a472ccdb5403c95d" // sample id
  const [info, setInfo] = useState(
    {
      balance: 0,
      income: 0,
      saving: 0,
    }
  )
  function getInfo() {
    const promise = fetch("http://localhost:8000/account/" + accountId)// sample id
    return promise
  }

  function updateBalance(amount, operator) {
    let newBalance = 0
    if (operator === "+") {
      newBalance = info.balance + amount
    } else if (operator === "-") {
      newBalance = info.balance - amount
    }
    const promise = fetch("http://localhost:8000/account/" + accountId + "/balance",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          balance: newBalance,
        })
      })// sample id
    return promise
  }

  function updateIncome(amount, operator) {
    let newIncome = 0
    if (operator === "+") {
      newIncome = info.income + amount
    } else if (operator === "-") {
      newIncome = info.income - amount
    }
    const promise = fetch("http://localhost:8000/account/" + accountId + "/income",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income: newIncome,
        })
      })// sample id
    return promise
  }

  function updateSaving(amount, operator) {
    let newSaving = 0
    if (operator === "+") {
      newSaving = info.saving + amount
    } else if (operator === "-") {
      newSaving = info.saving - amount
    }
    const promise = fetch("http://localhost:8000/account/" + accountId + "/saving",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          saving: newSaving,
        })
      })// sample id
    return promise
  }
  useEffect(() => {
    getInfo()
      .then((res) => res.json())
      .then((json) => setInfo(json.account[0]))
      .catch((error) => { console.log(error); });
  }, [])

  function renderBankApi() {
    // TODO: implement bank api to change account info
    return (
      <div>
        <button onClick={() => updateBalance(100, "+").then((res) => { if (res.ok) setInfo({ ...info, balance: (info.balance + 100) }) })}>deposit to balance$100</button>
        <button onClick={() => updateBalance(100, "-").then((res) => { if (res.ok) setInfo({ ...info, balance: (info.balance - 100) }) })}>withdraw to balance$100</button>
        <button onClick={() => updateIncome(100, "+").then((res) => { if (res.ok) setInfo({ ...info, income: (info.income + 100) }) })}>deposit to income$100</button>
        <button onClick={() => updateIncome(100, "-").then((res) => { if (res.ok) setInfo({ ...info, income: (info.income - 100) }) })}>withdraw to income$100</button>
        <button onClick={() => updateSaving(100, "+").then((res) => { if (res.ok) setInfo({ ...info, saving: (info.saving + 100) }) })}>deposit to saving$100</button>
        <button onClick={() => updateSaving(100, "-").then((res) => { if (res.ok) setInfo({ ...info, saving: (info.saving - 100) }) })}>withdraw to saving$100</button>
      </div>
    )
  }
  return (
    <React.Fragment>
      <div>
      <h1>Account</h1>
      <h2>balance: ${info.balance}</h2>
      <h2>income: ${info.income}</h2>
      <h2>savings: ${info.saving}</h2>
      </div>
      <div>
        Simulate bank api
        {renderBankApi()}
      </div>
    </React.Fragment>
  )
}
export default AccountDisplay
