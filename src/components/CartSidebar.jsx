import React, { Component } from 'react'
import styled from 'styled-components'
import { CartSidebarBody, CartSidebarFooter } from './molecules'
// FIX: file naming issue on build, have to pull off this hack for now
import CartSidebarHeader from './molecules/CartSIdebarHeader.jsx'
import postLambda from '../utilities/postLambda'
import PropTypes from 'prop-types'
import 'animate.css'

const Container = styled.div`
  display: ${({ displayFix }) => displayFix || 'none'};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  width: 23rem;
  height: 100%;
  background-color: #e4f1f4;
  p {
    text-align: center;
  }
  .contents {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 420px) {
    width: 100%;
  }
`

class CartSidebar extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  }
  handleAdjust = e => {
    let i = parseInt(e.target.dataset.id)
    let keys
    let lastVote
    let newVotes

    //get the previous info for charities this user voted for when adding this product to the cart
    if (this.props.cart[i].charities) {
      keys = Object.keys(this.props.cart[i].charities)
      lastVote = keys[keys.length - 1]
      newVotes = this.props.cart[i].charities
    }

    if (e.target.className === 'add') {
      let newVal = this.props.cart[i].quantity + 1
      this.props.handleCart('edit', 'quantity', newVal, i)

      //increase charity vote count by 1
      if (this.props.cart[i].charities) {
        newVotes[lastVote] = this.props.cart[i].charities[lastVote] + 1
        this.props.handleCart('edit', 'charities', newVotes, i)
      }
    } else {
      let newVal = this.props.cart[i].quantity - 1
      if (newVal < 1) newVal = 1
      this.props.handleCart('edit', 'quantity', newVal, i)

      //decrease charity vote count by 1
      if (this.props.cart[i].charities) {
        newVotes[lastVote] = this.props.cart[i].charities[lastVote] - 1
        if (newVotes[lastVote] < 1) {
          delete newVotes[lastVote]
        }
        this.props.handleCart('edit', 'charities', newVotes, i)
      }
    }
  }

  handleCheckout = e => {
    this.props.handleSidebar()
    const items = this.props.cart.map(item => {
      return {
        variantId: item.sku,
        quantity: item.quantity,
      }
    })
    const hasAccount = this.props.curUser ? true : false

    //update voteCounts in firebase
    let totalVotes = {}
    for (let item of this.props.cart) {
      for (let charity in item.charities) {
        totalVotes[charity] =
          (totalVotes[charity] || 0) + item.charities[charity]
      }
    }
    const { firebase } = this.context
    for (let key in totalVotes) {
      try {
        firebase.addVote(key, totalVotes[key])
      } catch (err) {
        console.log(err)
        this.setState({ status: 'FAILURE' })
      }
    }
    postLambda('createCheckout', {
      items,
      hasAccount,
      user: this.props.curUser,
    }).then(res => {
      window.location.replace(res.data.data.webUrl)
      this.props.handleCart('clear')
    })
  }
  render() {
    const { cart, handleCart, handleSidebar, display } = this.props
    const animation = 'animated ' + (display ? 'slideInRight' : 'slideOutRight')
    const displayFix = this.props.displayFix ? 'inital' : 'none'

    return (
      <Container className={animation} displayFix={displayFix}>
        <div className="contents">
          <CartSidebarHeader cart={cart} handleSidebar={handleSidebar} />
          <CartSidebarBody
            cart={cart}
            handleCart={handleCart}
            handleAdjust={this.handleAdjust}
          />
          <CartSidebarFooter cart={cart} handleCheckout={this.handleCheckout} />
        </div>
      </Container>
    )
  }
}

export default CartSidebar
