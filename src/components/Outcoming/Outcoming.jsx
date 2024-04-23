import s from './Outcoming.module.scss';
import { useState, useEffect, useRef } from 'react';
//components
import OutcomingItem from './OutcomingItem/OutcomingItem';
import OutcomingSceleton from './OutcomingSceleton/OutcomingSceleton';

const Outcoming = ({outcoming, load}) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(48);
    const listRef = useRef();
   
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    })

    useEffect(() => {
        window.addEventListener('scroll', scrollLoad);
        return () => window.removeEventListener('scroll', scrollLoad)
    }, [])

    const scrollLoad = () => {
        const load = listRef.current.getBoundingClientRect().bottom - window.innerHeight < 1000;
        load && setListLength(prevState => prevState + 48);
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
                    {outcoming.slice(0, listLength).map((el, i) =>
                        <OutcomingItem key={el.id} el={el} />
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