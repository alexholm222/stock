import { useEffect, useState } from 'react';
import s from './OutcomingSceleton.module.scss';
import Loader from '../../Loader/Loader';

const OutcomingSceleton = () => {

    return (
        <li className={`${s.item}`}>
            <div className={`${s.field}`}>
                <div><Loader /></div>
                <span><Loader /></span>
            </div>
            <div className={`${s.pos}`}>
                <div><Loader /></div>
                <span><Loader /></span>
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

            <div className={`${s.status}`}>
                <div><Loader /></div>
                <div><Loader /></div>
            </div>
        </li>
    )
};

export default OutcomingSceleton;