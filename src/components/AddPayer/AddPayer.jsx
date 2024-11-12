import s from './AddPayer.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconClose } from '../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../image/icon/iconSuccess.svg';
import { ReactComponent as IconCheck } from '../../image/icon/iconCheck.svg';
import { useDispatch } from 'react-redux';
//API 
import { daData } from '../../Api/ApiDaData';
import { addPayer, addPayerNal } from '../../Api/Api';
//slice 
import { setUpdatePayers } from '../../store/reducer/update/slice';

const AddPayer = ({ setModal }) => {
    const [anim, setAnim] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentType, setPaymentType] = useState('beznal');
    const [name, setName] = useState('');
    const [inn, setInn] = useState('');
    const [nameType, setNameType] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [promptList, setPromptList] = useState([]);
    const [prompOpen, setPrompOpen] = useState(false);
    const [check, setCheck] = useState(false);
    const modalRef = useRef();
    const promptRef = useRef();
    const inputRef = useRef();
    const inputRef2 = useRef();
    const inputRefFocus = useRef();
    const inputRefFocus2 = useRef();
    const dispatch = useDispatch();
    console.log(paymentType)

    //анимация при открытии страницы
    useEffect(() => {
        setAnim(true)
    }, []);

    useEffect(() => {
        paymentType == 'nal' && setPromptList([])
    }, [paymentType])

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
        if (paymentType == 'nal' && nameType !== '') {
            setDisabled(false);
            return
        }

        if (paymentType == 'nal' && nameType == '') {
            setDisabled(true);
            return
        }


        if (paymentType == 'beznal' && name !== '' && inn.length >= 10) {
            setDisabled(false);
            return
        }

        if (paymentType == 'beznal' && (name == '' || inn.length < 10)) {
            setDisabled(true);
            return
        }
    }, [paymentType, nameType, name, inn]);

    useEffect(() => {
        inputRefFocus.current && inputRefFocus.current.focus();
        inputRefFocus2.current && inputRefFocus2.current.focus();
    }, [inputRefFocus, inputRefFocus2, paymentType]);


    //выбор типа плательщика
    const handlePayment = (e) => {
        const id = e.currentTarget.id;
        setPaymentType(id)
    }

    const handleCloseModal = () => {
        setAnim(false);
        setSuccess(false);
        setTimeout(() => {
            setModal(false);
        }, 300)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !prompOpen) {
            handleCloseModal();
            return
        }

        if (promptRef.current && !promptRef.current.contains(e.target)
            && inputRef.current && !inputRef.current.contains(e.target)
            && inputRef2.current && !inputRef2.current.contains(e.target)
            && prompOpen) {
            setPrompOpen(false);
            return
        }
    }

    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
        setPrompOpen(true);
        handleDaData(value);
    }

    const handleInn = (e) => {
        setPrompOpen(true);
        const value = e.target.value;
        value.length <= 12 && setInn(value);
        handleDaData(value);
    }

    const handleNameType = (e) => {
        const value = e.target.value;
        setNameType(value);
    }

    const handleDaData = (value) => {
        daData(value)
            .then(res => {
                setPromptList(res.data.suggestions);
            })
            .catch(err => console.log(err))
    }

    const handleSelectCompany = (e) => {
        const target = e.currentTarget;
        console.log(target)
        setName(target.querySelector('.company__name').textContent);
        setInn(target.querySelector('.company__inn').textContent);
        setPrompOpen(false);
    }

    const handleCheck = () => {
        check ? setCheck(false) : setCheck(true)
    }

    const handleConfirm = () => {
        if (paymentType == 'nal') {
            addPayerNal(nameType, paymentType, check)
                .then(res => {
                    console.log(res);
                    dispatch(setUpdatePayers());
                    setSuccess(true);
                })
                .catch(err => console.log(err));
                return
        }

        if (paymentType == 'beznal') {
            addPayer(name, inn, paymentType, check)
                .then(res => {
                    console.log(res);
                    dispatch(setUpdatePayers());
                    setSuccess(true);
                })
                .catch(err => console.log(err));
                return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, [prompOpen]);

    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>
            <div ref={modalRef} className={`${s.modal} ${anim && !success && s.modal_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>
                        Добавление плательщика
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>

                <div className={s.tabs}>
                    <div onClick={handlePayment} id='beznal' className={`${s.tab} ${paymentType == 'beznal' && s.tab_active}`}>Безналичные</div>
                    <div onClick={handlePayment} id='nal' className={`${s.tab} ${paymentType == 'nal' && s.tab_active}`}>Наличные</div>
                </div>

                {paymentType == 'nal' && <div className={`${s.block}`}>
                    <p className={s.sub}>Название типа оплаты</p>
                    <div className={s.input}>
                        <input ref={inputRefFocus2} onChange={handleNameType} value={nameType || ''} placeholder='Не указано'></input>
                    </div>
                </div>
                }

                {paymentType == 'beznal' && <div className={`${s.block}`}>
                    <p className={s.sub}>ИНН</p>
                    <div ref={inputRef2} className={s.input}>
                        <input type='number' onFocus={() => { setPrompOpen(true) }} onChange={handleInn} value={inn || ''} placeholder='Не указано'></input>
                    </div>
                </div>
                }

                <div className={`${s.block} ${paymentType == 'nal' && s.block_hiden}`}>
                    <p className={s.sub}>Название организации плательщика</p>
                    <div ref={inputRef} className={s.input}>
                        <input ref={inputRefFocus} onFocus={() => { setPrompOpen(true) }} onChange={handleName} value={name || ''} placeholder='Не указано'></input>
                    </div>
                </div>

                <ul ref={promptRef} className={`${s.prompt} ${prompOpen && s.prompt_open}`}>
                    {promptList?.slice(0, 3).map((el) => {
                        return <li key={el.data.inn} onClick={handleSelectCompany}>
                            <p className='company__name'>{el.value}</p>
                            <div><span>ИНН: <span className='company__inn'>{el.data.inn}</span></span> <span>КПП: <span className='company__kpp'>{el.data.kpp}</span></span></div>
                        </li>
                    })}
                </ul>
                <div onClick={handleCheck} className={s.check}>
                    <div className={`${s.checkbox} ${check && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Плательщик по умолчанию</p>
                </div>
                <button onClick={handleConfirm} disabled={disabled} className={s.button}>Добавить</button>
            </div>

            <div className={`${s.success} ${success && s.success_anim}`}>
                <div className={s.close}><IconClose /></div>
                <IconSuccess />
                <h2 className={`${s.title} ${s.title_success}`}>
                    Новый плательщик добавлен
                </h2>
                <p className={s.text}>
                    {paymentType == 'nal' ? nameType : name} внесена в список плательщиков
                </p>

            </div>
        </div>
    )
};

export default AddPayer