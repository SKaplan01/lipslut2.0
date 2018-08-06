import React from 'react'
import Spinner from 'react-spinkit'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`

const Loading = () => (
  <Container>
    <Spinner name="double-bounce" name="ball-beat" color="#ff0086" />
  </Container>
)

export default Loading
