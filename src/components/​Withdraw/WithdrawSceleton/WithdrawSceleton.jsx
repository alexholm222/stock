import { useEffect, useState } from 'react';
import s from './WithdrawSceleton.module.scss';
import Loader from '../../Loader/Loader';

const WithdrawSceleton = () => {

    return (
        <li className={`${s.item}`}>
            <div className={`${s.field}`}>
                <div><Loader /></div>
                <span><Loader /></span>
            </div>
            <div className={`${s.pos}`}>
                <div><Loader /></div>
            </div>
            <div className={`${s.field}`}>
                <div><Loader /></div>
            </div>
            <div className={`${s.field} ${s.field_2}`}>
                <div><Loader /></div>
            </div>
            <div className={`${s.manager}`}>
                <div><Loader /></div>

            </div>
        </li>
    )
};

export default WithdrawSceleton;