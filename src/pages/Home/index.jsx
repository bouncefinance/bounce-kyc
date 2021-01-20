import React from 'react'
import { HomeStyled } from './styled'
import lattice from '../../assets/images/lattice.svg'
import bule_check from '../../assets/images/bule-check.svg'
import bule_star from '../../assets/images/bule-star.svg'
import bule_people from '../../assets/images/bule-people.svg'
import logo_white from '../../assets/logo/logo-white.svg'

import back1 from '../../assets/images/back1.svg'
import back2 from '../../assets/images/back2.svg'
import back3 from '../../assets/images/back3.svg'
import back4 from '../../assets/images/back4.svg'
import back5 from '../../assets/images/back5.svg'
import back6 from '../../assets/images/back6.svg'

import medium from '../../assets/icons/index-medium.svg'
import twitter from '../../assets/icons/index-twitter.svg'
import telegram from '../../assets/icons/index-telegram.svg'

export default function Index() {
    return (
        <HomeStyled>
            <div className="page_wrapper page_one">
                <div className="main">
                    <div className="left">
                        <img src={lattice} alt="lattice" />
                    </div>

                    <div className="right">
                        <h1>Certified crypto auction curated <span>by community</span></h1>
                        <p>Bounce Certified is a branch of Bounce Finance decentralized platform, where high quality of listed projects in ensured by community’s right to activate or block token sales.</p>
                        <p><span>KYC checks</span> / <span>White list sales</span> / <span>Decentralized auction managed by community DAO</span></p>

                        <button>Apply for certified sale</button>
                    </div>
                </div>
            </div>

            <div className="page_other">
                <div className="block">
                    <h3>Features</h3>
                    <ul className='Features_list'>
                        <li>
                            <div className='bg'></div>
                            <h4>
                                <img src={bule_check} alt="" />
                                KYC checks
                            </h4>
                            <p>Know-Your-Customer tools identity verification</p>
                        </li>

                        <li>
                            <div className='bg'></div>
                            <h4>
                                <img src={bule_star} alt="" />
                                White list sales
                            </h4>
                            <p>Exclusive customer sign-up for token auction</p>
                        </li>

                        <li>
                            <div className='bg'></div>
                            <h4>
                                <img src={bule_people} alt="" />
                                Decentralized auction
                            </h4>
                            <p>Auction managed by community DAO</p>
                        </li>
                    </ul>
                </div>


                <div className="block Certified">
                    <h3>Certified Sales Steps</h3>
                    <ul className="step_list">
                        <li className='active'>
                            <h4>
                                <i>1</i>
                                Certified sale application
                            </h4>
                            <p>Submit project information to the voting board to apply for a certified sale</p>
                        </li>

                        <li>
                            <h4>
                                <i>2</i>
                                Community scanning and voting
                            </h4>
                            <p>The community reviews your project for quality and approves the start of the best token sale</p>
                        </li>

                        <li>
                            <h4>
                                <i>3</i>
                                Multisig governance configuration
                            </h4>
                            <p>Execution upon multisignature by parties involved</p>
                        </li>

                        <li>
                            <h4>
                                <i>4</i>
                                Token sale activation
                            </h4>
                            <p>Your certified token sale goes live for verified user</p>
                        </li>
                    </ul>
                </div>

                <div className="utility">
                    <h3>Token Utility</h3>
                    <ul className='utility_list'>
                        <li>
                            <div>
                                <i>1</i>
                                Application fee
                            </div>

                            <div>
                                <i>3</i>
                                Application fee
                            </div>
                        </li>
                        <li>
                            <div>
                                <i>2</i>
                                Application fee
                            </div>

                            <div>
                                <i>4</i>
                                Application fee
                            </div>
                        </li>
                    </ul>
                </div>


            </div>

            <div className="started">
                <div className="bg"></div>
                <div className="main">
                    <h3>Get started to apply for certified sale with Bounce</h3>
                    <button>Get Started</button>
                </div>
            </div>

            <div className="backed">
                <div className="main">
                    <h5>Backed by</h5>
                    <ul>
                        <li>
                            <img src={back1} alt="" />
                        </li>
                        <li>
                            <img src={back2} alt="" />
                        </li>
                        <li>
                            <img src={back3} alt="" />
                        </li>
                        <li>
                            <img src={back4} alt="" />
                        </li>
                        <li>
                            <img src={back5} alt="" />
                        </li>
                        <li>
                            <img src={back6} alt="" />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer">
                <div className="main">
                    <img src={logo_white} alt="" />
                    <div className="link">
                        <ul>
                            <li>
                                <a href="https://bouncefinance.medium.com/">
                                    <img src={medium} alt="" />
                                </a>
                            </li>

                            <li>
                                <a href="https://twitter.com/bounce_finance?s=21">
                                    <img src={twitter} alt="" />
                                </a>
                            </li>

                            <li>
                                <a href="https://t.me/bounce_finance">
                                    <img src={telegram} alt="" />
                                </a>
                            </li>
                        </ul>
                        
                        <p>Forum</p>
                    </div>

                </div>
            </div>
        </HomeStyled>
    )
}
