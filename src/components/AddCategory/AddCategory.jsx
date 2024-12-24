import s from './AddCategory.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconClose } from '../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../image/icon/iconSuccess.svg';
import { ReactComponent as IconCheck } from '../../image/icon/iconCheck.svg';
import { useDispatch } from 'react-redux';
//API 
import { addCategory } from '../../Api/Api';
//slice 
import { setUpdatePayers } from '../../store/reducer/update/slice';

const AddCategory = ({ setModal }) => {
    const [anim, setAnim] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [defaultCheck, setDefaultCheck] = useState(false);
    const [InStockCheck, setInStockCheck] = useState(true);
    const [takeAccountCheck, setTakeAccountCheck] = useState(true);
    const modalRef = useRef();
    const inputRef = useRef();
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
    }, [name]);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, [inputRef]);

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

    console.log(defaultCheck, InStockCheck, takeAccountCheck)

    const handleConfirm = () => {
        addCategory(name, defaultCheck, InStockCheck, takeAccountCheck)
            .then(res => {
                console.log(res);
                dispatch(setUpdatePayers());
                setSuccess(true);
            })
            .catch(err => console.log(err));
        return
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>

            <div ref={modalRef} className={`${s.modal} ${anim && !success && s.modal_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>
                        Добавление категории
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>


                <div className={`${s.block}`}>
                    <p className={s.sub}>Название категории</p>
                    <div className={s.input}>
                        <input ref={inputRef} onChange={handleName} value={name || ''} placeholder='Не указано'></input>
                    </div>
                </div>





                <div onClick={handleDefaultCheck} className={s.check}>
                    <div className={`${s.checkbox} ${defaultCheck && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Категория по умолчанию</p>
                </div>

                <div onClick={handleInStockCheck} className={s.check}>
                    <div className={`${s.checkbox} ${InStockCheck && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Учитывать закупки категории в остатках склада</p>
                </div>

                <div onClick={handleTakeAccountCheck} className={s.check}>
                    <div className={`${s.checkbox} ${takeAccountCheck && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Учитывать закупки категории в финансовых итогах</p>
                </div>
                <button onClick={handleConfirm} disabled={disabled} className={s.button}>Добавить</button>
            </div>

            <div className={`${s.success} ${success && s.success_anim}`}>
                <div className={s.close}><IconClose /></div>
                <IconSuccess />
                <h2 className={`${s.title} ${s.title_success}`}>
                    Новая категория добавлена
                </h2>
                <p className={s.text}>
                    {name} добавлена в общий список и является категорией по умочанию
                </p>

            </div>
        </div>
    )
};

export default AddCategory