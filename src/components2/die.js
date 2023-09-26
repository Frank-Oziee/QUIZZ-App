import React from "react";

export default function Die(props) {
//Dynamically styling the component here instead of via CSS:
const styles = {
    backgroundColor: props.style ? "#008000" : "#ffffff",
}

//NOTE: To use the above 'styling' object to set the styles in any HTML element here in 'React.js', you must use it inside of a 
//CSS 'style={styles}' attribute in the Element, else it won't work.

//Received the 'holdDie' props, housing the assigned unique 'id' to each element, and assigning it('holdDie') to each element 'onclick' of each.
    return (
        <div className= "die--face" 
        onClick={props.holdDie}
        style={styles}>
            <h2 >{props.value} </h2>
        </div>
    )
}