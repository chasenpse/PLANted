import './Sidebar.css';

const Sidebar = ({children, display }) => {

    return (
        <section className={'section'}>
            {display !== undefined ? children : null}
        </section>
    )
};

export default Sidebar;