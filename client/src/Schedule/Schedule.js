import React, {useContext, useState, useEffect, useMemo} from 'react';
import './Schedule.css';
import {ScheduleContext} from "./ScheduleContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";
import axios from "axios";
import Loading from "../shared/Loading/Loading";
import Modal from "../shared/Modal";
import {validateYYYYMMDD} from "../utils/validate";
import {dateToYYYYMMDD} from "../utils/formatDate";
import compareObj from "../utils/compareObj";

const conn = axios.create({
    withCredentials: true,
    baseURL: `/api`
})

const Schedule = () => {
    const newInstance = useMemo(()=>(
        {
            "cropId": 0,
            "quantity": 1,
            "stages": 1,
            "startDate": dateToYYYYMMDD(new Date().toLocaleDateString()),
            "endDate": dateToYYYYMMDD(new Date().toLocaleDateString()),
            "notes": "",
        }
    ), [])

    const newCrop = useMemo(()=>(
        {
            "id": 0,
            "name": "",
            "growTime": 1,
            "sproutTime": 1,
            "notes": "",
        }
    ), [])

    const {
        instances,
        setInstances,
        crops,
        setCrops,
        selected,
        setSelected,
        loading,
        setLoading,
        orderBy,
        setOrderBy,
        order,
        setOrder,
    } = useContext(ScheduleContext);

    const [tmp, setTmp] = useState(newInstance);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [crop, setCrop] = useState(newCrop);

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const instanceRes = await conn.get(`/instances`);
                const cropRes = await conn.get(`/crops`);

                setInstances(instanceRes.data.map(i=> {
                    i.startDate = dateToYYYYMMDD(i.startDate);
                    i.endDate = dateToYYYYMMDD(i.endDate);
                    return i;
                }));

                setCrops(cropRes.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [setCrops, setInstances, setLoading]);

    // update tmp object when selected is changed
    useEffect(()=>{
        if (selected != null && selected !== "new") {
            setTmp(instances.find(i=>i.id === selected))
        } else {
            setTmp(newInstance)
        }
    },[instances, selected])

    const updateField = (e) => {
        if (e.target.type === "number" || e.target.type === "select-one") {
            setTmp({...tmp, [e.target.name]: +e.target.value});
        } else {
            setTmp({...tmp, [e.target.name]: e.target.value});
        }
    }

    const updateInstances = async () => {
        try {
            const res = await conn.get(`/instances`);
            setInstances(res.data.map(i=> {
                i.startDate = dateToYYYYMMDD(i.startDate);
                i.endDate = dateToYYYYMMDD(i.endDate);
                return i;
            }));
        } catch (e) {
            console.log(e)
        }
    }

    const addInstance = () => {
        setSelected("new");
    }

    const validate = () => {
        const errors = {};

        if (!tmp.cropId) {
            errors.cropId = "Please select a crop"
        }
        if (+tmp.quantity < 1) {
            errors.quantity = "Invalid input"
        }
        if (+tmp.stages < 1) {
            errors.stages = "Invalid input"
        }
        if (!validateYYYYMMDD(tmp.startDate)) {
            errors.startDate = "Invalid input"
        }
        if (!validateYYYYMMDD(tmp.endDate)) {
            errors.endDate = "Invalid input"
        }
        setErrors(errors);
        return errors;
    }

    const addHandler = async (e) => {
        if (!Object.entries(validate()).length) {
            try {
                const res = await conn.post(`/instances`, tmp);
                await updateInstances();
                setSelected(res.data.id)
            } catch (err) {
                console.log(err, e)
            }
        }
    }

    const saveHandler = async (e) => {
        if (!Object.entries(validate()).length) {
            try {
                await conn.put(`/instances/${tmp.id}`, tmp)
                await updateInstances();
            } catch(err) {
                console.log(err, e)
            }
        }
    }

    const cancelHandler = (e) => {
        try {
            setSelected(null)
            setErrors({})
        } catch (err) {
            console.log(err, e);
        }
    }

    const deleteHandler = async (e) => {
        try {
            const res = await conn.delete(`/instances/${tmp.id}`);
            setSelected(res.data.length > 0 ? 0 : null);
            setModal(false);
            await updateInstances();
        } catch(err) {
            console.log(err, e)
        }
    }

    if (loading) {
        return <Loading />;
    }

    const modalBody = () => {
        return (
            <>
                <p>Are you sure you want to delete the instance:</p>
                <p className={"bold"}>{tmp['crop.name']}</p>
                <p className={'red bold'}>This action cannot be undone.</p>
            </>
        )
    }

    const adjustEndDate = () => {
        const newEndDate = new Date(tmp.startDate);
        newEndDate.setDate(newEndDate.getDate() + crop.growTime);
        return dateToYYYYMMDD(newEndDate);
    }

    return (
        <>
            <Main selected={selected}>
                {modal && (
                    <Modal body={modalBody()} confirm={deleteHandler} cancel={()=>setModal(false)}/>
                )}
                <Button className={'main'} text={'add instance'} handler={addInstance} />
                <TableView
                    Cols={[
                        { name: "crop", prop: "crop.name", type: "string" },
                        { name: "quantity", prop: "quantity", type: "int" },
                        { name: "stages", prop: "stages", type: "int" },
                        { name: "start", prop: "startDate", type: "date" },
                        { name: "end", prop: "endDate", type: "date" },
                    ]}
                    Data={instances}
                    Selected={selected}
                    SetSelected={setSelected}
                    orderBy={orderBy}
                    order={order}
                    setOrderBy={setOrderBy}
                    setOrder={setOrder}
                />
            </Main>
            <Sidebar selected={selected}>
                { selected && (
                    <>
                        <div className={"closeSidebar"} onClick={()=>setSelected(null)} />
                        <div className={'title'}>
                            <h2>Instance Properties</h2>
                        </div>
                        <form className={'sidebar-form'}>
                            <div className={"sidebar-field"}>
                                <label>Crop</label>
                                <select
                                    name="cropId"
                                    value={tmp.cropId}
                                    onChange={e => {
                                        const crop = crops.filter(crop=>crop.id===+e.target.value)[0];
                                        setCrop(crop);
                                        const startDate = new Date(dateToYYYYMMDD(crop.startDate));
                                        setTmp({
                                            ...tmp,
                                            cropId: crop.id,
                                            endDate: dateToYYYYMMDD(startDate.setDate(startDate.getDate() + crop.growTime)),
                                        })
                                    }}
                                >
                                    <option disabled value={"0"}>Select Crop</option>
                                    {crops.map(crop => <option key={`crop-${crop.id}`} value={crop.id}>{crop.name}</option>)}
                                </select>
                            </div>
                            <div className={"sidebar-field"}>
                                <label>Quantity</label>
                            <input
                                name={'quantity'}
                                type={'number'}
                                inputMode={"decimal"}
                                min={1}
                                max={99}
                                step={1}
                                value={tmp.quantity}
                                onChange={e => updateField(e)}
                            />
                            </div>
                            <div className={"sidebar-field"}>
                                <label>Stages</label>
                            <input
                                name={"stages"}
                                type={"number"}
                                inputMode={"decimal"}
                                min={1}
                                max={99}
                                step={1}
                                value={tmp.stages}
                                onChange={e => updateField(e)}
                            />
                            </div>
                            <div className={"sidebar-field"}>
                                <label>Start Date</label>
                            <input
                                name={'startDate'}
                                type={'date'}
                                value={tmp.startDate}
                                onChange={e => updateField(e)}
                            />
                            </div>
                            <div className={"sidebar-field"}>
                                <label>End Date</label>
                            <input
                                name={'endDate'}
                                type={'date'}
                                min={adjustEndDate()}
                                value={tmp.endDate}
                                onChange={e => updateField(e)}
                            />
                            </div>
                            <div className={"sidebar-field"}>
                                <label>Notes</label>
                            <textarea
                                name={'notes'}
                                value={tmp.notes}
                                onChange={e => updateField(e)}
                            />
                            </div>
                            <Button
                                className={'save right'}
                                text={'save'}
                                handler={selected === "new" ? addHandler : saveHandler}
                                disabled={compareObj(tmp, {...instances.filter(i=>i.id===selected)[0]})}
                            />
                            <Button className={'outline cancel'} text={'cancel'} handler={cancelHandler} />
                            {tmp.id?<Button className={'red'} text={'delete'} handler={()=>{setModal(true)}} />:null}
                        </form>
                    </>
                ) }
            </Sidebar>
        </>
    )
}

export default Schedule;