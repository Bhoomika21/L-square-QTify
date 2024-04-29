import "./headerButton.css"
import { useState } from "react"

export default function HeaderButton() {
    const [popup, setPopup] = useState(false);
    const popupOpen = () => {
        setPopup(!popup)
    }


    return (
        <>
            <button className="blackbtn" onClick={popupOpen}>
                Give Feedback
            </button>

            {popup ? (
                <div className="popup_wrap">
                    <div className="popupcontainer">
                        <h4>Feedback</h4>
                        <button className="close" onClick={() => setPopup(false)}>X</button>
                        <form>
                            <input type="text" placeholder="Full name" className="input_field" />
                            <input type="email" placeholder="Email ID" className="input_field" />
                            <input type="text" placeholder="Subject" className="input_field" />
                            <textarea placeholder="Description" className="input_field"></textarea>
                            <button type="submit">Submit Feedback</button>
                        </form>
                    </div>
                </div>
            ) : (
                null
            )}
        </>
    )
}