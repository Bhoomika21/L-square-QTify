import Logo from "../Logo/logo";
import Search from "../Search/search";
import HeaderButton from "../Header-Button/headerButton";
import './header.css';
export default function header(){
    return (
        <header>
            <div className="container">
                <Logo />
                <Search />
                <HeaderButton />
            </div>
        </header>
    )
}