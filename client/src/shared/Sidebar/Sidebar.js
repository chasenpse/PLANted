import './Sidebar.css';
import Button from "../Button";

const Sidebar = ({children, title, selected, addHandler, saveHandler, cancelHandler, deleteHandler}) => {

    const display = () => {
        switch (selected) {
            case undefined:
                return null;
            case "new":
                return (
                    <>
                        <div className={'title'}>
                            <h2>{title}</h2>
                        </div>
                        <form className={'sidebar-form'}>
                            {children}
                            <Button type={'save'} text={'save'} handler={addHandler} />
                            <Button type={'cancel'} text={'cancel'} handler={cancelHandler} />
                            <Button type={'delete right'} text={'delete'} handler={deleteHandler} />
                        </form>
                    </>
                );
            default:
                return (
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
                );
        }
    }
    return (
        <section className={'section'}>
            {display()}
        </section>
    )
};

export default Sidebar;