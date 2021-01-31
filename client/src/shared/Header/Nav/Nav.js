import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <NavLink exact to={'/'} className={'navBtn'} activeClassName={'selected'}>
                <Button name={"Calendar"} />
            </NavLink>
            <NavLink exact to={'/library'} className={'navBtn'} activeClassName={'selected'}>
                <Button name={"Crop Library"} />
            </NavLink>
            <NavLink exact to={'/schedule'} className={'navBtn'} activeClassName={'selected'}>
                <Button name={"Scheduler"} />
            </NavLink>
        </nav>
    )
}

export default Nav;