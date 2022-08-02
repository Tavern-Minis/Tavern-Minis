import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = "GET_CART"
const ADD_TO_CART = "ADD_TOCART"

/**
 * ACTION CREATORS
 */
const getCart = (cart) => ({type: GET_CART, cart})
const addToCart = (item) => ({type: ADD_TO_CART, item})

/**
 * THUNK CREATORS
 */
export const gettingCart = (user) => async dispatch => {
    if (user){ //if logged in will have a user id to retreiver the cart
      const res = await axios.get(`/api/cart/${user.id}`) //find cart of that user
      return dispatch(getCart(res.data))
    }
}
 
export const addingToCart = (item,user) => async dispatch => {
    let res = ''
    if (user){
      res = await axios.put(`/api/cart/${user}`, { //Send Id of item to that user
        item
      })
    }
    else{
      res = await axios.get(`/api/products/${item}`) //Use item of id to add to cart if not logged in. Doesnt change database
    }
    return dispatch(addToCart(res.data))
}

/**
 * REDUCER
 */
 
const initialState = [] 
 
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      let cart = state.slice()
      cart.push(action.item)
      return cart //added to the what is already in the cart
    default:
      return state
  }
}