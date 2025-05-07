import s from './Outcoming.module.scss';
import { useState, useEffect, useRef } from 'react';
//components
import OutcomingItem from './OutcomingItem/OutcomingItem';
import OutcomingSceleton from './OutcomingSceleton/OutcomingSceleton';

const Outcoming = ({ appRef, isskilla, outcoming, outcomingFirstLoad, load, role}) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(48);
    const listRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    useEffect(() => {
        if(isskilla) {
            window.addEventListener('scroll', scrollLoad);
            return () => window.removeEventListener('scroll', scrollLoad)
        } else {
            appRef.current.addEventListener('scroll', scrollLoad);
            return () => appRef.current.removeEventListener('scroll', scrollLoad)
        }
       
    }, [appRef])

    const scrollLoad = () => {
        const load = isskilla ?  listRef.current.getBoundingClientRect().bottom - window.innerHeight < 1000 : listRef.current.getBoundingClientRect().bottom - appRef.current.getBoundingClientRect().bottom < 1000;
        load && setListLength(prevState => prevState + 24);
    }
    return (

        <div ref={listRef} className={`${s.withdraw} ${anim && s.withdraw_anim}`}>
            <div className={s.header}>
                <div className={s.field}>
                    <p>Дата</p>
                </div>
                <div className={s.pos}>
                    <div>
                        <p>Позиции</p>
                    </div>

                </div>

                <div className={`${s.field}`}>
                    <p>Количество</p>
                </div>
                <div className={`${s.field} ${s.field_2}`}>
                    <p>На сумму</p>
                </div>

                <div className={s.manager}>
                    <p>Запрошено</p>
                </div>

                <div className={s.status}>
                    <p>Статус</p>
                </div>
            </div>
            {!load && <div className={s.container}> 
                {outcomingFirstLoad.length == 0 && <li className={s.empty}><p>Позиций на списание нет</p></li>}
                {outcoming.length == 0 && outcomingFirstLoad.length !== 0 && <li className={s.empty}><p>Ничего не найдено</p></li>}
                {outcoming.slice(0, listLength).map((el, i) =>
                    <OutcomingItem key={el.id} el={el} role={role}/>
                )}
            </div>
            }


            {load && <div className={s.container}>
                {[...Array(25)].map((el, i) =>
                    <OutcomingSceleton key={i} />
                )}
            </div>
            }
            {/* {modalType == 5 && <ModalSuplier setModal={setModalType} />} */}
        </div>

    )
};

export default Outcoming;