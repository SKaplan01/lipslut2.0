import React, { Component } from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'
import { FaCaretDown } from 'react-icons/lib/fa'
import 'animate.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .dropdown {
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    border-radius: 2px;
    box-shadow: 1px 1px 10px 0 rgba(46, 61, 73, 0.2);
    margin-top: 2rem;
    animation-duration: 0.5s;
    z-index: 3;
  }
  .links {
    display: flex;
    flex-direction: column;
  }
`

class DropdownMenu extends Component {
  state = {
    display: false,
  }
  showMenu = () => {
    this.setState({ display: true })
  }
  hideMenu = () => {
    this.setState({ display: false })
  }

  render() {
    const display = this.state.display ? 'initial' : 'none'
    const links = this.props.links.map(link => (
      <NavLink to={link.page}>{link.text}</NavLink>
    ))
    return (
      <Container onMouseLeave={this.hideMenu}>
        <NavLink className="dropdown" onMouseEnter={this.showMenu}>
          {this.props.dropdownText}
          <FaCaretDown />
        </NavLink>
        <div
          className="dropdown-content animated fadeInUp"
          style={{ display: display }}
        >
          <div className="links">{links}</div>
        </div>
      </Container>
    )
  }
}

export default DropdownMenu