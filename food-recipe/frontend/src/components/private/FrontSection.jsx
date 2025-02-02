import React from "react";
import '../../styles/FrontSection.css'
import frontImage from '../../assets/images/FrontSection.png'

function FrontSection(){
    return(
        <div>
            <div className="front-image">
            <img src ={frontImage} alt="Front Image"/>
            </div>
        </div>
    )
}
export default FrontSection;