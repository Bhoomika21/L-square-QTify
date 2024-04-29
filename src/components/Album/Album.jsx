import "./Album.css"
import Section from "../Card/Card"


const Album = () => {
    return(
        <section className="album_wrapper">
            <div className="container">
                <Section albumName="Top Albums" apiCall="https://qtify-backend-labs.crio.do/albums/top"/>

                <Section albumName="New Albums" apiCall="https://qtify-backend-labs.crio.do/albums/new"/>
                
            </div>
            
        </section>
    )
}

export default Album;