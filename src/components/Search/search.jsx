import "./search.css";
import SearchImage from '../../assets/search-icon.svg';

export default function Search(){
    return(
        <>
            <div className="search_container">
                <input placeholder="Search a album of your choice"/>
                <button>
                    <img src={SearchImage} alt="search icon"/>
                </button>
            </div>
        </>
    )
}