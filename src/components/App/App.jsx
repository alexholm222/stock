import s from './App.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconPlus } from '../../image/icon/iconPlus.svg';
import { ReactComponent as IconPro } from '../../image/icon/pro.svg';
import { useSelector } from 'react-redux';
import { updateSelector } from '../../store/reducer/update/selector';
//components
import Search from '../Search/Search';
import Tabs from '../Tabs/Tabs';
import Balance from '../Balance/Balance';
import Outcoming from '../Outcoming/Outcoming';
import Withdraw from '../​Withdraw/​Withdraw';
import Suppliers from '../Suppliers/Suppliers';
import Сontracts from '../Сontracts/Сontracts';
import Options from '../Options/Options';
import Error from '../Error/Error';
//API
import {
  getStockRemains, getOutcoming, getWithdraw, getVendors, getContracts,
  getPayersList, getPatterns, getCategories, getPermissions, getEmployees,
  getProfile
} from '../../Api/Api';

const Button = ({ type, setModalType, disabled }) => {
  const [buttonAnim, setButtonAnim] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setButtonAnim(true)
    })

    return () => setButtonAnim(false)
  }, []);

  const handleOpen = (e) => {
    const id = e.currentTarget.id;
    setModalType(id);
  }

  return <button disabled={disabled} onClick={handleOpen} id={type} className={`${s.button} ${buttonAnim && s.button_anim}`}>
    {type == 4 && `Добавить договор`}
    {type == 5 && `Добавить поставщика`}
    <IconPlus /></button>
}

