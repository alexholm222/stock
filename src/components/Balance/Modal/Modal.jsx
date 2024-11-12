import s from './Modal.module.scss';
import { ReactComponent as IconClose } from '../../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../../image/icon/iconSuccess.svg';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUpdateBalance } from '../../../store/reducer/update/slice';
import LoaderButton from '../../LoaderButton/LoaderButton';
//API
import { sendWithdrawal, sendOutcoming } from '../../../Api/Api';

const Modal = ({ type, setIdModal, el, outcoming }) => {
    const [anim, setAnim] = useState(false);
    const [comment, setComment] = useState('');
    const [num, setNum] = useState('');
    const [err, setErr] = useState(false);
    const [errSend, setErrSend] = useState('');
    const [success, setSuccess] = useState(false);
    const [load, setLoad] = useState(false);
    const modalRef = useRef();
    const inputRef = useRef();
    const textAreaRef = useRef();
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
        inputRef.current && inputRef.current.focus();
    }, [inputRef])

    const handleCloseModal = () => {
        setAnim(false);
        setSuccess(false);
        setTimeout(() => {
            setIdModal(0);
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
        if (type == 1) {
            sendWithdrawal(el.stock_id, num)
                .then(res => {
                    setSuccess(true);
                    dispatch(setUpdateBalance());
                })
                .catch(err => {
                    const data = err.response?.data;
                    console.log(data)
                    setLoad(false)
                        if (data.sum_quantity_withdrawal) {
                            setErrSend(`Изъять можно ${data.all_quantity - data.sum_quantity_withdrawal} ${el.unit}, запрошенно к списанию ${data.sum_quantity_withdrawal} ${el.unit}`);
                        } else {
                            setErrSend('При изъятии произошла ошибка, попробуй еще раз');
                        } 
                })
        }

        if (type == 2) {
            sendOutcoming(el.stock_id, num, comment)
                .then(res => {
                    const id = res.data.new_stock_stat.stock_id;
                    const statStockId = outcoming.find(el => el.stock_id == id);
                    console.log(statStockId)
                    console.log(res);
                    setSuccess(true);
                    dispatch(setUpdateBalance());
                })
                .catch(err => {
                    const data = err.response?.data;
                    console.log(data)
                    setLoad(false)
                    if (data.sum_quantity_withdrawal) {
                        setErrSend(`Уже запрошенно к списанию ${data.sum_quantity_withdrawal} ${el.unit}, еще можно списать ${data.all_quantity - data.sum_quantity_withdrawal} ${el.unit}`);
                    } else {
                        setErrSend('При изъятии произошла ошибка, попробуй еще раз');
                    }
                })
        }
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
                        {type == 1 && 'Изъятие товара'}
                        {type == 2 && 'Запрос списания'}
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>
                <p className={s.sub}>Название товара</p>
                <div className={s.input_dis}>{el.name}</div>
                <div className={s.container}>
                    <div className={s.block}>
                        <p className={s.sub}>Остаток на складе</p>
                        <div className={s.input_dis}><p>{el.quantity}</p><p>{el.unit}</p></div>
                    </div>

                    <div className={s.block}>
                        <p className={s.sub}>
                            {type == 1 && 'Изъять'}
                            {type == 2 && 'К списанию'}
                        </p>
                        <div className={`${s.input} ${err && s.input_err}`}>
                            <input ref={inputRef}  type='number' onChange={handleChangeNum} value={num || ''} className={s.input}></input>
                            <p>{el.unit}</p>
                        </div>
                    </div>
                </div>
                {type == 2 && <div className={s.comment}>
                    <p className={s.sub}>Основание</p>
                    <textarea ref={textAreaRef} onChange={handleComment} placeholder='Написать основание'></textarea>
                </div>}
                {type == 1 && <button disabled={err || num == '' || load ? true : false} onClick={handleConfirm} className={s.button}>Подтвердить
                    
                </button>}
                {type == 2 && <button disabled={err || num == '' || load ? true : false} onClick={handleConfirm} className={s.button}>Списать
                    
                </button>}
                <span className={s.text_err}>{errSend}</span>
            </div>

            <div className={`${s.success} ${success && s.success_anim}`}>
                <div className={s.close}><IconClose /></div>
                <IconSuccess />
                <h2 className={`${s.title} ${s.title_success}`}>
                    {type == 1 && 'Расход записан'}
                    {type == 2 && 'Запрос отправлен'}
                </h2>
                <p className={s.text}>{el.name} - {num}{el.unit}</p>

            </div>
        </div>
    )
};

export default Modal;