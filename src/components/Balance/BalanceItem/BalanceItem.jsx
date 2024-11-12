import { useEffect, useState, useRef } from 'react';
import s from './BalanceItem.module.scss';
import { ReactComponent as IconPencel } from '../../../image/icon/iconPencel.svg';
import { ReactComponent as IconDocument } from '../../../image/icon/iconDocument.svg';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
//components
import Modal from '../Modal/Modal';

const BalanceItem = ({ el, position, percent, outcoming }) => {
    const [idModal, setIdModal] = useState(0);
    const [heightEl, setHeightEl] = useState(64);
    const [mouseEnter, setMouseEnter] = useState(false);
    const templateRef = useRef();
    let timeout = null;

    const handleHover = (e) => {
        timeout = setTimeout(() => {
            setHeightEl(templateRef?.current?.offsetHeight + 46)
        }, 300)
    }

    const handleLeave = () => {
        clearTimeout(timeout)
        setHeightEl(64)
    }

    const handleOpenModal = (e) => {
        const id = e.currentTarget.id;
        setIdModal(id);
    }
    return (
        <>
            <li style={{ height: `${heightEl}px` }} onMouseEnter={handleHover} onMouseLeave={handleLeave} className={`${s.item}`}>
                <div className={`${s.number}`}>
                    {/* <p>{position < 10 ? '00' : position < 100 ? '0' : ''}{position}</p> */}
                    <p>{el.stock_id}</p>
                </div>
                <div className={`${s.name} ${heightEl > 64 && s.name_wrap}`}>
                    <p>{el.name}</p>
                    <div ref={templateRef} className={s.nametemplate}>
                        <p>{el.name}</p>
                    </div>
                </div>

                <div className={`${s.outgo}`}>
                    {el.total_quantity !== 0 && <p>{addSpaceNumber(el.total_quantity)} {el.unit}</p>}
                </div>
                <div className={`${s.total}`}>
                    {el.sum !== 0 && <p>{addSpaceNumber(Math.ceil(el.sum))}</p>}
                </div>

                {el.rate !== 0 && <div className={`${s.position}`}>
                    <div className={s.bars}>
                        {[...Array(3)].map((bar, i) =>
                            <div key={el.name + i} id={i + 1}
                                className={`${s.bar}
                        ${percent <= 1 / 3 && percent > 0 && i == 0 && s.bar_red}
                        ${percent > 1 / 3 && percent <= 2 / 3 && i <= 1 && s.bar_yellow}
                        ${percent > 2 / 3 && i <= 2 && s.bar_green}
                        `}></div>
                        )}
                    </div>

                    <span>{el.quantity} {el.unit}</span>
                </div>
                }

                {el.rate == 0 && <div className={`${s.position}`}>
                    <p>{el.quantity} {el.unit}</p>
                </div>
                }

                <div className={`${s.action}`}>
                    <button onClick={handleOpenModal} id='2' className={s.button_2} disabled={el.quantity == 0 ? true : false}>
                        <IconDocument />
                    </button>
                    <button onClick={handleOpenModal} id='1' className={s.button} disabled={el.quantity == 0 ? true : false}>
                        Изъять
                        <IconPencel />
                    </button>
                </div>

            </li>
            {idModal == 1 && <Modal type={1} setIdModal={setIdModal} el={el} />}
            {idModal == 2 && <Modal type={2} setIdModal={setIdModal} el={el} outcoming={outcoming}/>}
        </>
    )
};

export default BalanceItem;