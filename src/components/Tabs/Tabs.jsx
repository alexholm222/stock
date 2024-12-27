import { useEffect, useState } from 'react';
import s from './Tabs.module.scss';
import { Link, useLocation } from 'react-router-dom';


const tabs = [
    { id: 1, name: 'Текущие остатки', link: '/remains' },
    { id: 2, name: 'Списание', link: '/withdraw' },
    { id: 3, name: 'Журнал изьятий', link: '/outcoming' },
  /*   { id: 4, name: 'Договоры с поставщиками', link: '/contracts' }, */
    { id: 5, name: 'Поставщики', link: '/vendors' },
    { id: 6, name: 'Настройки', link: '/options' }
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
    const path = location?.pathname;

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