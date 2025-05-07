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
    const [check, setCheck] = useState();
    const [defaultCheck, setDefaultCheck] = useState(el.by_default);
    const [InStockCheck, setInStockCheck] = useState(el.in_stock);
    const [takeAccountCheck, setTakeAccountCheck] = useState(el.take_account_cat);
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

    const handleDefaultCheck = () => {
        defaultCheck ? setDefaultCheck(false) : setDefaultCheck(true)
    }


    const handleInStockCheck = () => {
        InStockCheck ? setInStockCheck(false) : setInStockCheck(true)
    }


    const handleTakeAccountCheck = () => {
        takeAccountCheck ? setTakeAccountCheck(false) : setTakeAccountCheck(true)
    }

    const handleConfirm = () => {

        if (type == 'payer') {
            payerDefault(el.id, true, defaultCheck)
                .then(res => {
                 
                    setTimeout(() => {
                        dispatch(setUpdatePayers());
                    })
                    setModal(false)
                })
                .catch(err => console.log(err));
            return
        }

        if (type == 'categories') {
            сategoryDefault(el.id, true, defaultCheck, InStockCheck, takeAccountCheck)
                .then(res => {
                  
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
                    {type == 'categories' && <h2 className={s.title}>Настройки категории</h2>}
                    {type == 'payer' && <h2 className={s.title}>Настройки плательщика</h2>}
                    <IconClose onClick={handleCloseModal} />
                </div>

                <p className={s.text}>{el.name}</p>
                <div onClick={handleDefaultCheck} className={`${s.check} ${el.by_default == 1 && s.check_default}`}>
                    <div className={`${s.checkbox} ${defaultCheck && s.checkbox_check} ${el.by_default == 1 && s.checkbox_default}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>{type == 'payer' ? 'Плательщик' : 'Категория'} по умолчанию</p>
                </div>

                {type == 'categories' && <div onClick={handleInStockCheck} className={s.check}>
                    <div className={`${s.checkbox} ${InStockCheck && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Учитывать закупки категории в остатках склада</p>
                </div>
                }

                {type == 'categories' && <div onClick={handleTakeAccountCheck} className={s.check}>
                    <div className={`${s.checkbox} ${takeAccountCheck && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Учитывать закупки категории в финансовых итогах</p>
                </div>
                }


                <button onClick={handleConfirm} className={s.button}>Сохранить</button>
            </div>

        </div>
    )
};

export default AddDefault