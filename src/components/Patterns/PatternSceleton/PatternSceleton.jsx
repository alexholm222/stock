import s from './PatternSceleton.module.scss';
import Loader from '../../Loader/Loader';

const PatternSceleton = () => {
    return (
        <div className={s.item}>
            <div className={s.check}>
                <div><Loader /></div>
            </div>
            <div className={s.name}>
                <div><Loader /></div>
            </div>
            <div className={s.units}>
                <div><Loader /></div>
            </div>
            <div className={s.price}>
                <div><Loader /></div>
            </div>
            <div className={s.outgo}>
                <div><Loader /></div>
            </div>
            <div className={s.status}>
                <div><Loader /></div>
            </div>
        </div>
    )
};

export default PatternSceleton;