import {createPortal} from 'react-dom';
import './Overlay.css';

const Overlay = ({children, close}) =>
    createPortal(
        <div
            className={"overlay"}
            onClick={close}>
            {children}
        </div>,
        document.getElementById("portal")
    )

export default Overlay;