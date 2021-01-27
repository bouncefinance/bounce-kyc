import React from 'react'
import styled from 'styled-components'

const MessageFrame = styled.div`
  color: #000;
  width: 100%;
  min-height: 60px;
  text-align: center;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  margin-top: 16px;
`


const Link = styled.a`
  display: contents;
  text-decoration: underline;
  text-decoration-color: #000;
`

export const TipLink = ({content, link, linkTitle}) => {
  return (
      <MessageFrame>
        Have problems with Joining?  <Link target="_blank" href={'https://docs.bounce.finance/'}>{'Click here to read instructions'}</Link>
      </MessageFrame>
  )
}
