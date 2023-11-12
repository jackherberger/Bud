import React, { useEffect, useState } from "react"

function AccountDisplay() {
  const [info, setInfo] = useState(
    {
      balance: 0,
      income: 0,
      saving: 0,
    }
  )
  function getInfo() {
    const promise = fetch("http://localhost:8000/account/654f1da3a472ccdb5403c95d")// sample id
    return promise
  }
  useEffect(() => {
    getInfo().then((res) => res.json()).then((json) => setInfo(json.account[0])).catch((error) => { console.log(error); });
  }, [])
  return (
    <div>
      <h1>Account</h1>
      <h2>balance: ${info.balance}</h2>
      <h2>income: ${info.income}</h2>
      <h2>savings: ${info.saving}</h2>
    </div>
  )
}
export default AccountDisplay
