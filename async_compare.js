let done = (user, orders) => {
  // Do something complex requiring both user and orders at the same time
  console.log(user, orders)
}

// Callbacks
database.connect((error, connection) => {
  let user = null
  let orders = null
  connection.query('user', (error, user_results) => {
    user = user_results
    if (orders){
      done(user, orders)
    }
  })
  connection.query('orders', (error, orders_results) => {
    orders = orders_results
    if(user){
      done(user, orders)
    }
  })
})

// Promises
database.connect.then((connection) => {
  user_promise = connection.query('user')
  orders_promise = connection.query('orders')
  Promise.all([user_promise, orders_promise]).then((user, orders){
    done(user, orders)
  })
})

// Async Functions
let connection = await database.connect()
let user, orders = await [connection.query('user'), connection.query('orders')]
done(user, orders)