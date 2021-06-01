import './Overlay.css';

const Overlay = ({style, close, children}) =>
    <div
        className={"overlay"}
        style={style}
        onClick={close}
    >
        {children}
    </div>

export default Overlay;