import './Sidebar.css';
import {TiDelete} from "react-icons/ti";
import Button from "../Button";

const Sidebar = ({children, title}) => {
    return (
        <section className={'section'}>
            <div className={'title'}>
                <h2>{title}</h2><TiDelete/>
            </div>
            <form className={'sidebar-form'}>
                {children}
                <Button type={'cancel'} text={'cancel'} />
                <Button type={'save right'} text={'save'} />
            </form>
        </section>
    )
};

export default Sidebar;