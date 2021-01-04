import React from 'react';
import Button from "../Button/Button";

const Nav = () => {
    return (
        <nav>
            <Button className={'selected'} name={"Overview"} />
            <Button name={"Crop Library"} />
            <Button name={"Scheduler"} />
        </nav>
    )
}

export default Nav;