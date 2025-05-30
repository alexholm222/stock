import s from './Balance.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconSort } from '../../image/icon/IconSort.svg';
import BalanceItem from './BalanceItem/BalanceItem';
import BalanceItemSceleton from './BalanceItemSceleton/BalanceItemSceleton';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import Loader from '../Loader/Loader';

const Balance = ({ appRef, isskilla, stockRemainsFirstLoad, stockRemains, load, sumRemains, outcoming }) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(24);
    const [sort, setSort] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const listRef = useRef();
  
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

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
        if (sortStatus == 'up') {
            stockRemains.sort((a, b) => {
                const first = a.rate == 0 ? -1 : a.quantity / a.rate;
                const second = b.rate == 0 ? -1 : b.quantity / b.rate;

                if(second == -1) {
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

               
            }
            )
            setSortStatus('');
            return
        }

        if (sortStatus == '') {
            stockRemains.sort((a, b) => {
                const first = a.rate == 0 ? 0 : a.quantity / a.rate;
                const second = b.rate == 0 ? 0 : b.quantity / b.rate;
             
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
            setSortStatus('up');
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
                    <p>Всего товара на сумму <sup>{load ? <Loader/> : `${addSpaceNumber(sumRemains)} руб.`}</sup></p>
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
                {stockRemainsFirstLoad.length == 0 && <li className={s.empty}><p>На склад нет позиций (здесь появятся товары после проведения закупки)</p></li>}
                {stockRemains.length == 0 && stockRemainsFirstLoad.length !== 0 && <li className={s.empty}><p>Ничего не найдено</p></li>}
                {stockRemains.slice(0, listLength).map((el, i) =>
                    <BalanceItem key={el.stock_id} el={el} position={i + 1} percent={el.quantity / (el.rate * 3)} outcoming={outcoming}/>
                )}
            </ul>
            }

            { <ul className={`${s.container} ${s.container__loader} ${!load && s.container__loader_hidden}`}>
                {[...Array(24)].map((el, i) =>
                    <BalanceItemSceleton key={i} />
                )}
            </ul>
            }
        </div>
    )
};

export default Balance;