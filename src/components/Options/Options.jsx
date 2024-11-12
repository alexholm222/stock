import { useEffect, useState } from 'react';
import s from './Options.module.scss';
import Item from './Item/Item';
import { ReactComponent as IconPlus } from '../../image/icon/iconPlus.svg';
//components
import Patterns from '../Patterns/Patterns';
import AddPayer from '../AddPayer/AddPayer';
import AddCategory from '../AddCategory/AddCategory';
import AddPattern from '../AddPattern/AddPattern';
import EditPattern from '../EditPattern/EditPattern';
import ItemSceleton from './ItemSceleton/ItemSceleton';
import DeleteModal from './DeleteModal/DeleteModal';
import Error from '../Error/Error';
import AddDefault from '../AddDefault/AddDefault';

const Options = ({ payers, patterns, categories, load }) => {
    const [anim, setAnim] = useState(false);
    const [modalAddPayer, setModalAddPayer] = useState(false);
    const [modalAddCategory, setModalAddCategory] = useState(false);
    const [modalAddPattern, setModalAddPattern] = useState(false);
    const [modalEditPattern, setModalEditPattern] = useState(false);
    const [modalAddDefault, setModalAddDefault] = useState(false);
    const [type, setType] = useState('');
    const [patternEl, setPatternEl] = useState({});
    const [heightPayers, setHeightPayers] = useState(payers.length * 60);
    const [heightCategories, setHeightCategories] = useState(0);
    const [modalDelete, setModalDelete] = useState(false);
    const [elDelete, setElDelete] = useState({});
    const [modalDelete2, setModalDelete2] = useState(false);
    const [elDelete2, setElDelete2] = useState({});
    const [modalDelete3, setModalDelete3] = useState(false);
    const [elDelete3, setElDelete3] = useState({});
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    console.log(payers)
  
    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
        })
    }, []);

    useEffect(() => {
        const height = payers.length * 60;
        if (!load) {
            setTimeout(() => {
                setHeightPayers(height)
            }, 100)
        } else {
            setHeightPayers(420);
        }

    }, [load, payers]);

    useEffect(() => {
        const height = categories.length * 60;
        if (!load) {
            setTimeout(() => {
                setHeightCategories(height)
            }, 100)
        } else {
            setHeightCategories(180);
        }

    }, [load, categories]);

    const handleOpenAddModal = () => {
        setModalAddPayer(true)
    }

    const handleOpenCategoryModal = () => {
        setModalAddCategory(true)
    }

    const handleOpenPatternModal = () => {
        setModalAddPattern(true)
    }

    return (
        <>
            <div className={`${s.options} ${anim && s.options_anim}`}>
                <div className={s.container}>
                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Список плательщиков</h2>
                        {!load && <div style={{ height: `${heightPayers}px` }} className={s.items}>
                            {payers.map((el, i) => {
                                return <Item key={el.id} i={i} el={el} setModal={setModalDelete} setElDelete={setElDelete} type={'payer'} setModalAddDefault={setModalAddDefault} setType={setType}/>
                            })}
                        </div>
                        }

                        {load && <div className={s.items}>
                            {[...Array(7)].map((el) => {
                                return <ItemSceleton />
                            })}
                        </div>}

                        <button disabled={load}  onClick={handleOpenAddModal} className={s.button}><IconPlus />Добавить плательщика</button>

                    </div>
                    <div className={`${s.block}`}>
                        <h2 className={s.title}>Категории закупок</h2>
                        {!load && <div style={{ height: `${heightCategories}px` }} className={`${s.items} ${s.items_cat}`}>
                            {categories.map((el, i) => {
                                return <Item key={el.id} i={i} el={el} setModal={setModalDelete2} setElDelete={setElDelete2} type={'categories'} setModalAddDefault={setModalAddDefault} setType={setType}/>
                            })}
                        </div>
                        }

                        {load && <div className={`${s.items} ${s.items_cat}`}>
                            {[...Array(3)].map((el) => {
                                return <ItemSceleton />
                            })}
                        </div>}

                        <button disabled={load}  onClick={handleOpenCategoryModal} className={s.button}><IconPlus />Добавить категорию</button>
                    </div>
                </div>
                <div className={`${s.block}`}>
                    <h2 className={s.title}>Шаблоны позиций</h2>
                    <Patterns patterns={patterns} load={load} setModal={setModalEditPattern} setEl={setPatternEl} setModalDelete={setModalDelete3} setElDelete={setElDelete3} />
                    <button disabled={load} onClick={handleOpenPatternModal} className={s.button}><IconPlus />Создать шаблон</button>
                </div>


            </div >

            {modalAddPayer && <AddPayer setModal={setModalAddPayer} />}
            {modalAddCategory && <AddCategory setModal={setModalAddCategory} />} 
            {modalAddDefault && <AddDefault setModal={setModalAddDefault} el={type == 'payer' ? elDelete : elDelete2} type={type}/>} 
            {modalAddPattern && <AddPattern  setModal={setModalAddPattern}/>}
            {modalEditPattern && <EditPattern  setModal={setModalEditPattern} el={patternEl}/>}
            {modalDelete && <DeleteModal setModal={setModalDelete} elDelete={elDelete} type={'payer'} setError={setError} setErrorText={setErrorText}/>}
            {modalDelete2 && <DeleteModal setModal={setModalDelete2} elDelete={elDelete2} type={'category'} setError={setError} setErrorText={setErrorText}/>}
            {modalDelete3 && <DeleteModal setModal={setModalDelete3} elDelete={elDelete3} type={'pattern'} setError={setError} setErrorText={setErrorText}/>}
            {error && <Error text={errorText} setErrorLoad={setError}/>}
        </>

    )
};

export default Options;