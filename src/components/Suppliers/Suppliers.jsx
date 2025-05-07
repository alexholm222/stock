import s from './Suppliers.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconSort } from '../../image/icon/IconSort.svg';
//components
import Supplier from './Supplier/Supplier';
import ModalSuplier from './ModalSupliers/ModalSuplier';
import SupliersSceleton from './SuppliersSceleton/SupliersSceleton';
import Tooltip from '../Tooltip/Tooltip';


const Suppliers = ({ appRef, isskilla, modalType, setModalType, vendors, vendorsFirstLoad, load, role }) => {
    const [anim, setAnim] = useState(false);
    const [listLength, setListLength] = useState(48);
    const [sort, setSort] = useState('');
    const listRef = useRef();

      useEffect(() => {
          setTimeout(() => {
              setAnim(true)
          })
      }, [])

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
        if (isskilla) {
            window.addEventListener('scroll', scrollLoad);
            return () => window.removeEventListener('scroll', scrollLoad)
        } else {
            appRef.current.addEventListener('scroll', scrollLoad);
            return () => appRef.current.removeEventListener('scroll', scrollLoad)
        }

    }, [appRef])

    const scrollLoad = () => {
        const load = isskilla ? listRef.current.getBoundingClientRect().bottom - window.innerHeight < 1000 : listRef.current.getBoundingClientRect().bottom - appRef.current.getBoundingClientRect().bottom < 1000;
        load && setListLength(prevState => prevState + 24);
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
                {(role == 'administrator' || role == 'director') && <div className={s.field}>
                    <Tooltip text={'Учет по актам подразумевает, что учет в расходах будет записываться по дате подписания акта према-передачи, а не по дате оплаты'}/>
                    <p>{/* Не учитывать в расходах компании */}Учет по актам вместо платежей</p>

                </div>
                }
            </div>
            {!load && <div className={s.container}>
                {vendorsFirstLoad.length == 0 && <li className={s.empty}><p>Список поставщиков пуст</p></li>}
                {vendors.length == 0 && vendorsFirstLoad.length !== 0 && <li className={s.empty}><p>Ничего не найдено</p></li>}
                {vendors.slice(0, listLength).map((el, i) =>
                    <Supplier key={el.id} el={el} role={role} />
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