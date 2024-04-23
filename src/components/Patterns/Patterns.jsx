import s from './Patterns.module.scss';
//components
import Item from './Item/Item';
import PatternSceleton from './PatternSceleton/PatternSceleton';
import { useState, useEffect } from 'react';

const Patterns = ({ patterns, load, setModal, setEl, setModalDelete, setElDelete }) => {
    const [height, setHeight] = useState(720)

    useEffect(() => {
        const height = patterns.length * 62;
        if (!load) {
            setTimeout(() => {
                setHeight(height)
            }, 100)
        } else {
            setHeight(720);
        }

    }, [load, patterns]);
    return (
        <div className={s.patterns}>
            <div className={s.header}>
                <div className={s.check}></div>
                <div className={s.name}>Наименование</div>
                <div className={s.units}>Ед.изменения</div>
                <div className={s.price}>Макс. цена</div>
                <div className={s.outgo}>Расход в мес (шт)</div>
                <div className={s.status}>Статус</div>
            </div>
            {!load && <div style={{height: `${height}px`}} className={s.container}>
                {patterns.map((el) => {
                    return <Item key={el.id} el={el} setModal={setModal} setEl={setEl} setModalDelete={setModalDelete} setElDelete={setElDelete}/>
                })}
            </div>
            }

            {load && <div className={s.container}>
                {[...Array(12)].map((el) => {
                    return <PatternSceleton />
                })}
            </div>
            }
        </div>
    )
};

export default Patterns;