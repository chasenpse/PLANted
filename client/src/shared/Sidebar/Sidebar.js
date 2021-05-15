import './Sidebar.css';

const Sidebar = ({children}) => {

    return (
        <section className={'section'}>
            {children}
        </section>
    )
};

export default Sidebar;