const App = () => {
  const [theme, setTheme] = useState('light');
  const [anim, setAnim] = useState(false);
  /*   const [role, setRole] = useState(''); */
  const [profile, setProfile] = useState({});
  const [modalType, setModalType] = useState(0);
  const [activeTab, setActiveTab] = useState('1');
  const [stockRemainsFirstLoad, setStockRemainsFirstLoad] = useState([])
  const [stockRemains, setStockRemains] = useState([]);
  const [sumRemains, setSumRemains] = useState(0);
  const [vendorsFirstLoad, setVendorsFirstLoad] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [payers, setPayers] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contractsFirstLoad, setContractsFirstLoad] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [withdrawFirstLoad, setWithdrawFirstLoad] = useState([])
  const [withdraw, setWithdraw] = useState([]);
  const [outcomingFirstLoad, setOutcomingFirstLoad] = useState([])
  const [outcoming, setOutcoming] = useState([]);
  const [errorLoad, setErrorLoad] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(true);
  const [load3, setLoad3] = useState(true);
  const [load4, setLoad4] = useState(true);
  const [load5, setLoad5] = useState(true);
  const [load6, setLoad6] = useState(true);
  const updateRemains = useSelector(updateSelector).updateBalance;
  const updateSuppliers = useSelector(updateSelector).updateSuppliers;
  const updateContracts = useSelector(updateSelector).updateContracts;
  const updatePayers = useSelector(updateSelector).updatePayers;
  const updatePermissions = useSelector(updateSelector).updatePermissions;
  const role = document.getElementById('root_stock').getAttribute('role');
  const ispro = document.getElementById('root_stock').getAttribute('ispro');
  const isskilla = document.getElementById('root_stock').getAttribute('isskilla') == 1 ? true : false;
  const appRef = useRef();

  useEffect(() => {
    setAnim(true)
  }, [])


  //Информация о пользователе
  useEffect(() => {
    getProfile()
      .then(res => {
        const data = res.data.data;
        setProfile(data)
        /* setRole(data.position) */
      })
      .catch(err => console.log(err))
  }, []);

  //прокрутка страницы наверх 
  useEffect(() => {
    window.scrollTo(0, 0);

    document.addEventListener('dragover', (e) => {
      e.preventDefault();
    })

    return () => {
      document.removeEventListener('dragover', (e) => {
        e.preventDefault();
      })
    }
  }, [])

  //установка системной темы
  useEffect(() => {
    if (theme == '') {
      const userMedia = window.matchMedia('(prefers-color-scheme: light)')
      if (userMedia.matches) return setTheme('light')
      return setTheme('dark')
    }
  }, [theme])
  document.documentElement.dataset.theme = theme;

  //Установка Тайтла
  useEffect(() => {

    if (activeTab == 1) {
      document.title = 'Текущие остатки';
      return
    }

    if (activeTab == 2) {
      document.title = 'Списание';
      return
    }

    if (activeTab == 3) {
      document.title = 'Журнал изьятий';
      return
    }

    if (activeTab == 4) {
      document.title = 'Договоры с поставщиками';
      return
    }

    if (activeTab == 5) {
      document.title = 'Поставщики';
      return
    }

    if (activeTab == 6) {
      document.title = 'Настройки';
      return
    }

  }, [activeTab]);

  //Получаю список остатков
  useEffect(() => {
    getStockRemains()
      .then(res => {
        const remains = res.data;
        const sum = remains.reduce((acc, el) => acc + Number(el.sum), 0);
        setSumRemains(sum)

        remains.sort((a, b) => {
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

        setStockRemainsFirstLoad(res.data);
        setStockRemains(res.data);
        setTimeout(() => {
          setLoad(false);
        }, 200)
      })
      .catch(err => {
        setErrorLoad(true);
        console.log(err);
      })
  }, [updateRemains]);

  //Получаю список изьятий
  useEffect(() => {
    getOutcoming()
      .then(res => {
        setWithdrawFirstLoad(res.data);
        setWithdraw(res.data);
        setLoad3(false);
      })
      .catch(err => {
        setErrorLoad(true);
        console.log(err);
      })
  }, [updateRemains]);

  //Получаю список списаний
  useEffect(() => {
    getWithdraw()
      .then(res => {
        setOutcomingFirstLoad(res.data);
        setOutcoming(res.data);
        setLoad2(false);
      })
      .catch(err => {
        setErrorLoad(true);
        console.log(err);
      })
  }, [updateRemains]);

  //Получаю список поставщиков
  useEffect(() => {
    getVendors()
      .then(res => {
        const vendorsOnlyWithInn = res.data.filter(el => el.inn !== '' && el.inn !== null);
        const vendors = (role == 'administrator' || role == 'director') ? res.data : vendorsOnlyWithInn;
     
        setVendorsFirstLoad([...vendors]);
        setVendors(vendors);
        setTimeout(() => {
          setLoad5(false);
        }, 200)
      })
      .catch(err => {
        setErrorLoad(true);
        console.log(err);
      })
  }, [updateSuppliers]);

  //Получаю список плательщиков //Список шаблнов // Список категорий
  useEffect(() => {
    if ((role == 'administrator' || role == 'director')) {
      Promise.all([getPayersList(), getPatterns(), getCategories()])
        .then(([res1, res2, res3]) => {
          const payers = res1.data;
          const patterns = res2.data;
          const categories = res3.data;
         

          payers.sort((a, b) => {
            if (a.by_default > b.by_default) {
              return -1
            }

            if (a.by_default < b.by_default) {
              return 1
            }
          })

          categories.sort((a, b) => {
            if (a.by_default > b.by_default) {
              return -1
            }

            if (a.by_default < b.by_default) {
              return 1
            }
          })
          setPayers(payers);
          setPatterns(patterns);
          setCategories(categories);

          setTimeout(() => {
            setLoad6(false);
          }, 100)

        })
        .catch(err => {
          setErrorLoad(true);
          console.log(err);
        })
      return
    }

    if ((role !== 'administrator' && role !== 'director')) {
      getPayersList()
        .then(res => {
          const payers = res.data;
          payers.sort((a, b) => {
            if (a.by_default > b.by_default) {
              return -1
            }

            if (a.by_default < b.by_default) {
              return 1
            }
          })

          setPayers(payers);

          setTimeout(() => {
            setLoad6(false);
          }, 100)

        })
        .catch(err => {
          setErrorLoad(true);
          console.log(err);
        })
      return
    }

  }, [updatePayers, role])

  //Получаю список договоров
  useEffect(() => {
    getContracts()
      .then(res => {
        setContractsFirstLoad(res.data);
        setContracts(res.data);
        setTimeout(() => {
          setLoad4(false);
        }, 100)
      })
      .catch(err => {
        setErrorLoad(true);
        console.log(err);
      })
  }, [updateContracts])

  //Получаю список сотрудников и прав
  useEffect(() => {
    Promise.all([getPermissions(), getEmployees()])
      .then(([res1, res2]) => {
        const data1 = res1.data.data;
        const data2 = res2.data.data;
        setPermissions(data1)
        setEmployees(data2)
      })
      .catch(err => console.log(err))

  }, [updatePermissions])

  const handlePro = () => {
    document?.getElementById('pro-open')?.click();
  }


  return (
    <>
      {(ispro == 1 || isskilla) && <div ref={appRef} className={`${s.app} ${isskilla && s.app_skilla} ${anim && s.app_anim}`}>
        <h2 className={s.title}>Склад</h2>
        <div className={s.header}>
          {activeTab == 1 && <Search setList={setStockRemains} list={stockRemainsFirstLoad} load={load} activeTab={activeTab} />}
          {activeTab == 2 && <Search setList={setOutcoming} list={outcomingFirstLoad} load={load2} activeTab={activeTab} />}
          {activeTab == 3 && <Search setList={setWithdraw} list={withdrawFirstLoad} load={load3} activeTab={activeTab} />}
          {activeTab == 4 && <Search setList={setContracts} list={contractsFirstLoad} type={4} load={load4} activeTab={activeTab} />}
          {activeTab == 5 && <Search setList={setVendors} list={vendorsFirstLoad} load={load5} activeTab={activeTab} />}
          {activeTab == 6 && <Search type={6} activeTab={activeTab} />}
          <Tabs setActiveTab={setActiveTab} activeTab={activeTab} role={role} />
          {activeTab == 4 && <Button type={4} setModalType={setModalType} disabled={!load6 && !load4 ? false : true} />}
          {activeTab == 5 && <Button type={5} setModalType={setModalType} disabled={load5} />}

        </div>
        {activeTab == 1 && <Balance appRef={appRef} isskilla={isskilla} stockRemainsFirstLoad={stockRemainsFirstLoad} stockRemains={stockRemains} outcoming={outcoming} load={load} sumRemains={sumRemains} />}
        {activeTab == 2 && <Outcoming appRef={appRef} isskilla={isskilla} role={role} outcomingFirstLoad={outcomingFirstLoad} outcoming={[...outcoming].reverse()} load={load2} />}
        {activeTab == 3 && <Withdraw appRef={appRef} isskilla={isskilla} withdrawFirstLoad={withdrawFirstLoad} withdraw={[...withdraw].reverse()} load={load3} />}
        {activeTab == 4 && <Сontracts modalType={modalType} setModalType={setModalType} contracts={contracts} load={load4} vendors={vendorsFirstLoad} payers={payers} />}
        {activeTab == 5 && <Suppliers appRef={appRef} isskilla={isskilla} role={role} modalType={modalType} setModalType={setModalType} vendorsFirstLoad={vendorsFirstLoad} vendors={[...vendors].reverse()} load={load5} />}
        {activeTab == 6 && (role == 'administrator' || role == 'director') && <Options role={role} load={load6} payers={payers} patterns={patterns} categories={categories} employees={employees} permissions={permissions} />}
        {errorLoad && <Error setErrorLoad={setErrorLoad} text={'При загрузке данных произошла ошибка, попробуй перезагрузить страницу'} />}
      </div>}

      {(ispro == 0 && !isskilla) && <div className={s.pro}>
        <p onClick={handlePro}>Склад доступен только для обладателей <span><IconPro /></span> версии</p>
      </div>}
    </>

  );
}

export default App;
