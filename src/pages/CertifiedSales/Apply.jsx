import React, { useContext, useEffect, useState } from 'react'
import { Button } from "../../components/common/Button";
import bounceERC20 from '../../web3/abi/bounceERC20.json'
import BounceProVoting from '../../web3/abi/BounceProVoting.json'

import { ApplyModal } from "./ApplyModal";
import {
  initStatus,
  approveStatus,
  pendingStatus,
  confirmStatus,
  successStatus,
  errorStatus,
  cancelStatus
} from "./ApplyModal";
import {getContract, useActiveWeb3React} from "../../web3";
import {BOT, BOUNCE_PRO_VOTING} from "../../web3/address";
import Web3 from "web3";

export const Apply = () => {

  const [modalStatus, setModalStatus] = useState(initStatus)
  const { account, library, chainId, active } = useActiveWeb3React()

  const onApply = async () => {
    console.log('onApply', active)
    setModalStatus(approveStatus);

    try {
      const tokenContract = getContract(library, bounceERC20.abi, BOT(chainId))
      const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))

      const result = await tokenContract.methods.approve(
        BOUNCE_PRO_VOTING(chainId),
        '300000000000000000',
      )
        .send({ from: account });
      setModalStatus(confirmStatus);
      if (result.status) {
        await bounceContract.methods.create('1')
          .send({ from: account })
          .on('transactionHash', hash => {
            setModalStatus(pendingStatus)
          })
          .on('receipt', (_, receipt) => {
            setModalStatus(successStatus)
          })
          .on('error', (err, receipt) => {
            setModalStatus(errorStatus)
          })
      } else {
        setModalStatus(errorStatus)
      }
    } catch (err) {
      if (err.code === 4001) {
        setModalStatus(cancelStatus)
      } else {
        setModalStatus(errorStatus)
      }
      console.log('err', err);
    }
  };

  const onSign = async () =>{
    const web3 = new Web3(library.provider);
    const sign = await web3.eth.personal.sign('0x1',account)
    console.log('sign',sign)
  }


  return (
    <div>
      <Button onClick={onApply}>Apply</Button>
      <ApplyModal onOK={() => {
        setModalStatus(initStatus)
        //history.goBack()
      }} onDismiss={() => {
        setModalStatus(initStatus)
      }} modalStatus={modalStatus} />
    </div>
  )
}
