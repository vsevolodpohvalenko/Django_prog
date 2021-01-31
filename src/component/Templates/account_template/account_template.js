import React from 'react'
import s from './account_template.module.css'

import HeaderContainer from '../../layout/Header/HeaderContainer'
import { Link } from 'react-router-dom'


 
export const AccountTemplate = (props) => {
    return ( <div className= {s.main}>
        <div className={s.header}><HeaderContainer/></div>
        <div className={s.photo}><h1 className={s.hidden}>Login</h1></div>
        <div className={s.auth}>{props.children}</div>
        <div className={s.brand}>
            <div className={s.homepage}><Link className={s.link} to="/"> Back to home page<div className={s.toggle}></div></Link></div>
            <h4>For Brands</h4>
            <p>If you are a brand and want to request a proposal from a company, use the request a proposal</p>

                <Link to="/request_for_proposals" type="submit" className={s.button}> Request For Proposals</Link>

            </div>
        </div>
        )
}