import s from './ItemSceleton.module.scss';
import Loader from '../../Loader/Loader';

const ItemSceleton = () => {
    return (
        <div className={s.item}>
            <div className={s.container}>
                <div className={s.checkbox}>
                    <Loader />
                </div>
                <div className={s.name}>
                    <Loader />
                </div>
            </div>
            <div className={s.bage}>
                <Loader />
            </div>
        </div>
    )
};

export default ItemSceleton;