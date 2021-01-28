import React  from "react";
import styled from 'styled-components'
import icon_radio from '../../assets/icons/radio.svg'

const InputFrame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => (width ? width : '480px')};
  margin-top: ${({ top }) => (top ? top : 0)};
  
  input{
      background-color: transparent;
    /* opacity: .3; */
      &:hover{
        opacity: 1;
        border-color: ${({ theme }) => (theme.grey3)};
      }

      &:focus{
        opacity: 1
      }
  }

  &.err input{
    border-color: #E43F29;
    opacity: 1;
    &:hover{
        opacity: 1;
        border-color: ${({ theme }) => (theme.grey3)};
      }

    &:focus{
      opacity: 1
    }
  }

  .radio{
    &>div{
      display: flex;
      align-items: center;
      label{
        display: flex;
        align-items: center;
        vertical-align: middle;
        font-size: 14px;
        font-family: 'Helvetica Neue';
        font-weight: 500;
        color: #1F191B;
        cursor: pointer;

        input[type='radio'] + i{
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #000;
          margin-right: 8px;
        }
        input{
          display: none;
          &:checked + i{
            border: none;
            background: url(${icon_radio}) no-repeat;
            background-size: contain;
            background-position: 0 0;
          }
        }
      }
    }
  }
`

const Name = styled.span`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: ${({ theme, disabled }) => (disabled ? theme.grey3 : theme.black)};
  opacity: ${({ disabled }) => (disabled ? 1 : .7)};

  &.err{
    color: #E43F29;
  }
`

export const Input = styled.input`
  width: ${({ width }) => (width ? width : '100%')};
  border-color: ${({ theme }) => (theme.primary)};
  border-style: solid;
  font-family: Helvetica Neue;
  border-top-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  border-left-width: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 9px 9px 0 0;
  flex: 1;
`

const Extra = styled.span`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: #1F191B;
  position: absolute;
  right: 0;
  /* top: -9px; */
  top: 0px;
`

const AddonBefore = styled.div`
   width: 18px;
   position: absolute;
   bottom: 4px;
`
const AddonAfter = styled.div`
  position: absolute;
  right: 0;
  bottom: 9px;
  cursor: pointer;
  img{
    width: 20px;
    height: 13px;
  }
`
const Error = styled.span`
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 13px;
  color: #E43F29;
  position: absolute;
  text-align: left;
  bottom: -20px;
`

export const FormStatus = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`


export const Form = ({ error, value, name, input, onBlur, prefix, suffix, extra, addonBefore, addonAfter, width, top, disabled, type }) => {
  return (
    <InputFrame
      width={width}
      top={top}
      className={error ? 'err' : ''}
    >
      {name && <Name className={error ? 'err' : ''} disabled={disabled}>{name}</Name>}
      <div style={{ display: 'flex', alignItems: 'center' }} className={type || ''}>
        {prefix && <div style={{ marginRight: 9, marginTop: 9, display: 'flex' }}>{prefix}</div>}
        {input && input}
        {suffix && suffix}
        {error ? <Error>{error}</Error> : null}
      </div>
      {extra && <Extra>{extra}</Extra>}
      {addonBefore && <AddonBefore>{addonBefore}</AddonBefore>}
      {addonAfter && <AddonAfter>{addonAfter}</AddonAfter>}
    </InputFrame>
  )
}

