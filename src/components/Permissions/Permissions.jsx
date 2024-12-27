import s from './Permissions.module.scss';
import { ReactComponent as IconCheck } from '../../image/icon/iconCheck.svg';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//API
import { giveRights, takeRights } from '../../Api/Api';
//slice
import { setUpdatePermissions } from '../../store/reducer/update/slice';

const Permission = ({ id, person_id, access }) => {
    const [active, setActive] = useState(access || false);
    console.log(person_id, id)
    const dispatch = useDispatch();

    useEffect(() => {
        access ? setActive(true) : setActive(false)
    }, [access])

    const handleCheck = () => {
        if (active) {
            takeRights(person_id, id)
                .then(res => {
                    console.log(res)
                    setActive(false)
                    dispatch(setUpdatePermissions())
                })
                .catch(err => console.log(err))
            return
        }

        if (!active) {
            giveRights(person_id, id)
                .then(res => {
                    console.log(res)
                    setActive(true)
                    dispatch(setUpdatePermissions())
                })
                .catch(err => console.log(err))
            return
        }
    }

    return (
        <div className={`${s.permission}`}>
            <div onClick={handleCheck} className={`${s.checkbox} ${active && s.checkbox_check}`}>
                <div>
                    <IconCheck />
                </div>
            </div>
        </div>
    )
}

const Permissions = ({ name, person_id, position, permission, permissions }) => {
    console.log(permission)
    return (
        <div className={s.container}>
            <div className={`${s.item}`}>
                <div className={`${s.name}`}>
                    <p>{name}</p>
                    <span>
                        {position == 'supervisor' && 'Менеджер по работе с персоналом'}
                        {position == 'accountant' && 'Бухгалтер'}
                        {position == 'mainoperator' && 'Контакт-центр'}
                        {position == 'hr' && 'HR'}
                    </span>
                </div>

                {permissions.map((el) => {
                    const access = permission.find(item => item.id == el.id)
                    console.log(access)
                    return <Permission key={el.id} id={el.id} person_id={person_id} access={access} />
                })}
            </div>
        </div>
    )
};

export default Permissions;