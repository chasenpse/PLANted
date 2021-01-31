import './Sidebar.css';
import {TiDelete} from "react-icons/ti";

const Sidebar = ({children, title}) => {
    return (
        <section className={'section'}>
            <div className={'title'}>
                <h2>{title}</h2><TiDelete/>
            </div>
            <form className={'sidebar-form'}>
                {children}
            </form>
        </section>
    )
};

export default Sidebar;