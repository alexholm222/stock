import s from './Сontracts.module.scss';
import { useEffect, useState, useRef } from 'react';
import { ReactComponent as IconSort2 } from '../../image/icon/IconSort.svg';
import { useSelector } from 'react-redux';
//selector
import { updateSelector } from '../../store/reducer/update/selector';
//components
import Сontract from './Сontract/Сontract';
import ModalСontracts from './ModalСontracts/ModalСontracts';
import ContractsSceleton from './ContractsSceleton/ContractsSceleton';

const Сontracts = ({ modalType, setModalType, contracts, load, vendors, payers }) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(48);
    const [sort, setSort] = useState('');
    const [sortStatus, setSortStatus] = useState('');
    const [sortStart, setSortSstart] = useState('');
    const [sortEnd, setSortEnd] = useState('');
    const listRef = useRef();
    const updateContracts = useSelector(updateSelector).updateContracts;

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollLoad);
        return () => window.removeEventListener('scroll', scrollLoad)
    }, [])

    const scrollLoad = () => {
        const load = listRef.current.getBoundingClientRect().bottom - window.innerHeight < 1000;
        load && setListLength(prevState => prevState + 48);
    }

    const handleSort = () => {
        setSortStatus('');
        setSortSstart('');
        setSortEnd('');
        if (sort == '') {
            contracts.sort((a, b) => a.vendor.name.localeCompare(b.vendor.name))
            setSort('up');
            return
        }

        if (sort == 'up') {
            contracts.sort((a, b) => b.vendor.name.localeCompare(a.vendor.name))
            setSort('down');
            return
        }

        if (sort == 'down') {

            contracts.sort((a, b) => {
                if (a.id > b.id) {
                    return 1
                }

                if (a.id == b.id) {
                    return 0
                }

                if (a.id < b.id) {
                    return -1
                }
            })
            setSort('');
            return
        }
    }

    const handleSortStatus = () => {
        setSort('');
        setSortSstart('');
        setSortEnd('');
        if (sortStatus == '') {
            contracts.sort((a, b) => {
                const first = (new Date(a.end_date == null || !a.end_date ? '01-01-2070' : a.end_date)).getTime();
                const second = (new Date(b.end_date == null || !b.end_date ? '01-01-2070' : b.end_date)).getTime();
                if (first > second) {
                    return 1;
                }

                if (first < second) {
                    return -1;
                }

                if (first == second) {
                    return 0;
                }
            }
            )
            setSortStatus('up');
            return
        }

        if (sortStatus == 'up') {
            contracts.sort((a, b) => {
                const first = (new Date(a.end_date == null || !a.end_date ? '01-01-2070' : a.end_date)).getTime();
                const second = (new Date(b.end_date == null || !b.end_date ? '01-01-2070' : b.end_date)).getTime();
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
            setSortStatus('down');
            return
        }

        if (sortStatus == 'down') {
            contracts.sort((a, b) => {
                if (a.id > b.id) {
                    return 1
                }

                if (a.id == b.id) {
                    return 0
                }

                if (a.id < b.id) {
                    return -1
                }
            })
            setSortStatus('');
            return
        }
    }


    const handleSortDayStart = () => {
        setSort('');
        setSortStatus('');
        setSortEnd('');
        if (sortStart == '') {
            contracts.sort((a, b) => {
                const first = (new Date(a.start_date)).getTime();
                const second = (new Date(b.start_date)).getTime();
                if (first > second) {
                    return 1;
                }

                if (first < second) {
                    return -1;
                }

                if (first == second) {
                    return 0;
                }
            }
            )
            setSortSstart('up');
            return
        }

        if (sortStart == 'up') {
            contracts.sort((a, b) => {
                const first = Number(new Date(a.start_date));
                const second = Number(new Date(b.start_date));
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
            setSortSstart('down');
            return
        }

        if (sortStart == 'down') {
            contracts.sort((a, b) => {
                if (a.id > b.id) {
                    return 1
                }

                if (a.id == b.id) {
                    return 0
                }

                if (a.id < b.id) {
                    return -1
                }
            })
            setSortSstart('');
            return
        }
    }

    const handleSortDayEnd = () => {
        setSort('');
        setSortStatus('');
        setSortSstart('');
        if (sortEnd == '') {
            contracts.sort((a, b) => {
                const first = (new Date(a.end_date == null || !a.end_date ? '01-01-2070' : a.end_date)).getTime();
                const second = (new Date(b.end_date == null || !b.end_date ? '01-01-2070' : b.end_date)).getTime();
                if (first > second) {
                    return 1;
                }

                if (first < second) {
                    return -1;
                }

                if (first == second) {
                    return 0;
                }
            }
            )
            setSortEnd('up');
            return
        }

        if (sortEnd == 'up') {
            contracts.sort((a, b) => {
                const first = (new Date(a.end_date == null || !a.end_date ? '01-01-2070' : a.end_date)).getTime();
                const second = (new Date(b.end_date == null || !b.end_date ? '01-01-2070' : b.end_date)).getTime();
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
            setSortEnd('down');
            return
        }

        if (sortEnd == 'down') {
            contracts.sort((a, b) => {
                if (a.id > b.id) {
                    return 1
                }

                if (a.id == b.id) {
                    return 0
                }

                if (a.id < b.id) {
                    return -1
                }
            })
            setSortEnd('');
            return
        }
    }

    return (
        <div ref={listRef} className={`${s.contracts} ${anim && s.contracts_anim}`}>
            <div className={s.header}>
                <div onClick={handleSort} className={`${s.supl} ${sort == 'up' && s.up} ${sort == 'down' && s.down}`}>
                    <div onClick={handleSort}>
                        <p>Поставщик</p>
                        <IconSort2 />
                    </div>
                </div>
                <div className={s.field}>
                    <p>Покупатель</p>
                </div>
                <div className={s.field}>
                    <p>№ договора</p>
                </div>
                <div className={`${s.field} ${s.field_2} ${sortStart == 'up' && s.up} ${sortStart == 'down' && s.down}`}>
                    <div onClick={handleSortDayStart}>
                        <p>Дата начала</p>
                        <IconSort2 />
                    </div>

                </div>

                <div className={`${s.field} ${s.field_2} ${sortEnd == 'up' && s.up} ${sortEnd == 'down' && s.down}`}>
                    <div onClick={handleSortDayEnd}>
                        <p>Дата окончания</p>
                        <IconSort2 />
                    </div>
                </div>

                <div className={`${s.status} ${sortStatus == 'up' && s.up} ${sortStatus == 'down' && s.down}`}>
                    <div onClick={handleSortStatus}>
                        <p>Статус</p>
                        <IconSort2 />
                    </div>
                </div>
            </div>
            {!load && <div className={s.container}>
                {[...contracts].reverse().slice(0, listLength).map(el =>
                    <Сontract key={el.id} el={el} vendor={el.vendor} payer={el.payer} payers={payers} vendors={vendors} />
                )}
            </div>
            }

            {load && <div className={s.container}>
                {[...Array(10)].map((el, i) =>
                    <ContractsSceleton key={i} />
                )}
            </div>
            }
            {modalType == 4 && <ModalСontracts setModal={setModalType} payers={payers} vendors={vendors} />}
        </div>
    )
};

export default Сontracts;