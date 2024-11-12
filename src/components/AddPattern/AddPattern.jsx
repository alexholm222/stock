import s from './AddPattern.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconClose } from '../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../image/icon/iconSuccess.svg';
import { ReactComponent as IconChewron } from '../../image/icon/iconChewron.svg';
import { useDispatch } from 'react-redux';
//API 
import { addPattern } from '../../Api/Api';
//slice 
import { setUpdatePayers } from '../../store/reducer/update/slice';

const units = ['кг', 'г', 'л', 'мл', 'шт', 'уп']

const AddPattern = ({ setModal }) => {
    const [anim, setAnim] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [type, setType] = useState('товар');
    const [maxPrice, setMaxPrice] = useState(0);
    const [outgo, setOutgo] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [list, setList] = useState(false);
    const [list2, setList2] = useState(false);
    const modalRef = useRef();
    const inputRef = useRef();
    const listRef = useRef();
    const listRef2 = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (type == 'услуга') {
            setUnit('услуга');
        } else {
            setUnit('');
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
            setDisabled(true);
        } else {
            setDisabled(false)
        }
    }, [name, maxPrice, outgo, unit]);

    useEffect(() => {
        inputRef && inputRef.current.focus();
    }, [inputRef])

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

    const handleConfirm = (e) => {
        const id = e.currentTarget.id;
        addPattern(name, unit, type, maxPrice, outgo, id == 'save' ? false : true)
            .then(res => {
                dispatch(setUpdatePayers());
                setTimeout(() => {
                    setSuccess(true)
                }, 100)
            })
            .catch(err => console.log(err))
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

            <div ref={modalRef} className={`${s.modal} ${anim && !success && s.modal_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>
                        Шаблон
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>


                <div className={s.block}>
                    <p className={s.sub}>Наименование позиции</p>
                    <div className={s.input}>
                        <input ref={inputRef} onChange={handleName} value={name || ''} placeholder='Укажите позицию'></input>
                    </div>
                </div>

                <div className={s.container}>
                    <div className={s.block}>
                        <p className={s.sub}>Единица измерения</p>
                        <div ref={listRef} onClick={handleOpenList} className={`${s.input} ${s.input_list} ${list && s.input_list_open} ${type == 'услуга' && s.input_dis}`}>
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
                        <div ref={listRef2} onClick={handleOpenList2} className={`${s.input} ${s.input_list} ${list2 && s.input_list_open}`}>
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
                        <div className={s.input}>
                            <input type='number' onChange={handlePrice} value={maxPrice || ''} placeholder='Не указано'></input>
                        </div>
                    </div>

                    <div className={s.block}>
                        <p className={s.sub}>Расход в месяц</p>
                        <div className={s.input}>
                            <input type='number' onChange={handleOutgo} value={outgo || ''} placeholder='Не указано'></input>
                        </div>
                    </div>
                </div>
                <div className={s.buttons}>
                    <button id='save' onClick={handleConfirm} disabled={disabled} className={`${s.button} ${s.button_2}`}>Сохранить</button>
                    <button id='publish' onClick={handleConfirm} disabled={disabled} className={s.button}>Опубликовать шаблон</button>
                </div>

            </div>

            <div className={`${s.success} ${success && s.success_anim}`}>
                <div className={s.close}><IconClose /></div>
                <IconSuccess />
                <h2 className={`${s.title} ${s.title_success}`}>
                    Шаблон добавлен
                </h2>
                <p className={s.text}>
                    {name}
                </p>

            </div>
        </div>
    )
};

export default AddPattern;