import React, { Component } from 'react'
import styled from 'styled-components'
import { OrderConfirmationSummary } from '../components/molecules'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadein 1s;
  margin-top: 1rem;
  h2 {
    padding-bottom: 6px;
    border-bottom: 3px solid currentColor;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  p {
    width: 40vw;
    text-align: center;
  }
`
class OrderConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updated: false,
      cart: [],
    }
  }

  componentDidUpdate() {
    if (!this.state.updated) {
      this.setState({ cart: this.props.cart, updated: true })
      this.props.clearCart()
    }
  }
  render() {
    const { addItem, subtotal, tax } = this.props
    const cart = this.state.cart
    const shipping = 4.95
    return (
      <Container>
        <h1>Thank You!</h1>
        <h2>Lipslut Order Confirmation</h2>
        <p>
          We've recieved your order and are preparing to ship it out. This is
          your receipt and confirmation of the order. Check your email for
          another confirmation of this order and package tracking information.
        </p>
        <OrderConfirmationSummary
          cart={cart}
          addItem={addItem}
          subtotal={subtotal}
          tax={tax}
          shipping={shipping}
        />
      </Container>
    )
  }
}

export default OrderConfirmation