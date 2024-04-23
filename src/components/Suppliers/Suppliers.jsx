import s from './Suppliers.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconSort } from '../../image/icon/IconSort.svg';
//components
import Supplier from './Supplier/Supplier';
import ModalSuplier from './ModalSupliers/ModalSuplier';
import SupliersSceleton from './SuppliersSceleton/SupliersSceleton';


const Suppliers = ({ modalType, setModalType, vendors, load }) => {
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
                <div className={s.field}>
                    <p>Не учитывать в расходах компании</p>
                </div>
            </div>
            {!load && <div className={s.container}>
                {vendors.slice(0, listLength).map((el, i) =>
                    <Supplier key={el.id} el={el} />
                )}
            </div>
            }


            {load && <div className={s.container}>
                {[...Array(48)].map((el, i) =>
                    <SupliersSceleton key={i} />
                )}
            </div>
            }
            {modalType == 5 && <ModalSuplier setModal={setModalType} />}
        </div>
    )
};

export default Suppliers;