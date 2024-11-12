import s from './Modal.module.scss';
import { ReactComponent as IconClose } from '../../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../../image/icon/iconSuccess.svg';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUpdateBalance } from '../../../store/reducer/update/slice';
//API
import { confirmOutcoming } from '../../../Api/Api';

const Modal = ({ setModalOpen, el }) => {
    const [anim, setAnim] = useState(false);
    const [comment, setComment] = useState('');
    const [num, setNum] = useState('');
    const [err, setErr] = useState(false);
    const [errSend, setErrSend] = useState('');
    const [success, setSuccess] = useState(false);
    const [load, setLoad] = useState(false);
    const modalRef = useRef();
    const textAreaRef = useRef();
    const dispatch = useDispatch();
    console.log(el.stock_stats_id)

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


    const handleCloseModal = () => {
        setAnim(false);
        setSuccess(false);
        setTimeout(() => {
            setModalOpen(false)
        }, 300)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal();
        }
    }

    const handleChangeNum = (e) => {
        const value = e.target.value;
        setNum(value);
        el.quantity < value ? setErr(true) : setErr(false);
    }

    const handleComment = (e) => {
        const comment = e.target.value;
        setComment(comment);

    }

    const handleConfirm = () => {
        setErrSend(false)
        setLoad(true)
        confirmOutcoming(el.stock_stats_id)
            .then(res => {
                dispatch(setUpdateBalance());
                setTimeout(() => {
                    setSuccess(true);
                    setLoad(false);
                }, 200)
            })
    }

    const handleKeyEnter = (e) => {
        e.keyCode == 13 && num !== '' && !err && handleConfirm()
    }





    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);


    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>

            <div ref={modalRef} onKeyDown={handleKeyEnter} className={`${s.modal} ${anim && !success && s.modal_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>
                        Списать
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>
                <p className={s.sub}>Название товара</p>
                <div className={s.input_dis}>{el.name}</div>
                <div className={s.container}>
                    <div className={s.block}>
                        <p className={s.sub}>Остаток на складе</p>
                        <div className={s.input_dis}><p>{el.remains}</p><p>{el.unit}</p></div>
                    </div>

                    <div className={s.block}>
                        <p className={s.sub}>К списанию</p>
                        <div className={`${s.input} ${err && s.input_err} ${s.input_dis}`}>
                            <input disabled type='number' onChange={handleChangeNum} value={num || el.quantity} className={`${s.input} ${s.input_dis}`}></input>
                            <p>{el.unit}</p>
                        </div>
                    </div>
                </div>
                <div className={s.comment}>
                    <p className={s.sub}>Основание</p>
                    <textarea className={`${s.input} ${s.input_dis}`} disabled ref={textAreaRef} onChange={handleComment} placeholder='Написать основание'>{el.comment}</textarea>
                </div>

                <button disabled={load} onClick={handleConfirm} className={s.button}>
                    {load ? 'Списываем...' : 'Списать'}
                </button>
                <span className={s.text_err}>{errSend}</span>
            </div>

            <div className={`${s.success} ${success && s.success_anim}`}>
                <div className={s.close}><IconClose /></div>
                <IconSuccess />
                <h2 className={`${s.title} ${s.title_success}`}>
                    Списанно
                </h2>
                <p className={s.text}>{el.name} - {el.quantity}{el.unit}</p>

            </div>
        </div>
    )
};

export default Modal;