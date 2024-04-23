import s from './EditPattern.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconClose } from '../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../image/icon/iconSuccess.svg';
import { ReactComponent as IconChewron } from '../../image/icon/iconChewron.svg';
import { ReactComponent as IconDone } from '../../image/icon/iconDone.svg';
import { useDispatch } from 'react-redux';
//API 
import { editPattern } from '../../Api/Api';
//slice 
import { setUpdatePayers } from '../../store/reducer/update/slice';

const units = ['кг', 'г', 'л', 'мл', 'шт', 'уп']

const EditPattern = ({ setModal, el }) => {
    const [anim, setAnim] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState(el.name);
    const [unit, setUnit] = useState(el.unit);
    const [type, setType] = useState(el.type);
    const [maxPrice, setMaxPrice] = useState(el.max_price);
    const [outgo, setOutgo] = useState(el.rate);
    const [disabledButton, setDisabledButton] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [list, setList] = useState(false);
    const [list2, setList2] = useState(false);
    const modalRef = useRef();
    const listRef = useRef();
    const listRef2 = useRef();
    const dispatch = useDispatch();
    console.log(el)
    useEffect(() => {
        if (type == 'услуга') {
            setUnit('услуга');
        } else {
            setUnit(el.unit);
        }
    }, [type])

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
        if (name == '' || maxPrice == '' || outgo == '' || unit == '') {
            setDisabledButton(true);
        } else {
            setDisabledButton(false)
        }
    }, [name, maxPrice, outgo, unit])

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

        if (listRef2.current && !listRef2.current.contains(e.target) && list2) {
            setList2(false);
            return
        }

        if (listRef.current && !listRef.current.contains(e.target) && list) {
            setList(false);
            return
        }


    }

    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleUnit = (e) => {
        const value = e.currentTarget.textContent;
        setUnit(value);
    }

    const handleType = (e) => {
        const value = e.currentTarget.textContent;
        setType(value);
    }

    const handlePrice = (e) => {
        const value = e.target.value;
        setMaxPrice(value);
    }

    const handleOutgo = (e) => {
        const value = e.target.value;
        setOutgo(value);
    }

    const handleConfirm = () => {
        if (disabled) {
            setDisabled(false);
            return
        }

        if(!disabled) {
            editPattern(name, unit, type, maxPrice, outgo, el.active, el.id)
            .then(res => {
                dispatch(setUpdatePayers());
                setSuccess(true);
                setDisabled(true)
            })
            .catch(err => console.log(err));
            return
        } 
    }

    const handleOpenList = () => {
        list ? setList(false) : setList(true);
    }

    const handleOpenList2 = () => {
        list2 ? setList2(false) : setList2(true);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, [list, list2]);

    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>

            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>
                        Шаблон
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>


                <div className={s.block}>
                    <p className={s.sub}>Наименование позиции</p>
                    <div className={`${s.input} ${s.input_dis}`}>
                        <input onChange={handleName} value={name || ''} placeholder='Укажите позицию'></input>
                    </div>
                </div>

                <div className={s.container}>
                    <div className={s.block}>
                        <p className={s.sub}>Единица измерения</p>
                        <div ref={listRef} onClick={handleOpenList} className={`${s.input} ${s.input_list} ${list && s.input_list_open} ${s.input_dis}`}>
                            <input onChange={handleName} value={unit || ''} placeholder='Не указано'></input>
                            <IconChewron />
                            <ul className={`${s.list} ${list && s.list_open}`}>
                                {units.map((el, i) => {
                                    return <li onClick={handleUnit} key={i + 1}>{el}</li>
                                })}
                            </ul>
                        </div>

                    </div>

                    <div className={s.block}>
                        <p className={s.sub}>Вид</p>
                        <div ref={listRef2} onClick={handleOpenList2} className={`${s.input} ${s.input_list} ${list2 && s.input_list_open} ${s.input_dis}`}>
                            <input onChange={handleName} value={type || ''} placeholder='Не указано'></input>
                            <IconChewron />
                        </div>

                        <ul className={`${s.list} ${s.list_2} ${list2 && s.list_open}`}>
                            <li onClick={handleType}>товар</li>
                            <li onClick={handleType}>услуга</li>
                        </ul>
                    </div>
                </div>

                <div className={s.container}>
                    <div className={s.block}>
                        <p className={s.sub}>Максимальная цена</p>
                        <div className={`${s.input} ${disabled && s.input_dis}`}>
                            <input type='number' onChange={handlePrice} value={maxPrice || ''} placeholder='Не указано'></input>
                        </div>
                    </div>

                    <div className={s.block}>
                        <p className={s.sub}>Расход в месяц</p>
                        <div className={`${s.input} ${disabled && s.input_dis}`}>
                            <input type='number' onChange={handleOutgo} value={outgo || ''} placeholder='Не указано'></input>
                        </div>
                    </div>
                </div>
                <button onClick={handleConfirm} disabled={disabledButton} className={`${s.button} ${disabled && !success && s.button_2} ${disabled && success && s.button_3}`}>
                    {disabled && success ? 'Изменения сохранены' : disabled && !success ? 'Редактировать' : 'Сохранить'}
                    {disabled && success && <IconDone />}
                </button>
            </div>
        </div>
    )
};

export default EditPattern;