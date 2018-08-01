import styled from 'styled-components'

const StyledInput = styled.input`
  width: ${({ width }) => width || '17rem'};
  height: ${({ height }) => height};
  margin-bottom: ${({ marginBottom }) => marginBottom || '.5rem'};
  border-style: solid;
  border-color: #f0f0f0;
  border-width: 2px;
  outline: none;
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
  padding-left: 1rem;
`
export default StyledInput