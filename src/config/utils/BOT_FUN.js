import { weiToNumber } from "../../utils/numberTransform";
import { getContract } from "../../web3";
import bounceERC20 from "../../web3/abi/bounceERC20.json";
import { AUCTION } from "../../web3/address";

export const queryBotBalance = async (library, account, chainId) => {
    const tokenContract = getContract(library, bounceERC20.abi, AUCTION(chainId))

    let balance = await tokenContract.methods.balanceOf(account).call()

    balance = weiToNumber(balance, 18)
    return balance
}