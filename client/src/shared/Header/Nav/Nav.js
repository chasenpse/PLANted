import Button from "./Button/Button";
import { NavLink } from "react-router-dom";

const Nav = ({close}) => {
    return (
        <nav>
            <NavLink exact to={'/calendar'} activeClassName={'selected'}>
                <Button name={"Calendar"} action={close} />
            </NavLink>
            <NavLink exact to={'/library'} activeClassName={'selected'}>
                <Button name={"Crop Library"} action={close} />
            </NavLink>
            <NavLink exact to={'/schedule'} activeClassName={'selected'}>
                <Button name={"Scheduler"} action={close} />
            </NavLink>
        </nav>
    )
}

export default Nav;