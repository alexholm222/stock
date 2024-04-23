import { useEffect, useState } from 'react';
import s from './ContractsSceleton.module.scss';
import Loader from '../../Loader/Loader';

const ContractsSceleton = () => {

    return (
        <li className={`${s.item}`}>
           {/*  <div className={`${s.supl}`}>
                <div><Loader /></div>
            </div> */}
            <div className={s.supl}>
                <div className={s.supl_1}>
                    <div><Loader /></div>
                </div>
                <div className={s.supl_2}>
                    <div><Loader /></div>
                </div>
            </div>
            <div className={`${s.field}`}>
                <div><Loader /></div>
            </div>
            <div className={`${s.field} ${s.field_3}`}>
                <div><Loader /></div>
            </div>
            <div className={`${s.field} ${s.field_2}`}>
                <div><Loader /></div>
            </div>
            <div className={`${s.field} ${s.field_2}`}>
                <div><Loader /></div>
            </div>
            <div className={`${s.status} `}>
                <div><Loader /></div>
            </div>
        </li>
    )
};

export default ContractsSceleton;