import { useEffect, useState } from 'react';
import s from './BalanceItemSceleton.module.scss';
import Loader from '../../Loader/Loader';

const BalanceItemSceleton = () => {

    return (
        <li className={`${s.item}`}>
            <div className={`${s.number}`}>
               <div><Loader/></div>
            </div>
            <div className={`${s.name}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.outgo}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.total}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.position}`}>
            <div className={s.position_1}><Loader/></div>
            <span><Loader/></span>
            </div>

            <div className={`${s.action}`}>
                <button className={s.button_2}>
                <Loader/>
                </button>
                <button  className={s.button}>
                <Loader/>
                </button>
            </div>
           
        </li>
    )
};

export default BalanceItemSceleton;