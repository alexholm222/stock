import s from './WithdrawItem.module.scss';
import { setDate2 } from '../../../utils/dates';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';

const WithdrawItem = ({ el }) => {
 
    return (
        <div className={s.item}>
            <div className={s.field}>
                <p>{setDate2(el.date).dateText3}</p>
                <span>{el.date.slice(11, 16)}</span>
            </div>
            <div className={s.pos}>
                <div>
                    <p>{el.name}</p>
                </div>

            </div>

            <div className={`${s.field}`}>
                <p>{el.quantity}</p>
            </div>
            <div className={`${s.field} ${s.field_2}`}>
                <p>{addSpaceNumber(Math.ceil(el.sum))}</p>
            </div>

            <div className={s.manager}>
                <p>{el.person_name}</p>
            </div>
        </div>
    )
};

export default WithdrawItem;