import s from './Balance.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconSort } from '../../image/icon/IconSort.svg';
import BalanceItem from './BalanceItem/BalanceItem';
import BalanceItemSceleton from './BalanceItemSceleton/BalanceItemSceleton';

const Balance = ({ stockRemains, load }) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(24);
    const [sort, setSort] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const listRef = useRef();
    
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    });

    useEffect(() => {
        window.addEventListener('scroll', scrollLoad);
        return () => window.removeEventListener('scroll', scrollLoad)
    }, []);


    const scrollLoad = () => {
        const load = listRef.current.getBoundingClientRect().bottom - window.innerHeight < 1000;
        console.log(load)
        load && setListLength(prevState => prevState + 24);
    }

    const handleSort = () => {
        setSortStatus('');
        if (sort == '') {
            stockRemains.sort((a, b) => a.name.localeCompare(b.name))
            setSort('up');
            return
        }

        if (sort == 'up') {
            stockRemains.sort((a, b) => b.name.localeCompare(a.name))
            setSort('down');
            return
        }

        if (sort == 'down') {

            stockRemains.sort((a, b) => {
                if (a.stock_id > b.stock_id) {
                    return 1
                }

                if (a.stock_id == b.stock_id) {
                    return 0
                }

                if (a.stock_id < b.stock_id) {
                    return -1
                }
            })
            setSort('');
            return
        }
    }

    const handleSortStatus = () => {
        setSort('');
        if (sortStatus == '') {
            stockRemains.sort((a, b) => {
                const first = a.rate == 0 ? -1 : a.quantity / a.rate;
                const second = b.rate == 0 ? -1 : b.quantity / b.rate;

                if (second == -1) {
                    return -1;
                }

                if (first > second && (first !== -1 && second !== -1)) {
                    return 1;
                }

                if (first < second && (first !== -1 && second !== -1)) {
                    return -1;
                }

                if (first == second && (first !== -1 && second !== -1)) {
                    return 0;
                }
            })
            setSortStatus('up');
            return
        }

        if (sortStatus == 'up') {
            stockRemains.sort((a, b) => {
                const first = a.rate == 0 ? 0 : a.quantity / a.rate;
                const second = b.rate == 0 ? 0 : b.quantity / b.rate;
                console.log(first)
                if (first > second) {
                    return -1;
                }

                if (first < second) {
                    return 1;
                }

                if (first == second) {
                    return 0;
                }
            }
            )
            setSortStatus('');
            return
        }
    }

    return (
        <div ref={listRef} className={`${s.balance} ${anim && s.balance_anim}`}>
            <div className={s.header}>
                <div className={`${s.number}`}>
                    <p>№</p>
                </div>
                <div className={`${s.name}`}>
                    <div onClick={handleSort} className={`${s.container_sort} ${sort == 'up' && s.up} ${sort == 'down' && s.down}`}>
                        <IconSort />
                        <p>Наименование</p>
                    </div>
                </div>
                <div className={`${s.outgo}`}>
                    <p>Расход за 30 дн</p>
                </div>
                <div className={`${s.total}`}>
                    <p>Всего товара на сумму</p>
                </div>
                <div className={`${s.position}`}>
                    <div onClick={handleSortStatus} className={`${s.container_sort} ${sortStatus == 'up' && s.up} ${sortStatus == 'down' && s.down}`}>
                        <IconSort />
                        <p>Запас товара</p>
                    </div>
                </div>

                <div className={`${s.action}`}>
                    <p>Действия</p>
                </div>
            </div>
            {!load && <ul className={s.container}>
                {stockRemains.slice(0, listLength).map((el, i) =>
                    <BalanceItem key={el.stock_id} el={el} position={i + 1} percent={el.quantity / el.rate} />
                )}
            </ul>
            }

            {load && <ul className={s.container}>
                {[...Array(24)].map((el, i) =>
                    <BalanceItemSceleton key={i} />
                )}
            </ul>
            }
        </div>
    )
};

export default Balance;