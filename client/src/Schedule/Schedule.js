import React, {useContext, useState, useEffect, useMemo} from 'react';
import './Schedule.css';
import {ScheduleContext} from "./ScheduleContext";
import ScheduleFields from "./ScheduleFields";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";
import axios from "axios";
import Loading from "../shared/Loading/Loading";
import Modal from "../shared/Modal";
import Form from "../shared/Sidebar/Form/Form";
import {validateYYYYMMDD} from "../utils/validate";
import {dateToYYYYMMDD} from "../utils/formatDate";

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
            "startDate": dateToYYYYMMDD(new Date().toISOString()),
            "endDate": dateToYYYYMMDD(new Date().toISOString()),
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
    },[instances, selected, newInstance])

    const updateField = (e) => {
        return setTmp({...tmp, [e.target.name]:e.target.value})
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
                <p className={'bold'}>This action cannot be undone.</p>
            </>
        )
    }

    return (
        <>
            <Main selected={selected}>
                {modal?<Modal body={modalBody()} confirm={deleteHandler} cancel={()=>setModal(false)}/>:null}
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
                { selected ?
                    <>
                        <div className={"closeSidebar"} onClick={()=>setSelected(null)} />
                        <div className={'title'}>
                            <h2>Instance Properties</h2>
                        </div>
                        <Form
                            fields={ScheduleFields}
                            values={tmp}
                            errors={errors}
                            update={updateField}
                            dataset={crops}
                        >
                            <Button className={'save right'} text={'save'} handler={selected === "new" ? addHandler : saveHandler} />
                            <Button className={'outline cancel'} text={'cancel'} handler={cancelHandler} />
                            {tmp.id?<Button className={'red'} text={'delete'} handler={()=>{setModal(true)}} />:null}
                        </Form>
                    </> : null }
            </Sidebar>
        </>
    )
}

export default Schedule;