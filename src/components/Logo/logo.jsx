import LogoImage from '../../assets/logo.png';
import "./logo.css"

function logo(){
    return(
        <>
            <a href='#'>
                <img className='logo_img' src={LogoImage} alt="Logo"/>
            </a>
        </>
    )
}
export default logo;