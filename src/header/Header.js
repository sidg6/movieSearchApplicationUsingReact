import React from 'react'
import "./header.css"

const header = () => {
    return (
        <header>
            <h1 tabIndex={0} className="heading">Welcome to Movies Search</h1>
        </header>
    );
}

export default header;