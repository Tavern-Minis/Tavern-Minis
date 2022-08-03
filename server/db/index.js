//this is the access point for all things database related!

const db = require('./db')

const { User, Product, Order } = require('./models')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
    Order
  },
}
