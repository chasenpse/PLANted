import './Sidebar.css';

const Sidebar = ({children, selected}) => {

    return (
        <section className={selected ? 'section open' : 'section'}>
            {children}
        </section>
    )
};

export default Sidebar;