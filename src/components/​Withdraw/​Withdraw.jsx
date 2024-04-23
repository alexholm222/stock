import s from './​Withdraw.module.scss';
import { useState, useEffect, useRef } from 'react';
//components
import WithdrawItem from './WithdrawItem/WithdrawItem';
import WithdrawSceleton from './WithdrawSceleton/WithdrawSceleton';

const Withdraw = ({withdraw, load}) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(40);
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
                    <p>Проведено</p>
                </div>
            </div>
             {!load && <div className={s.container}>
                    {withdraw.slice(0, listLength).map((el, i) =>
                        <WithdrawItem key={el.id} el={el} />
                    )}
                </div>
                }


             {load && <div className={s.container}>
                    {[...Array(25)].map((el, i) =>
                        <WithdrawSceleton key={i} />
                    )}
                </div>
                }
            {/* {modalType == 5 && <ModalSuplier setModal={setModalType} />} */}
        </div>

    )
};

export default Withdraw;