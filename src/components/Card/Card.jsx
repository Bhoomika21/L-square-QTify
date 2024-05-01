import "./Card.css"
import axios from "axios";
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useState, useEffect } from "react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Card(props) {
    const [cards, setCards] = useState([])
    const [gridView, setGridView] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [toolTip, setToolTip] = useState("");
    

    useEffect (() => {
        axios
        .get(props.apiCall)
        .then(data => {
            // console.log(data.data);
            // console.log(data.data[0].follows, data.data[0].image, data.data[0].title);
            setCards(data.data);
            return (data.data)
        })
        .catch(e => console.log(e));
    }, []);

    const handleMouseOver = (index) => {
        // Update the tooltip state for the corresponding card
        setToolTip(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
        });
    }

    const handleMouseOut = (index) => {
        // Update the tooltip state for the corresponding card
        setToolTip(prevState => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
        });
    }

    useEffect(() => {
        axios.get('https://qtify-backend-labs.crio.do/genres')
        .then(data => {
            setGenres(data.data.data)
            return (data.data.data)
        })
        .catch(e => console.log(e))
    }, []);

    function viewDisplay(){
        setGridView(!gridView);
    }

    const selectGenre = (genre) => {
        setSelectedGenre(genre)
    }
    
    return(
        <>
            <div className="heading_div">
                <h2 className="album_name">{props.albumName}</h2>
                {props.filterSongs === "false" && 
                    <button className="showall_btn" onClick={viewDisplay}>{gridView ? 'Collapse' : 'Show all'}</button>
                }
            </div>

            {props.filterSongs === "true" && (
                <div className="tabHeading">
                    <button className={selectedGenre === "" ? "active" : ""} onClick={() => selectGenre("")}>All</button>
                    {genres.map(genre => (
                        <button 
                        key={genre.label}
                        onClick={() => selectGenre(genre.label)}
                        className={selectedGenre === genre.label ? "active" : ""}
                        >
                            {genre.label}
                        </button>
                    ))}
                </div>
            )}

            { gridView ? (
                <div className="grid-container">
                    {cards.map(card => (
                        <div key={card.id} className="single_card grid-item">
                            
                            <div className="img_div">
                                <a href={`https://qtify-backend-labs.crio.do/album/filthy-secretary/${card.slug}`}>
                                    <img key={card.id} src={card.image} alt="Card"/>
                                </a>                                
                                <p className="followers_div">
                                    <span>{card.follows} Followers</span>
                                </p>
                            </div>
                            
                            <p className="category">{card.title}</p>
                        </div>
                    ))}
                </div>
            ) : (                
                <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={40}
                slidesPerView={7}
                navigation
                scrollbar={{ draggable: true }}
                >
                    {cards
                    .filter(card => selectedGenre === "" || card.genre.label === selectedGenre)
                    .map((card, index) => (
                        <SwiperSlide>
                            <div className={`single_card`}
                            // onMouseOver={toolTipShow}
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseOut={() => handleMouseOut(index)}
                            >
                                {toolTip[index] && 
                                <div className="tooltip"> {/* Show tooltip only if corresponding state is true */}
                                    {card.songs && card.songs.length}
                                </div>}
                                <div className="img_div">
                                    <a href={`https://qtify-backend-labs.crio.do/album/${card.slug}`}>
                                        <img key={card.id} src={card.image} alt="Card"/>
                                    </a>
                                    {props.filterSongs === "false" ? 
                                        (<p className="followers_div">
                                            <span>{card.follows} Followers</span>
                                        </p>) : (
                                        <p className="followers_div">
                                            <span>{card.likes} likes</span>
                                            {/* <span>{card.genre.label}</span> */}
                                        </p>
                                    )}
                                </div>
                                <p className="category">{card.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                            
                </Swiper>
            )}
        </>
    )
}