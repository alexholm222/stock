import { useEffect, useState } from 'react';
import s from './Tabs.module.scss';
import { Link, useLocation } from 'react-router-dom';


const tabs = [
    { id: 1, name: 'Текущие остатки', link: '/new/purchases/stock/' },
    { id: 2, name: 'Списание', link: '/new/purchases/stock/withdraw' },
    { id: 3, name: 'Журнал изьятий', link: '/new/purchases/stock/outcoming' },
  /*   { id: 4, name: 'Договоры с поставщиками', link: '/stock/contracts' }, */
    { id: 5, name: 'Поставщики', link: '/new/purchases/stock/vendors' },
    { id: 6, name: 'Настройки', link: '/new/purchases/stock/options' }
];

const Tab = ({ tab, link, id, active }) => {
    return (
        <Link to={link}>
            <div id={id} className={`${s.tab} ${active && s.tab_active}`}>
                <p>{tab}</p>
            </div>
        </Link>
    )
}

const Tabs = ({ activeTab, setActiveTab, role }) => {
    const location = useLocation();
    const path = location.pathname + location.search;

    useEffect(() => {
        tabs.forEach((el) => {
            if (path.includes(el.link)) {
                setActiveTab(el.id)
                return
            }
        })
    }, [path])

    return (
        <div className={s.tabs}>
            {(role == 'administrator' || role == 'director') && tabs.map((el) =>
                <Tab key={el.id} tab={el.name} link={el.link} id={el.id} active={activeTab == el.id} />
            )}

            {role !== 'administrator' && role !== 'director' && tabs.slice(0, -1).map((el) =>
                <Tab key={el.id} tab={el.name} link={el.link} id={el.id} active={activeTab == el.id} />
            )}
        </div>
    )
};

export default Tabs;