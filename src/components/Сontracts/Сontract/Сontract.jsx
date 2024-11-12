import { useEffect, useState } from 'react';
import s from './Сontract.module.scss';
import { ReactComponent as IconCheck } from '../../../image/icon/iconCheck.svg';
import { dateContract } from '../../../utils/dates';
import ModalСontracts from '../ModalСontracts/ModalСontracts';
import { dateContract2, compareDate } from '../../../utils/dates';

const Bage = ({ type, dayRemain }) => {
    return (
        <>
            {type == 'active' && <div className={`${s.bage} ${s.bage_green}`}><p>Действующий</p></div>}
            {type == 'deadline' && <div className={`${s.bage} ${s.bage_yellow}`}><p>Истекает срок действия</p></div >}
            {type == 'disabled' && <div className={`${s.bage}`}><p>Срок действия истек</p></div >}
        </>
    )
}


const Сontract = ({ el, vendor, payer, payers, vendors }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [status, setStatus] = useState('active');
    const [dayRemain, setDayRemain] = useState(0);
    const filesArr = [el.bill, el.bill2, el.bill3, el.bill4, el.bill5, el.bil6, el.bill7].filter(el => el && el !== null);

    const newArr = filesArr.map((el, i) => {
        return {
            file: el,
            id: i + 1
        }
    });

    useEffect(() => {
        const stutus = compareDate(el.end_date).status;
        const dayRemain = compareDate(el.end_date).diffDays
        setStatus(stutus);
        setDayRemain(Math.ceil(dayRemain))

    }, [el])

    const handleOpenModal = () => {
        setOpenEdit(true)
    }
    return (
        <>
            <div onClick={handleOpenModal} className={s.contract}>
                <div className={s.supl}>
                    <p>{vendor?.name}</p>
                    <span>ИНН {vendor?.inn}  КПП {vendor?.kpp}</span>
                </div>
                <div className={s.field}>
                    <p>{payer?.name}</p>
                </div>
                <div className={s.field}>
                    <p>{el?.contract_number}</p>
                </div>
                <div className={`${s.field} ${s.field_2}`}>
                    <p>{el.start_date ? dateContract(el.start_date) : ''}</p>
                </div>

                <div className={`${s.field} ${s.field_2}`}>
                    <p>{el.end_date ? dateContract(el.end_date) : ''}</p>
                </div>

                <div className={s.status}>
                    <Bage type={status} dayRemain={dayRemain}/>
                </div>
            </div>
            {openEdit ? <ModalСontracts setModal={setOpenEdit} payers={payers} vendors={vendors} vendor={vendor} payer={payer} el={el} type={'existing'}
                filesArr={newArr} start_date={el.start_date ? dateContract2(el.start_date) : null} end_date={el.end_date ? dateContract2(el.end_date) : null} 
                status={status} dayRemain={dayRemain}
                />
                :
                <div></div>}
        </>
    )
};

export default Сontract;