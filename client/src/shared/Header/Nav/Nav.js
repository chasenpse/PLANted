import Button from "./Button/Button";
import { NavLink } from "react-router-dom";

const Nav = ({close}) => {
    return (
        <nav>
            <NavLink exact to={'/'} className={'navBtn'} activeClassName={'selected'}>
                <Button name={"Calendar"} action={close} />
            </NavLink>
            <NavLink exact to={'/library'} className={'navBtn'} activeClassName={'selected'}>
                <Button name={"Crop Library"} action={close} />
            </NavLink>
            <NavLink exact to={'/schedule'} className={'navBtn'} activeClassName={'selected'}>
                <Button name={"Scheduler"} action={close} />
            </NavLink>
        </nav>
    )
}

export default Nav;