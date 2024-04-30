import "./Faq.css"
import axios from "axios";
import { useState, useEffect } from "react"
// import downArrow from "../../assets/downArrow.png"
export default function Faq(){

    const [faqs, setFaqs] = useState([])

    // function closeOtherDrawers (event) {
    //     event = event || window.event;
    //     thisDrawer = event.target;
    //     drawers = document.querySelectorAll(`.drawers input`);
    //     drawers.forEach(drawer => {
    //       if (drawer != thisDrawer) drawer.checked=false;
    //     })
    // }

    function closeOtherDrawers(){

    }

    useEffect (() => {
        axios
        .get("https://qtify-backend-labs.crio.do/faq")
        .then(data => {
            // console.log(data.data.data);
            // console.log(data.data.data[0].question, data.data.data[0].answer);
            setFaqs(data.data.data)
            return (data.data.data)
        })
        .catch(e => console.log(e));
    }, []);

    const toggleAccordion = (index) =>{
        const updatedFaqs = faqs.map((faq, i) => {
            if (i === index) {
                return { ...faq, isOpen: !faq.isOpen };
            } else {
                return { ...faq, isOpen: false };
            }
        });
        setFaqs(updatedFaqs);
    }

    

    return(
        <div className="faq_wrapper">
            <div className="container">            
                <h2>FAQs</h2>

                <div className="outer">
                    {faqs.map((faq, index) => (
                        <div className="single_faq" key={index}>
                            <button
                                className={`faq_question ${
                                    faq.isOpen ? "active" : ""
                                }`}
                                onClick={() => toggleAccordion(index)}
                            >
                                {faq.question}
                            </button>
                            {faq.isOpen && <p className="faq_ans">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}