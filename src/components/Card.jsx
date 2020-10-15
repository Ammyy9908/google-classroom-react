import React from 'react'
import '../styles/Card.css'
function Card({name,teacher,teacherAvatar}) {
    return (
        <div className="card">
            <div className="card__header">
                <div className="header__top">
    <h1>{name}</h1>
                    <div className="header__bottom__popup" id="popup4">
                        <a href="#">Unenroll</a>
                        
                     </div>
                </div>
                <div className="header__bottom">
                    <p>{teacher}</p>
                    <div className="card__user">
                        <img src={teacherAvatar} alt=""/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Card
