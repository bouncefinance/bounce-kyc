import React, {useState} from 'react'
import styled from 'styled-components'
import icon_close from '../../assets/icons/icon-close-white.svg'

const MessageFrame = styled.div`
  color: ${({ color }) => (color)};
  background-color: ${({ background }) => (background)};
  min-height: 60px;
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 100px;
  @media (max-width: 767px) {
    padding: 12px 30px 12px 10px;
  }
`

const Close = styled.img`
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: auto;
  right: 48px;
  top: auto;
  bottom: auto;
  @media (max-width: 767px) {
    right: 10px;
    top: 10px;
  }
`

const Link = styled.a`
  display: contents;
  text-decoration: underline;
  text-decoration-color: #FFF;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

export const Message = ({title, content, type, link, linkTitle, warning, onClose}) =>{
  const [show, setShow] = useState(true)
  return show ?
      <MessageFrame style={{textAlign: title? 'left': 'center'}} color={warning?'#E43F29': '#FFF'} background={type? type === 'success'? '#2DAB50' : '#E43F29': '#000'}>
        {title && <Title>{title}</Title>}
        {content} {link && linkTitle && <Link target="_blank" href={link}>{linkTitle}</Link>}
        <Close src={icon_close} onClick={()=>{
          if(onClose){
            onClose()
          }else {
            setShow(false)
          }
        }}/>
      </MessageFrame>
      : null
}
