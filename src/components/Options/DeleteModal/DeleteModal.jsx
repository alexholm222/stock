import { useEffect, useState, useRef } from 'react';
import s from './DeleteModal.module.scss';
import { ReactComponent as IconClose } from '../../../image/icon/iconClose.svg';
import { payerDelete, сategoryDelete, patternDelete } from '../../../Api/Api';
import { useDispatch } from 'react-redux';
//slice 
import { setUpdatePayers } from '../../../store/reducer/update/slice';

const DeleteModal = ({ setModal, elDelete, type, setError, setErrorText }) => {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();
    const dispatch = useDispatch();
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
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    const handleCloseModal = () => {
        setAnim(false);
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

    const handleConfirmDelete = () => {
        if (type == 'payer') {
            payerDelete(elDelete.id)
                .then(res => {
                    console.log(res.status);
                    setAnim(false);
                    dispatch(setUpdatePayers());
                    setTimeout(() => {
                        setModal(false);
                    }, 300)
                })
                .catch(err => {
                    setAnim(false);
                    setError(true);
                    if (err.response?.status == 403) {
                        setErrorText('Данный плательщик используется в закупках, удалить нельзя!')
                    } else {
                        setErrorText('При удалении возникла ошибка, попробуй еще раз')
                    }
                })
            return
        }

        if (type == 'category') {
            сategoryDelete(elDelete.id)
                .then(res => {
                    console.log(res);
                    setAnim(false);
                    dispatch(setUpdatePayers());
                    setTimeout(() => {
                        setModal(false);
                    }, 300)
                })
                .catch(err => {
                    setAnim(false);
                    setError(true);
                    if (err.response?.status == 403) {
                        setErrorText('Данная категория используется в закупках, удалить нельзя!')
                    } else {
                        setErrorText('При удалении возникла ошибка, попробуй еще раз')
                    }
                })
            return
        }

        if (type == 'pattern') {
            patternDelete(elDelete.id)
                .then(res => {
                    console.log(res);
                    setAnim(false);
                    dispatch(setUpdatePayers());
                    setTimeout(() => {
                        setModal(false);
                    }, 300)
                })
                .catch(err => {
                    setAnim(false);
                    setError(true);
                    if (err.response?.status == 403) {
                        setErrorText('Данный шаблон используется в закупках, удалить нельзя!')
                    } else {
                        setErrorText('При удалении возникла ошибка, попробуй еще раз')
                    }
                })
            return
        }

    }


    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>
            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>
                        {type == 'payer' && 'Удаление плательщика'}
                        {type == 'category' && 'Удаление категории'}
                        {type == 'pattern' && 'Удаление шаблона'}
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>
                <p className={s.text}>
                    {type == 'payer' && `Плательщик ${elDelete.name} будет удален навсегда`}
                    {type == 'category' && `Категория ${elDelete.name} будет удалена навсегда`}
                    {type == 'pattern' && `Шаблон ${elDelete.name} будет удалена навсегда`}
                </p>
                <button onClick={handleConfirmDelete} className={s.button}>Удалить</button>
            </div>
        </div>
    )
};

export default DeleteModal;