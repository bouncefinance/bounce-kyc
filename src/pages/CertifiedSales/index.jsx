import React from 'react'
import { CsStyled } from './styled'
import Card from './Card'
import SaleCard from './SaleCard'
import { usePoolList } from "./hooks";
import { EmptyLayout } from "../../components/common/Layout";
import loading from "../../assets/icons/loading.svg";

export default function Index() {
  const { list } = usePoolList()
  // console.log(list)
  return (
    <CsStyled>
      {!list || list.length === 0 ? (
        <EmptyLayout>
          <img src={loading} alt="" />
          <p>{Array.isArray(list) && list.length === 0 ? 'The next bounce certified sale will come soon. Stay tuned!' : 'Sales are loading ... Please wait'}</p>
        </EmptyLayout>

        // <SaleCard pool={{
        //   proInfo: {
        //     additionalinfo: "no",
        //     allocationperwallet: "No limits",
        //     amountoftoken: "1000",
        //     architecture: "fdaef",
        //     attachmenturl: "",
        //     auctiontime: "90060",
        //     auctiontype: "Fixed swap auction",
        //     circulatingsupply: "111",
        //     code: 1,
        //     contactemail: "yuhuakukude@gmail.com",
        //     created_at: "2021-01-22T13:00:34Z",
        //     fackbook: "",
        //     githublink: "https://tool.chinaz.com/tools/unixtime.aspx",
        //     id: 1,
        //     ifkyc: 1,
        //     ifwhitelist: 1,
        //     medium: "https://bouncefinance.medium.com/",
        //     pricepertoken: "100",
        //     prologourl: "74aef2f42bcac9aab90b90726b921f73.jpg",
        //     proname: "dfaf",
        //     prosummary: "dad",
        //     protheme: "defi",
        //     prowebsite: "https://tool.chinaz.com/tools/unixtime.aspx",
        //     teambio: "fwaef",
        //     teamwallet: "0xe2Ce91F22ed39520e8b099F3800BD21f5b090b56",
        //     techhighlight: "dfawf",
        //     telegram: "https://t.me/bounce_finance",
        //     tokencontractaddress: "0xe2Ce91F22ed39520e8b099F3800BD21f5b090b56",
        //     tokendistribution: "aff",
        //     tokenlookupschedule: "feawfew",
        //     tokenticketer: "DFSF",
        //     totalsupply: "100",
        //     twitter: "https://twitter.com/bounce_finance?s=21",
        //     updated_at: "2021-01-25T09:42:27Z",
        //     whitepaperlink: "https://tool.chinaz.com"
        //   }
        // }} />
      ) :
        list.sort((item1, item2) => {
          // console.log('sort', item1, item2)
          return item2.id - item1.id
        }).map((item, index) => {
          return (
            <Card key={index} pool={item} status='Active' />
          )
        })}
    </CsStyled>
  )
}
