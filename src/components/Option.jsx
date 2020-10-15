import React from 'react'
import '../styles/option.css'


function Option({Icon,text}) {
    return (
        <div className="option">
            <p>{text}</p>
        </div>
    )
}

export default Option
