import s from './Item.module.scss';
import { ReactComponent as IconCheck } from '../../../image/icon/iconCheck.svg';
import { ReactComponent as IconDelete } from '../../../image/icon/iconDelete.svg';
import { useState, useEffect } from 'react';
//Api
import { payerActivate, сategoryActivate } from '../../../Api/Api';

const Bage = ({ active, handleModalDelete }) => {
    return (
        <div className={s.container_bage}>
            <div className={`${s.bage} ${active && s.bage_green}`}>
                <p>{active ? 'Активен' : 'Неактивен'}</p>
            </div>
            <div onClick={handleModalDelete} className={`${s.delete} ${active && s.delete_hiden}`}><IconDelete /></div>
        </div>
    )
}

const Item = ({ el, i, setModal, setElDelete, type, setModalAddDefault, setType }) => {
    const [check, setCheck] = useState(el.active);
    const [position, setPosition] = useState(i * 60 || 0);

    useEffect(() => {
        const num = i * 60;
        setPosition(num)
    }, [i, el])

    useEffect(() => {
        setCheck(el.active)
    },[el])

    const handleCheck = () => {
        if (check && type == 'payer') {
            payerActivate(el.id, false)
            .then(res => {
                setCheck(false);
            })
            .catch(err => console.log(err))
            return
        }
        if (!check && type == 'payer') {
            payerActivate(el.id, true)
            .then(res => {
                setCheck(true);
            })
            .catch(err => console.log(err))
            return
        }

        if (check && type == 'categories') {
            сategoryActivate(el.id, false)
            .then(res => {
                setCheck(false);
            })
            .catch(err => console.log(err))
            return
        }
        if (!check && type == 'categories') {
            сategoryActivate(el.id, true)
            .then(res => {
                setCheck(true);
            })
            .catch(err => console.log(err))
            return
        }
    }

    const handleModalDelete = () => {
        setModal(true);
        setElDelete(el)
    }

    const handleModalDefault = () => {
        setModalAddDefault(true);
        setType(type);
        setElDelete(el)
    }

    return (
        <>
            <div style={{top: `${position}px`}} className={`${s.item}`}>
                <div className={s.container}>
                    <div onClick={handleCheck} className={`${s.checkbox} ${check && s.checkbox_check} ${el.by_default == 1 && s.checkbox_default}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p onClick={handleModalDefault} className={`${s.name} ${el.by_default == 1 && s.name_dis}`}>{el.name}</p>
                </div>
                <Bage active={check} handleModalDelete={handleModalDelete}/>
            </div>

        </>
    )
};

export default Item;