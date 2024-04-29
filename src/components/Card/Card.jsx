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

    useEffect (() => {
        axios
        .get(props.apiCall)
        .then(data => {
            // console.log(data.data);
            console.log(data.data[0].follows, data.data[0].image, data.data[0].title);
            setCards(data.data);
            return (data.data)
        })
        .catch(e => console.log(e));
    }, []);

    function viewDisplay(){
        setGridView(!gridView);
    }

    return(
        <>
            <div className="heading_div">
                <h2 className="album_name">{props.albumName}</h2>
                <button className="showall_btn" onClick={viewDisplay}>{gridView ? 'Collapse' : 'Show all'}</button>
            </div>

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
                    {cards.map((card) => (
                        <SwiperSlide>
                            <div className="single_card">
                                <div className="img_div">
                                    <a href={`https://qtify-backend-labs.crio.do/album/${card.slug}`}>
                                        <img key={card.id} src={card.image} alt="Card"/>
                                    </a>
                                    <p className="followers_div">
                                        <span>{card.follows} Followers</span>
                                    </p>
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