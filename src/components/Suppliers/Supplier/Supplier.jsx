import { useState } from 'react';
import s from './Supplier.module.scss';
import { ReactComponent as IconCheck } from '../../../image/icon/iconCheck.svg';
//API
import { updateVendorIgnor } from '../../../Api/Api';

const Supplier = ({el}) => {
    const [check, setCheck] = useState(el.act == 0 ? true : false);
    const role = document.getElementById('root_stock').getAttribute('role');

    const handleCheck = () => {
        check ? setCheck(false) : setCheck(true)
        if(check) {
            updateVendorIgnor(el.id, false)
            .then(res => {
                console.log(res)
                setCheck(false)
            })
        } else {
            updateVendorIgnor(el.id, true)
            .then(res => {
                console.log(res)
                setCheck(true)
            })
        }
    }

    return (
        <div className={s.supplier}>
            <div className={s.supl}>
                <p>{el.name}</p>
            </div>
            <div className={s.field}>
                <p>{!el.inn || el.inn == ''  ? '-' : el.inn}</p>
            </div>
            <div className={s.field}>
                <p>{!el.kpp || el.kpp == ''  ? '-' : el.kpp}</p>
            </div>
            <div className={s.field}>
                <div onClick={handleCheck} className={`${s.checkbox} ${check && s.checkbox_check} ${role !== 'administrator' && s.checkbox_dis}`}>
                    <div>
                        <IconCheck />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Supplier;