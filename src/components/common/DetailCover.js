import React, {useState,useEffect} from 'react'
import styled from "styled-components";

export const Cover = styled.img`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  object-fit: contain;
`

const CoverFrame = styled.div`
  width: 100%;
  height: revert;
  position: relative;
`

const Modal = styled.div`
  width: 100%;
  height: 100%;
  padding: 14px;
  box-sizing: border-box;
  top: 0;
  position: absolute;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(image.png);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Tip = styled.a`
  width: 100%;
  height: 100%;
  line-height: 400px;
  /* border-top: 3px solid #fff;
  border-bottom: 3px solid #fff; */
  border: 1px solid #fff;
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: white;
  cursor: pointer;
`

export const PoolCover = ({cover, url, link})=>{
    const [hover, setHover] = useState(false)

  useEffect(() => {
    console.log('dutchAuctionNft', cover)
  }, [cover])

    return (
        <CoverFrame onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            <Cover width={'100%'}src={cover}/>
            {hover && (
                <Modal >
                    <Tip target="_blank" href={link? link: cover}>Click to see the original contentof the NFT</Tip>
                </Modal>
            )}
        </CoverFrame>
    )
}
