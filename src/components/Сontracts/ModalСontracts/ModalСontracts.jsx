import s from './ModalСontracts.module.scss';
import { ReactComponent as IconClose } from '../../../image/icon/iconClose.svg';
import { ReactComponent as IconSuccess } from '../../../image/icon/iconSuccess.svg';
import { ReactComponent as IconCheck } from '../../../image/icon/iconCheck.svg';
import { ReactComponent as IconDelete } from '../../../image/icon/iconDelete.svg';
import { ReactComponent as IconDone } from '../../../image/icon/iconDone.svg';
import { ReactComponent as IconWarning } from '../../../image/icon/iconWarning.svg';
import iconFolder from '../../../image/icon/iconFolder.png'
import { useState, useEffect, useRef } from 'react';
import { setDate } from '../../../utils/dates';
//components
import InputList from './InputList/InputList';
import DataPicker from '../../../utils/DatePicker/DatePicker';
import FileLoader from '../../FileLoader/FileLoader';
import LoaderButton from '../../LoaderButton/LoaderButton';
//API 
import { addContract, editContract, baseUrl } from '../../../Api/Api';
//slice
import { setUpdateContracts } from '../../../store/reducer/update/slice';
import { useDispatch } from 'react-redux';

const File = ({ file, files, setFiles, setOldFiles, id, type, disabled }) => {
    const [animFile, setAnimFile] = useState(type == 'existing' ? true : false);
    const [viewing, setViewing] = useState(false);
    const [urlFile, setUrlFile] = useState('');
    const conditionDownload = type == 'existing' ? true : type !== 'existing' && file.name.slice(-3) !== 'pdf' ? file.name : false;
    const conditionTarget = type == 'existing' && file.slice(-3) !== 'pdf' ? '_self' : '_blank';

    useEffect(() => {
        if (type == 'existing') {
           const link = `${baseUrl}file/${file}`;
           setUrlFile(link);
        } else {
            const fileUrl = window.URL.createObjectURL(file.file);
            setUrlFile(fileUrl)
        }
    }, [file])

    useEffect(() => {
        setTimeout(() => {
            setAnimFile(true);
        })
    }, []);

    const handleDelete = (e) => {
        const idTarget = e.currentTarget.id;
        if (idTarget == id) {
            setAnimFile(false);
            const filterArr = files.filter(el => el.id != id);
            type == 'existing' && setOldFiles(prevState => [...prevState, file]);
            setTimeout(() => {
                setFiles(filterArr);
            }, 200)
        }
    }

    const handleOpenFile = () => {
        setViewing(true)
    }
    return (
        <div className={`${s.file} ${animFile && s.file_anim} ${disabled && s.file_disabled}`}>
            <a className={s.link} target={conditionTarget} download={conditionDownload} href={urlFile}>
                <div onClick={handleOpenFile}>
                    <img src={iconFolder}></img>
                    <p>
                        {type == 'existing' && file.split('/').pop()}
                        {type !== 'existing' && file?.name}
                    </p>
                </div>
            </a>
            {!disabled && <div onClick={handleDelete} id={id} className={s.delete}>
                <IconDelete />
            </div>}
        </div>
    )
}

const Bage = ({ status, dayRemain }) => {
    return (
        <>
            {status == 'deadline' && <div className={`${s.bage}`}>
                <IconWarning />
                <p>Срок действия договора заканчивается через {dayRemain}
                    {dayRemain == 1 && ' день'}
                    {dayRemain > 1 && dayRemain < 5 && ' дня'}
                    {dayRemain >= 5 && ' дней'}
                </p>
            </div>}
            {status == 'disabled' && <div className={`${s.bage} ${s.bage_red}`}>
                <IconWarning />
                <p>Срок действия договора истек</p>
            </div>}
        </>

    )
}

