import React from 'react';
import './Modal.css'
import Overlay from "../Overlay/Overlay";
import Button from "../Button";

const Modal = ({body, confirm, cancel}) => {

    return (
        <Overlay close={cancel}>
            <div className={"modalContainer"}>
                <div className={"modalBody"}>{body}</div>
                <Button className={'red right'} text={'confirm'} handler={confirm} />
                <Button className={''} text={'cancel'} handler={cancel} />
            </div>
        </Overlay>
    )
}

export default Modal;