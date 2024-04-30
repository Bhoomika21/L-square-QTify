import "./Album.css"
import Section from "../Card/Card"


const Album = () => {
    return(
        <section className="album_wrapper">
            <div className="container">
                <Section albumName="Top Albums" filterSongs="false" apiCall="https://qtify-backend-labs.crio.do/albums/top"/>

                <Section albumName="New Albums" filterSongs="false" apiCall="https://qtify-backend-labs.crio.do/albums/new"/>

                <Section albumName="Songs" filterSongs="true" apiCall="https://qtify-backend-labs.crio.do/songs"/>
                
            </div>
            
        </section>
    )
}

export default Album;