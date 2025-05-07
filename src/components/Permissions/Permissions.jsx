import s from './Permissions.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconCheck } from '../../image/icon/iconCheck.svg';
import Avatar from '../../image/avatarDef2.png';
//API
import { giveRights, takeRights } from '../../Api/Api';
//slice
import { setUpdatePermissions } from '../../store/reducer/update/slice';

const Permission = ({ id, person_id, access }) => {
    const [active, setActive] = useState(access || false);

    const dispatch = useDispatch();

    useEffect(() => {
        access ? setActive(true) : setActive(false)
    }, [access])

    const handleCheck = () => {
        if (active) {
            takeRights(person_id, id)
                .then(res => {

                    setActive(false)
                    dispatch(setUpdatePermissions())
                })
                .catch(err => console.log(err))
            return
        }

        if (!active) {
            giveRights(person_id, id)
                .then(res => {

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

const Permissions = ({ name, avatar, person_id, position, permission, permissions, partnership }) => {
    const [openTooltip, setOpenTooltip] = useState(false);

    const handleMouseEnter = () => {
        setOpenTooltip(true)
    }

    const handleMouseLeave = () => {
        setOpenTooltip(false)
    }

    return (
        <div className={s.container}>
            <div className={`${s.item}`}>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={s.person}>
                    <div className={s.avatar}>
                        <img src={avatar == '' ? Avatar : `https://lk.skilla.ru/images/persons/chat/${avatar}`}></img>
                    </div>
                    <div className={`${s.name}`}>
                        <p>{name}</p>
                        <span>
                            {position == 'supervisor' && 'Менеджер по работе с персоналом'}
                            {position == 'accountant' && 'Бухгалтер'}
                            {position == 'mainoperator' && 'Контакт-центр'}
                            {position == 'operator' && 'Клиентский менеджер'}
                            {position == 'hr' && 'HR'}
                        </span>
                    </div>

                    <div className={`${s.tooltip} ${openTooltip && s.tooltip_vis}`}>
                        <p>{partnership}</p>
                    </div>
                </div>


                {permissions.map((el) => {
                    const access = permission.find(item => item.id == el.id)

                    return <Permission key={el.id} id={el.id} person_id={person_id} access={access} />
                })}
            </div>
        </div>
    )
};

export default Permissions;