const ModalСontracts = ({ setModal, payers, vendors, vendor, payer, el, type, filesArr, start_date, end_date, status, dayRemain }) => {
    const [anim, setAnim] = useState(false);
    const [success, setSuccess] = useState(false);
    const [buyer, setBuyer] = useState(type == 'existing' ? payer : payers[0]);
    const [bayerListOpen, setBayerListOpen] = useState(false);
    const [bayerListError, setBayerListError] = useState(false);
    const [provider, setProvider] = useState(type == 'existing' ? vendor : {});
    const [providerListOpen, setProviderListOpen] = useState(false);
    const [providerListError, setProviderListError] = useState(false);
    const [check, setCheck] = useState(false);
    const [number, setNumber] = useState(type == 'existing' ? el?.contract_number : '');
    const [startDate, setStartDate] = useState(type == 'existing' && start_date ? start_date : ''/* setDate().dateText2 */);
    const [endDate, setEndDate] = useState(type == 'existing' && start_date ? end_date : ''/* setDate().dateText2 */);
    const [buttonDisabled, setButtonDisabled] = useState(type == 'existing' ? false : true);
    const [files, setFiles] = useState([]);
    const [filesExist, setFilesExist] = useState(filesArr || []);
    const [oldFiles, setOldFiles] = useState([]);
    const [fileForSend, setFileForSend] = useState([]);
    const [hidenFileLoader, setHidenFileLoader] = useState(false);
    const [load, setLoad] = useState(false);
    const [disabled, setDisabled] = useState(type == 'existing' ? true : false);
    const [save, setSave] = useState(false);
    /*  const [change, setChange] = useState(false); */
    const modalRef = useRef();
    const inputBayerRef = useRef();
    const inputProviderRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, [])

    useEffect(() => {
        setAnim(true)
    }, []);

    useEffect(() => {
        type == 'existing' && start_date == null ? setCheck(true) : setCheck(false)
    }, [start_date])

    useEffect(() => {
        if (type == 'existing') {
            setDisabled(true);
            return
        }
    }, [type]);

    /*     useEffect(() => {
            if (type == 'existing' && (payer.name !== buyer.name ||
                vendor.name !== provider.name ||
                el.contract_number !== number ||
                start_date !== startDate ||
                end_date !== endDate ||
                filesArr.filter(el => el && el !== null).length !== filesExist.length ||
                files.length > 0 
                )) {
                setChange(true)
            } else {
                setChange(false)
            }
    
        }, [files, filesExist, buyer, provider, number, startDate, endDate]) */


    useEffect(() => {
        if (provider.id && buyer.id && number && (files.length > 0 || filesExist.length > 0)) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [provider, buyer, number, files, filesExist]);

    useEffect(() => {
        (filesExist.length + files.length) >= 7 ? setTimeout(() => { setHidenFileLoader(true) }, 100) : setHidenFileLoader(false);
    }, [files, filesExist])

    useEffect(() => {
        const filesSend = files.map((el) => {
            return el.file
        });
        setFileForSend(filesSend)
    }, [files])


    const handleCloseModal = () => {
        setAnim(false);
        setSuccess(false);
        setTimeout(() => {
            setModal(0);
        }, 300)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.closest('.ant-picker-dropdown') && !bayerListOpen && !providerListOpen) {
            handleCloseModal();
            return
        }

        if (bayerListOpen && inputBayerRef.current && !inputBayerRef.current.contains(e.target)) {
            setBayerListOpen(false);
            return
        }

        if (providerListOpen && inputProviderRef.current && !inputProviderRef.current.contains(e.target)) {
            setProviderListOpen(false);
            return
        }
    }

    const handleConfirm = () => {
        setLoad(true);
        const formData = new FormData();
        formData.append('payer_id', buyer.id);
        formData.append('vendor_id', provider.id);
        formData.append('contract_number', number);
        !check && formData.append('start_date', startDate);
        !check && formData.append('end_date', endDate);

        fileForSend.forEach((el, i) => {
            console.log(el);
            formData.append(`files[${i}]`, el, el.name)
        });
        addContract(formData)
            .then(res => {
                dispatch(setUpdateContracts())
                setTimeout(() => {
                    setLoad(false);
                    setSuccess(true);
                }, 200)
            })
            .catch(err => console.log(err))
    }

    const handleConfirmEdit = () => {
        setLoad(true);
        const formData = new FormData();
        formData.append('id', el.id);
        formData.append('payer_id', buyer.id);
        formData.append('vendor_id', provider.id);
        formData.append('contract_number', number);
        formData.append('start_date', check ? '' : startDate);
        formData.append('end_date', check ? '' : endDate);

        fileForSend.forEach((el, i) => {
            console.log(el);
            formData.append(`files[${i}]`, el, el.name)
        });

        oldFiles.forEach((item) => formData.append("old_files[]", item))
        console.log(formData.get('old_files'))
        editContract(formData)
            .then(res => {
                console.log(res)
                dispatch(setUpdateContracts());
                setTimeout(() => {
                    setSave(true);
                    setDisabled(true);
                    setLoad(false);
                }, 200)
            })
            .catch(err => console.log(err))
    }

    const handleNumber = (e) => {
        const value = e.target.value;
        setNumber(value)
    }

    const handleCheck = () => {
        if (check) {
            setCheck(false);
            /*  setStartDate('');
             setEndDate(''); */
            return
        }
        if (!check) {
            setCheck(true);
            setStartDate('');
            setEndDate('')
            return
        }
    }

    const handleEdit = () => {
        if (disabled) {
            setDisabled(false);
            return
        }

        if (!disabled) {
            handleConfirmEdit()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);

        return () => document.removeEventListener('mousedown', closeModal);
    }, [bayerListOpen, providerListOpen]);

    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>

            <div ref={modalRef} className={`${s.modal} ${anim && !success && s.modal_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>
                        Новый договор
                    </h2>
                    <IconClose onClick={handleCloseModal} />
                </div>

                <p className={s.sub}>Покупатель</p>
                <InputList
                    setOpen={setBayerListOpen}
                    open={bayerListOpen}
                    value={buyer}
                    setValue={setBuyer}
                    inputRef={inputBayerRef}
                    list={payers}
                    err={bayerListError}
                    setErr={setBayerListError}
                    disabled={disabled}
                />

                <p className={s.sub}>Поставщик</p>
                <InputList
                    setOpen={setProviderListOpen}
                    open={providerListOpen}
                    value={provider}
                    setValue={setProvider}
                    inputRef={inputProviderRef}
                    list={vendors}
                    err={providerListError}
                    setErr={setProviderListError}
                    disabled={disabled}
                    type={'object'}
                />


                <p className={s.sub}>Номер договора</p>
                <input disabled={disabled} onChange={handleNumber} value={number || ''} type='number' className={s.input}></input>

                <p className={s.sub}>Срок действия договора</p>
                <div className={s.container}>
                    <DataPicker queryDate={startDate} setQueryDate={setStartDate} disabled={check || disabled} check={check} editStop={false} />
                    <p>-</p>
                    <DataPicker queryDate={endDate} setQueryDate={setEndDate} disabled={check || disabled} check={check} editStop={false} />
                </div>


                <div onClick={handleCheck} className={`${s.check} ${disabled && s.check_hidden}`}>
                    <div className={`${s.checkbox} ${check && s.checkbox_check}`}>
                        <div>
                            <IconCheck />
                        </div>
                    </div>
                    <p>Бессрочный договор</p>
                </div>

                <Bage status={status} dayRemain={dayRemain} />
                <p className={s.sub}>Договор</p>
                {(files.length > 0 || filesExist.length > 0) && <div className={s.container_files}>
                    {files.map((el, i) => {
                        return <File key={el.id} id={el.id} file={el} setFiles={setFiles} files={files} />
                    })}

                    {filesExist.map((el, i) => {
                        return <File key={el.id} id={el.id} file={el.file} setFiles={setFilesExist} files={filesExist} setOldFiles={setOldFiles} type={'existing'} disabled={disabled} />
                    })}
                </div>
                }
                <div className={`${s.container_fileloader} ${(hidenFileLoader || disabled) && s.container_fileloader_hiden}`}>
                    <FileLoader files={files} setFiles={setFiles} />
                </div>

                {type !== 'existing' && <button disabled={buttonDisabled} onClick={handleConfirm} className={s.button}>
                    {load ? 'Сохраняем...' : 'Подтвердить'}
                    <div>
                        {load && <LoaderButton />}
                    </div>
                </button>}

                {type == 'existing' && <button onClick={handleEdit} disabled={buttonDisabled} className={`${s.button} ${disabled && s.button_2} ${save && s.button_3}`}>
                    {disabled && !save && 'Редактировать'}
                    {!disabled && !load && !save && 'Сохранить'}
                    {!disabled && load && 'Сохраняем...'}
                    {save && <div>Изменения сохранены <IconDone /></div>}
                </button>}
            </div>

            <div className={`${s.success} ${success && s.success_anim}`}>
                <div className={s.close}><IconClose /></div>
                <IconSuccess />
                <h2 className={`${s.title} ${s.title_success}`}>
                    Договор добавлен
                </h2>
                <p className={s.text}>{provider?.name}</p>

            </div>
        </div>
    )
};

export default ModalСontracts;