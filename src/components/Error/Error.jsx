import s from './Error.module.scss';
import { ReactComponent as IconClose } from '../../image/icon/iconClose.svg';
import { ReactComponent as IconError } from '../../image/icon/iconError.svg';
import { useState, useEffect, useRef } from 'react';

const Error = ({ setErrorLoad, text }) => {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, [])
    //анимация при открытии страницы
    useEffect(() => {
        setAnim(true)
    }, []);


    const handleCloseModal = () => {
        setAnim(false);

        setTimeout(() => {
            setErrorLoad(false);
        }, 300)
    }

    const closeModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal();
            return
        }
    }



    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);


    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>

            <div ref={modalRef}  className={`${s.success} ${anim && s.success_anim}`}>
                <div onClick={handleCloseModal} className={s.close}><IconClose /></div>
                <div className={s.error}>
                    <IconError />
                </div>

                <h2 className={`${s.title} ${s.title_success}`}>
                    Ошибка 
                </h2>
                <p className={s.text}>{text}</p>

            </div>
        </div>
    )
};

export default Error;