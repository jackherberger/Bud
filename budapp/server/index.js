import express from 'express'
import cors from 'cors'
import UserServices from './models/userServices.js'
import AccountServices from './models/accountServices.js'
import { authenticateUser, loginUser } from './models/auth.js'
import dotenv from 'dotenv'
import userServices from './models/userServices.js'
dotenv.config()
import TransactionServices from './models/transactionServices.js'
import CustomerServices from './models/customerServices.js'

const PORT = 8000

const app = express(express.json())
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

app.get('/users', authenticateUser, async (req, res) => {
  const result = await UserServices.getUsers()
  res.send(result)
})

app.get('/transactions/:id', async (req, res) => {
  try {
    const id = req.params['id']
    const transactions = await TransactionServices.getTransactions(id)
    res.send(transactions)
  } catch (error) {
    console.error('Error getting transactions:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.post('/transactions/:id', authenticateUser, async (req, res) => {
  try {
    const id = req.params['id']
    const transaction = req.body
    const result = await TransactionServices.addTransaction(transaction, id)
    res.status(201).json(result)
  } catch (error) {
    console.error('Error adding transaction:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await userServices.getUserByEmail(email)

    if (existingUser) {
      // User already exists, return a 409 Conflict status
      return res.status(409).json({ error: 'User already exists' })
    }
  } catch (error) {
    console.error('Error during signup:', error)
    res.status(500).json({ message: 'Internal server error' })
  }

  try {
    // Create a new user
    const newaccount = await AccountServices.addAccount(0, 0, 0, 0)
    //treat as new customer for now
    const newcustomer = await CustomerServices.addCustomer()
    const { promise: result, token: ourToken } = await UserServices.addUser(
      name,
      email,
      password,
      0
    )
    // now attach them
    const attachaccount = await CustomerServices.attachAccountToCustomer(
      newaccount._id,
      newcustomer._id
    )
    const attachcustomer = await CustomerServices.attachCustomerToUser(
      newcustomer._id,
      result._id
    )

    if (ourToken) res.status(201).send({ token: ourToken })
    else res.status(500).end()
  } catch (error) {
    console.error('Error during signup:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/checkLogin', loginUser)

//account stuff
app.get('/account/:id', authenticateUser, async (req, res) => {
  const id = req.params['id']
  const result = await AccountServices.getAccountInfo(id)
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.')
  else {
    res.send({ account: result })
  }
})
app.post('/account', authenticateUser, async (req, res) => {
  try {
    const balance = req.body['balance']
    const income = req.body['income']
    const spending = req.body['spending']
    const saving = req.body['saving']
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send('An error ocurred in the server. Please check your req body.')
      .end()
    return
  }
  try {
    const result = await AccountServices.addAccount(
      balance,
      income,
      spending,
      saving
    )
    if (result) res.status(201).send(result)
    else res.status(500).end()
  } catch (error) {
    console.log(error)
    res.status(500).send('An error ocurred in the server.').end()
    return
  }
})

app.patch('/account/:id/balance', authenticateUser, async (req, res) => {
  const id = req.params['id']
  try {
    const newBalance = req.body['balance']
    console.log(req.body)
    const result = await AccountServices.editAccountBalance(id, newBalance)
    if (!result['matchedCount']) res.status(404).send('Resource not found.')
    else {
      res.status(200).send({ account_list: result })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send(
        'An error ocurred in the server. Please check your req body for balance.'
      )
      .end()
    return
  }
})

app.patch('/account/:id/income', authenticateUser, async (req, res) => {
  const id = req.params['id']
  try {
    const newIncome = req.body['income']
    console.log(req.body)
    const result = await AccountServices.editAccountIncome(id, newIncome)
    if (!result['matchedCount']) res.status(404).send('Resource not found.')
    else {
      // if(result["upsertedCount"])
      //   res.send({account_list: result});
      // else
      //   res.send("Found but did not update")
      res.status(200).send({ account_list: result })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send(
        'An error ocurred in the server. Please check your req body for income.'
      )
      .end()
    return
  }
})

app.patch('/account/:id/spending', authenticateUser, async (req, res) => {
  const id = req.params['id']
  try {
    const newSpending = req.body['spending']
    console.log(req.body)
    const result = await AccountServices.editAccountSpending(id, newSpending)
    if (!result['matchedCount']) res.status(404).send('Resource not found.')
    else {
      res.status(200).send({ account_list: result })
    }
  } catch (error) {
    res
      .status(500)
      .send(
        'An error ocurred in the server. Please check your req body for spending.'
      )
      .end()
    return
  }
})

app.patch('/account/:id/saving', authenticateUser, async (req, res) => {
  const id = req.params['id']
  try {
    const newSaving = req.body['saving']
    console.log(req.body)
    const result = await AccountServices.editAccountSavings(id, newSaving)
    if (!result['matchedCount']) res.status(404).send('Resource not found.')
    else {
      // if(result["upsertedCount"])
      //   res.send({account_list: result});
      // else
      //   res.send("Found but did not update")
      res.status(200).send({ account_list: result })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send(
        'An error ocurred in the server. Please check your req body for saving.'
      )
      .end()
    return
  }
})

app.get('/customer/:id', authenticateUser, async (req, res) => {
  const id = req.params['id']
  const result = await CustomerServices.getCustomerInfo(id)
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.')
  else {
    res.send({ customer: result })
  }
})

app.get('/account/:id/balance', async (req, res) => {
  const accountId = req.params.id

  try {
    // Call the service function to get the account information
    const accountInfo = await AccountServices.getAccountInfo(accountId)

    // Check if the account information is found
    if (accountInfo.length === 0) {
      return res.status(404).send('Account not found.')
    }

    // Send the account balance in the response
    res.status(200).json({ balance: accountInfo[0].balance })
  } catch (error) {
    console.error('Error getting account balance:', error)
    res.status(500).send('Internal Server Error')
  }
})
