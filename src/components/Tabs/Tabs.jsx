import { useState } from 'react';
import s from './Tabs.module.scss';
const tabs = ['Текущие остатки', 'Списание', 'Журнал изьятий', 'Договоры с поставщиками', 'Поставщики', 'Настройки'];
const tabs2 = ['Текущие остатки', 'Списание', 'Журнал изьятий', 'Договоры с поставщиками', 'Поставщики'];

const Tab = ({ tab, id, active, handleActiveTab }) => {
    return <div onClick={handleActiveTab} id={id} className={`${s.tab} ${active && s.tab_active}`}>
        <p>{tab}</p>
    </div>
}

const Tabs = ({activeTab, setActiveTab, role}) => {
    
    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTab(id)
        localStorage.setItem('tabStock', JSON.stringify(id));
    }
    return (
        <div className={s.tabs}>
            {(role == 'administrator' ? tabs : tabs2).map((el, i) =>
                <Tab handleActiveTab={handleActiveTab} key={i + 1} tab={el} id={i + 1} active={activeTab == i + 1} />
            )}
        </div>
    )
};

export default Tabs;