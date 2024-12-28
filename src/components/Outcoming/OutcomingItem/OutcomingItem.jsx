import s from './OutcomingItem.module.scss'
import { setDate2 } from '../../../utils/dates';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
import Modal from '../Modal/Modal';
import { useState } from 'react';

const Bage = ({ status }) => {
    return <div className={`${s.bage} ${status == 1 && s.bage_green}`}>
        {status == 0 && 'Запрошено'}
        {status == 1 && 'Списано'}
    </div>
}

const OutcomingItem = ({ el }) => {
    const [openModal, setModalOpen] = useState(false);
    const role = document.getElementById('root_stock').getAttribute('role');
    console.log(el)
    const handleOpenModal = () => {
        setModalOpen(true);
    }
    return (
        <div className={s.item}>
            <div className={s.field}>
                <p>{setDate2(el.date).dateText3}</p>
                <span>{el.date.slice(11, 16)}</span>
            </div>
            <div className={s.pos}>
                <p>{el.name}</p>
                <span>{el.comment}</span>
            </div>

            <div className={`${s.field}`}>
                <p>{el.quantity}</p>
            </div>
            <div className={`${s.field} ${s.field_2}`}>
                <p>{addSpaceNumber(Math.ceil(el.sum))}</p>
            </div>

            <div className={s.manager}>
                <p>
                    {el.position == 'administrator' && 'Администратор'}
                    {el.position == 'hr-assist' && 'Офис менеджер'}
                    {el.position == 'leader' && 'Руководитель'}
                </p>
                <span>{el.person_name}</span>
            </div>

            <div className={s.status}>
                <Bage status={el.status} />
                {el.status == 0 && (role =='administrator' || role == 'director') && <p onClick={handleOpenModal} className={s.button}>Списать</p>}
            </div>
            {openModal && <Modal setModalOpen={setModalOpen} el={el} />}
        </div>
    )
};

export default OutcomingItem;