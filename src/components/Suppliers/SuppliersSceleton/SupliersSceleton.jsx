import { useEffect, useState } from 'react';
import s from './SupliersSceleton.module.scss';
import Loader from '../../Loader/Loader';

const SupliersSceleton = () => {

    return (
        <li className={`${s.item}`}>
            <div className={`${s.supl}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.field}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.field}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.field} ${s.field_2}`}>
            <div><Loader/></div>
           
            </div>
        </li>
    )
};

export default SupliersSceleton;