import s from './AddDefault.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconClose } from '../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../image/icon/iconSuccess.svg';
import { ReactComponent as IconCheck } from '../../image/icon/iconCheck.svg';
import { useDispatch } from 'react-redux';
//API 
import { payerDefault, сategoryDefault } from '../../Api/Api';
//slice 
import { setUpdatePayers } from '../../store/reducer/update/slice';

const AddDefault = ({ setModal, el, type }) => {
    const [anim, setAnim] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [check, setCheck] = useState(el.by_default);
    const modalRef = useRef();
    const dispatch = useDispatch();

    //анимация при открытии страницы
    useEffect(() => {
        setAnim(true)
    }, []);

    //Фиксация окна при открытии модалки
    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, []);

    useEffect(() => {
        if (name.length > 0) {
            setDisabled(false);
            return
        }
    }, [name])

    const handleCloseModal = () => {
        setAnim(false);
        setSuccess(false);
        setTimeout(() => {
            setModal(false);
        }, 300)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal();
            return
        }
    }

    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleCheck = () => {
        check ? setCheck(false) : setCheck(true)
    }

    const handleConfirm = () => {

        if (type == 'payer') {
            payerDefault(el.id, true, check)
                .then(res => {
                    console.log(res);
                    setTimeout(() => {
                        dispatch(setUpdatePayers());
                    })
                    setModal(false)
                })
                .catch(err => console.log(err));
            return
        }

        if (type == 'categories') {
            сategoryDefault(el.id, true, check)
                .then(res => {
                    console.log(res);
                    setTimeout(() => {
                        dispatch(setUpdatePayers());
                    })
                    setModal(false)
                })
                .catch(err => console.log(err));
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>

            <div ref={modalRef} className={`${s.modal} ${anim && !success && s.modal_anim}`}>
                <div className={s.header}>
                    <p className={s.text}>{el.name}</p>
                    <IconClose onClick={handleCloseModal} />
                </div>


                <div onClick={handleCheck} className={s.check}>
                    <div className={`${s.checkbox} ${check && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>{type == 'payer' ? 'Плательщик' : 'Категория'} по умолчанию</p>
                </div>
                <button onClick={handleConfirm} className={s.button}>Сохранить</button>
            </div>

        </div>
    )
};

export default AddDefault