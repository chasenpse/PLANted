import './Sidebar.css';
import Button from "../Button";

const Sidebar = ({children, title, selected, saveHandler, cancelHandler, deleteHandler}) => {
    return (
        <section className={'section'}>
            {
                selected !== "none" ?
                    (
                        <>
                            <div className={'title'}>
                                <h2>{title}</h2>
                            </div>
                            <form className={'sidebar-form'}>
                                {children}
                                <Button type={'save'} text={'save'} handler={saveHandler} />
                                <Button type={'cancel'} text={'cancel'} handler={cancelHandler} />
                                <Button type={'delete right'} text={'delete'} handler={deleteHandler} />
                            </form>
                        </>
                    ) : null
            }
        </section>
    )
};

export default Sidebar;