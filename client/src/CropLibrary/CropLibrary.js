import React, { useContext, useState, useEffect, useMemo } from 'react';
import './CropLibrary.css';
import {CropContext} from "./CropContext";
import CropLibraryFields from "./CropLibraryFields";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";
import axios from "axios";
import Loading from "../shared/Loading/Loading";
import Modal from "../shared/Modal";
import Form from "../shared/Sidebar/Form/Form";

const conn = axios.create({
    withCredentials: true,
    baseURL: `/api/crops`,
})

const CropLibrary = () => {
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
    } = useContext(CropContext);

    const [tmp, setTmp] = useState(newCrop);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await conn.get('/');
                setCrops(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [setCrops, setLoading]);

    // reassign tmp object on select changes
    useEffect(()=>{
        if (selected != null && selected !== "new") {
            setTmp(crops.find(i=>i.id === selected))
        } else {
            setTmp(newCrop)
        }
        setErrors({})
    },[crops, selected, newCrop])

    if (loading) {
        return <Loading />;
    }

    const updateField = (e) => {
        setTmp({...tmp, [e.target.name]:e.target.value});
    }

    const updateCrops = async () => {
        try {
            const res = await conn.get('/');
            setCrops(res.data);
        } catch (e) {
            console.log(e)
        }
    }

    const addCrop = () => {
        setSelected("new");
        setErrors({})
    }

    const validate = () => {
        const errors = {};
        if (!tmp.name) {
            errors.name = "Please provide a name"
        }
        if (+tmp.growTime < 1) {
            errors.growTime = "Invalid input"
        }
        if (+tmp.sproutTime < 1) {
            errors.sproutTime = "Invalid input"
        }
        if (+tmp.growTime === +tmp.sproutTime) {
            errors.growTime = "Grow time cannot be less than or equal to sprout time"
        }
        if (+tmp.growTime < +tmp.sproutTime) {
            errors.growTime = "Grow time cannot be less than or equal to sprout time"
        }
        setErrors(errors);
        return errors;
    }

    const addHandler = async (e) => {
        if (!Object.entries(validate()).length) {
            try {
                const res = await conn.post('/', tmp);
                await updateCrops();
                setSelected(res.data.id)
            } catch (err) {
                console.log(err, e)
            }
        }
    }

    const saveHandler = async (e) => {
        if (!Object.entries(validate()).length) {
            try {
                await conn.put(`/${tmp.id}`, tmp)
                await updateCrops();
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
            const res = await conn.delete(`/${tmp.id}`);
            setSelected(res.data.length > 0 ? 0 : null);
            setModal(false);
            await updateCrops();
        } catch(err) {
            console.log(err, e)
        }
    }

    const modalBody = () => (
        <>
            <p>Are you sure you want to delete the crop:</p>
            <p className={"bold"}>{tmp.name}</p>
            <p>Any scheduled instances of this crop will also be deleted. <span className={'bold'}>This action cannot be undone.</span></p>
        </>
    )

    return (
        <>
            {modal?<Modal body={modalBody()} confirm={deleteHandler} cancel={()=>setModal(false)}/>:null}
            <Main>
                <Button className={'main'} text={'add crop'} handler={addCrop} />
                <TableView
                    Cols={[
                        { name: "name", prop: "name", type: "string" },
                        { name: "grow time", prop: "growTime", type: "int" },
                        { name: "sprout time", prop: "sproutTime", type: "int" },
                    ]}
                    Data={crops}
                    Selected={selected}
                    SetSelected={setSelected}
                    orderBy={orderBy}
                    order={order}
                    setOrderBy={setOrderBy}
                    setOrder={setOrder}
                />
            </Main>
            <Sidebar>
                {selected ?
                    <>
                        <div className={'title'}>
                            <h2>Crop Properties</h2>
                        </div>
                        <Form
                            fields={CropLibraryFields}
                            values={tmp}
                            errors={errors}
                            update={updateField}
                        >
                            <Button className={'save right'} text={'save'} handler={selected === "new" ? addHandler : saveHandler} />
                            <Button className={'outline cancel'} text={'cancel'} handler={cancelHandler} />
                            {tmp.id?<Button className={'red'} text={'delete'} handler={()=>{setModal(true)}} />:null}
                        </Form>
                    </>
                    : null}
            </Sidebar>
        </>
    )
}

export default CropLibrary;