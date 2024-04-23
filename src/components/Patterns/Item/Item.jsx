import s from './Item.module.scss';
import { useState } from 'react';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
import { ReactComponent as IconCheck } from '../../../image/icon/iconCheck.svg';
import { ReactComponent as IconDelete } from '../../../image/icon/iconDelete.svg';
import { patternActivate } from '../../../Api/Api';

const Bage = ({ active, handleDelete }) => {
    return (
        <div className={s.container_bage}>
            <div className={`${s.bage} ${active && s.bage_green}`}>
                <p>{active ? 'Активен' : 'Неактивен'}</p>
            </div>
            <div onClick={handleDelete} className={`${s.delete} ${active && s.delete_hiden}`}><IconDelete /></div>
        </div>
    )
}

const Item = ({ el, setModal, setEl, setModalDelete, setElDelete }) => {
    const [check, setCheck] = useState(el.active);


    const handleCheck = () => {
        if (check) {
            patternActivate(el.id, false)
                .then(res => setCheck(false))
                .catch(err => console.log(err))
            return
        }
        if (!check) {
            patternActivate(el.id, true)
                .then(res => setCheck(true))
                .catch(err => console.log(err))
            return
        }
    }

    const handleOpenEdit = () => {
        setModal(true);
        setEl(el)
    }

    const handleDelete = () => {
        setModalDelete(true);
        setElDelete(el)
    }
    return (
        <div className={s.item}>
            <div className={s.check}>
                <div onClick={handleCheck} className={`${s.checkbox} ${check && s.checkbox_check}`}>
                    <div>
                        <IconCheck />
                    </div>
                </div>
            </div>
            <div onClick={handleOpenEdit} className={s.name}>{el.name}</div>
            <div onClick={handleOpenEdit} className={s.units}>{el.unit}</div>
            <div onClick={handleOpenEdit} className={s.price}>{addSpaceNumber(el.max_price)}</div>
            <div onClick={handleOpenEdit} className={s.outgo}>{el.rate}</div>
            <div className={s.status}>
                <Bage handleDelete={handleDelete} active={check} />
            </div>
        </div>
    )
};

export default Item;

