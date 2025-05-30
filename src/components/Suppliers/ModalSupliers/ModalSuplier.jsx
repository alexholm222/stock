import s from './ModalSuplier.module.scss';
import { ReactComponent as IconClose } from '../../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../../image/icon/iconSuccess.svg';
import { ReactComponent as IconCheck } from '../../../image/icon/iconCheck.svg';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
//Api
import { addVendor } from '../../../Api/Api';
import { daData } from '../../../Api/ApiDaData';
//slice
import { setUpdateSuppliers } from '../../../store/reducer/update/slice';

const ModalSuplier = ({ role, setModal }) => {
    const [anim, setAnim] = useState(false);
    const [success, setSuccess] = useState(false);
    const [check, setCheck] = useState(false)
    const [name, setName] = useState('');
    const [inn, setInn] = useState('');
    const [kpp, setKpp] = useState('');
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);
    const [promptList, setPromptList] = useState([]);
    const [prompOpen, setPrompOpen] = useState(false);
    const [prompType, setPrompType] = useState('');
    const modalRef = useRef();
    const promptRef = useRef();
    const inputRef = useRef();
    const inputRefFocus = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef(); 
    const dispatch = useDispatch();

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
    }, [])

    useEffect(() => {
        if (check) {
            setInn('');
            setKpp('');
            return
        }
    }, [check]);

    useEffect(() => {
        inputRefFocus.current && inputRefFocus.current.focus();
    }, [inputRefFocus]);

    const handleCloseModal = () => {
        setAnim(false);
        setSuccess(false);
        setTimeout(() => {
            setModal(0);
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
            && inputRef3.current && !inputRef3.current.contains(e.target)
            && prompOpen) {
            setPrompOpen(false);
            return
        }
    }


    const handleConfirm = () => {
        setLoad(true)
        addVendor(name, inn, kpp)
            .then(res => {
                dispatch(setUpdateSuppliers());
                setSuccess(true);
                setLoad(false)
            })
            .catch(err => setErr(true))
    }

    const handleDaData = (value) => {
        daData(value)
            .then(res => {
                setPromptList(res.data.suggestions);
            })
            .catch(err => console.log(err))
    }

    const handleName = (e) => {
        const value = e.target.value;
        setPrompType('');
        setErr(false);
        setName(value);
        value.length > 0 && setPrompOpen(true);
        handleDaData(value);
    }

    const handleInn = (e) => {
        setErr(false);
        setPrompType('inn');
        const value = e.target.value;
        value.length <= 12 && setInn(value);
        value.length > 0 && setPrompOpen(true);
        (value.length == 10 || value.length == 12) && handleDaData(value);

    }

    const handleKpp = (e) => {
        setErr(false);
        setPrompType('inn');
        const value = e.target.value;
        value.length > 0 && setPrompOpen(true);
        value.length <= 9 && setKpp(value);
      /*   handleDaData(value); */
    }

    const handleFocusName = () => {
        setPrompType('');
        name.length > 0 && setPrompOpen(true);
    }

    const handleFocusInn = () => {
        setPrompType('inn');
        inn.length > 0 && setPrompOpen(true);
    }

    const handleCheck = () => {
        check ? setCheck(false) : setCheck(true)
    }

    const handleSelectCompany = (e) => {
        const target = e.currentTarget;
        setPrompOpen(false);
        setName(target.querySelector('.company__name').textContent);
        !check && setInn(target.querySelector('.company__inn').textContent);
        !check && setKpp(target.querySelector('.company__kpp').textContent);
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
                        Новый поставщик
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>
                <p className={s.sub}>Поставщик</p>
                <div ref={inputRef} className={s.input}>
                    <input ref={inputRefFocus} onFocus={handleFocusName} onChange={handleName} value={name || ''} type='text' className={s.input}></input>
                </div>
                {role == 'administrator' && <div className={`${s.check}`}>
                    <div onClick={handleCheck} className={`${s.checkbox} ${check && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Поставщик без ИНН</p>
                </div>
                }
                <div className={s.container}>
                    <div className={s.block}>
                        <p className={s.sub}>
                            ИНН
                        </p>

                        <input ref={inputRef2} onFocus={handleFocusInn} disabled={check ? true : false} onChange={handleInn} value={inn || ''} type='number' className={s.input}></input>

                    </div>
                    <div className={s.block}>
                        <p className={s.sub}>
                            КПП
                        </p>

                        <input ref={inputRef3} onFocus={handleFocusInn} disabled={check ? true : false} onChange={handleKpp} value={kpp || ''} type='number' className={s.input}></input>

                    </div>

                    <ul ref={promptRef} className={`${s.prompt} ${prompType == 'inn' && s.prompt_2} ${role !== 'administrator' && s.prompt_inn} ${prompOpen && s.prompt_open}`}>
                        {promptList?.map((el) => {
                            return <li id={`${el.data.inn}${el.data.kpp}`} key={el.data.inn + el.data.kpp} onClick={handleSelectCompany}>
                                <p className='company__name'>{el.value}</p>
                                <div><span>ИНН: <span className='company__inn'>{el.data.inn}</span></span> <span>КПП: <span className='company__kpp'>{el.data.kpp}</span></span></div>
                            </li>
                        })}
                    </ul>
                </div>

                <button disabled={name == '' || (!check && inn.length < 10) || (!check && kpp.length < 9) || load ? true : false} onClick={handleConfirm} className={s.button}>Подтвердить</button>
                <span className={s.text_err}>{err ? 'Произошла ошибка при добавлении поставщика' : ''}</span>
            </div>

            <div className={`${s.success} ${success && s.success_anim}`}>
                <div className={s.close}><IconClose /></div>
                <IconSuccess />
                <h2 className={`${s.title} ${s.title_success}`}>
                    Поставщик добавлен
                </h2>
                <p className={s.text}>{name} добавлен в список поставщиков</p>

            </div>
        </div>
    )
};

export default ModalSuplier;