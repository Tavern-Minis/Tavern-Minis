import React from 'react'
import { connect } from 'react-redux'

const Checkout = props => {
  return (
    <h1 className="title">Your order has been placed!</h1>
  )
}

export default connect(null)(Checkout)
