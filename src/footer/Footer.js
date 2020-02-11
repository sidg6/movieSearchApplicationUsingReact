import React from 'react';

const footer = (props) => {
    const keyPressed = (e) => {
        if (e.key === "Enter") {
            props.click();
        }
    }
    return (
        <footer className="footer">
            <i tabIndex={0} title="Change Theme Button" onKeyPress={(e) => keyPressed(e)} onClick={props.click} className={"fa fa-lightbulb-o " + props.darkThemeClass}></i>
        </footer>
    );
}

export default footer;