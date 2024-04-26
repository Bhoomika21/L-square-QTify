import BannerImage from '../../assets/hero_headphones.png';
import "./Banner.css" 

export default function Banner(){
    return(
        <section className='banner_wrap'>
            <div className='container'>
                <h1>100 Thousand Songs, ad-free Over thousands podcast episodes</h1>
                <img src={BannerImage} alt="Headphone"/>
            </div>            
        </section>
    )
}