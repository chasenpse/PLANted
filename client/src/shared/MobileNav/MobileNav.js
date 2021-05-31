import './MobileNav.css'

const MobileNav = ({menu}) =>
    <span
        className={"drawerToggle"}
        onClick={(e)=> {
            e.preventDefault();
            menu.setNavOpen(!menu.navOpen)}
        }
    >
        <span />
        <span />
        <span />
    </span>

export default MobileNav;