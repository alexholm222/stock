import s from './Item.module.scss';
import { ReactComponent as IconCheck } from '../../../image/icon/iconCheck.svg';
import { ReactComponent as IconDelete } from '../../../image/icon/iconDelete.svg';
import { ReactComponent as IconOptions } from '../../../image/icon/iconSetting.svg';
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

const Item = ({ el, i, setModal, setElDelete, type, setModalAddDefault, modalAddDefault, setType }) => {
    const [check, setCheck] = useState(el.active);
    const [position, setPosition] = useState(i * 60 || 0);
    const [optionsView, setOptionsView] = useState(false);

    useEffect(() => {
        const num = i * 60;
        setPosition(num)
    }, [i, el])

    useEffect(() => {
        setCheck(el.active)
    }, [el])

    useEffect(() => {
        !modalAddDefault && setOptionsView(false)
    }, [modalAddDefault])

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

    const handleViewOptions = () => {
        setOptionsView(true)
    }
    const handleHiddenOptions = () => {
        !modalAddDefault && setOptionsView(false)
    }

    return (
        <>
            <div onMouseEnter={handleViewOptions} onMouseLeave={handleHiddenOptions} style={{ top: `${position}px` }} className={`${s.item}`}>
                <div onClick={handleCheck} className={`${s.container} ${el.by_default == 1 && s.container_default}`}>
                    <div className={`${s.checkbox} ${check && s.checkbox_check} ${el.by_default == 1 && s.checkbox_default}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p className={`${s.name}`}>{el.name}</p>
                </div>
                <div className={s.buttons}>
                    <Bage active={check} handleModalDelete={handleModalDelete} />
                    <div onClick={handleModalDefault} className={`${s.options} ${s.options_view} ${modalAddDefault && optionsView && s.options_anim}`}>
                        <IconOptions />
                    </div>

                </div>

            </div>

        </>
    )
};

export default Item;