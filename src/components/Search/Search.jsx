import s from './Search.module.scss';
import { ReactComponent as IconSearch } from '../../image/icon/iconSearch.svg';
import { useEffect, useState } from 'react';
import { handleFilterRemains, handleFilterContracts } from '../../utils/filter';

const Search = ({ list, setList, type, load, activeTab }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchValue = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const result = type == 4 ? handleFilterContracts(value ? value : '', [...list]) : handleFilterRemains(value ? value : '', [...list]);
        setList(result)
    }

    useEffect(() => {
        type !== 6 && setList(list);
    }, [activeTab]);


    return (
        <div className={`${s.search} ${(type == 6 || load) && s.search_disabled}`}>
            <IconSearch />
            <input disabled={(type == 6 || load) ? true : false} onChange={handleSearchValue} value={searchValue || ''} type='text' placeholder='Искать...'></input>
        </div>
    )
};

export default Search;