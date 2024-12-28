import s from './Suppliers.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconSort } from '../../image/icon/IconSort.svg';
//components
import Supplier from './Supplier/Supplier';
import ModalSuplier from './ModalSupliers/ModalSuplier';
import SupliersSceleton from './SuppliersSceleton/SupliersSceleton';


const Suppliers = ({ modalType, setModalType, vendors, load, role }) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(48);
    const [sort, setSort] = useState('');
    const listRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    })

    const handleSort = () => {
        if (sort == '') {
            vendors.sort((a, b) => a.name.localeCompare(b.name))
            setSort('up');
            return
        }

        if (sort == 'up') {
            vendors.sort((a, b) => b.name.localeCompare(a.name))
            setSort('down');
            return
        }

        if (sort == 'down') {
            vendors.sort((a, b) => {
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

    useEffect(() => {
        window.addEventListener('scroll', scrollLoad);
        return () => window.removeEventListener('scroll', scrollLoad)
    }, [])

    const scrollLoad = () => {
        const load = listRef.current.getBoundingClientRect().bottom - window.innerHeight < 1000;
        console.log(load)
        load && setListLength(prevState => prevState + 48);
    }

    return (
        <div ref={listRef} className={`${s.supliers} ${anim && s.supliers_anim}`}>
            <div className={s.header}>
                <div className={`${s.supl} ${sort == 'up' && s.up} ${sort == 'down' && s.down}`}>
                    <div>
                        <p onClick={handleSort}>Поставщик</p>
                        <IconSort onClick={handleSort} />
                    </div>

                </div>
                <div className={s.field}>
                    <p>ИНН</p>
                </div>
                <div className={s.field}>
                    <p>КПП</p>
                </div>
                {role == 'administrator' && <div className={s.field}>
                    <p>{/* Не учитывать в расходах компании */}Учет по актам вместо платежей</p>
                </div>
                }
            </div>
            {!load && <div className={s.container}>
                 {vendors.length == 0 && <li className={s.empty}><p>Список поставщиков пуст</p></li>}
                {vendors.slice(0, listLength).map((el, i) =>
                    <Supplier key={el.id} el={el} role={role}/>
                )}
            </div>
            }


            {load && <div className={s.container}>
                {[...Array(48)].map((el, i) =>
                    <SupliersSceleton key={i} />
                )}
            </div>
            }
            {modalType == 5 && <ModalSuplier role={role} setModal={setModalType} />}
        </div>
    )
};

export default Suppliers;