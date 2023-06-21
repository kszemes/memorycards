import React, {useState} from 'react'
import {emojis} from "../utils.js";

export const Board = ({emojis, setEmojies, gameState, setGameState}) => {

    const [previous, setPrevious] = useState(null);

    const containerStyle = {
        gridTemplateColumns: `repeat(${gameState.size}, auto)`
    }

    const showHide = (domObj) => {
        console.log(domObj.children[0], domObj.children[1]);
        [domObj.children[0], domObj.children[1]].forEach(domObj => {
            domObj.classList.toggle('hidden');
            domObj.classList.toggle('flex');
        })
    }

    const handleClick = (event, obj) => {
        const id = obj.id;
        console.log(id, event.target.parentNode);
        const parent = event.target.parentNode;
        showHide(parent);
        if (previous) {
            console.log(`Második kattintás!, ${obj.emoji}, ${previous.children[0].innerHTML}`);
            if (obj.emoji === previous.children[0].innerHTML) {
                setEmojies(emojis.map(obj => obj.id === id ? {...obj, disabled: true} : obj));
                setPrevious(null);
            } else {
                setGameState({...gameState, running: true});
                setTimeout(() => {
                    setGameState({...gameState, running: false});
                    showHide(parent);
                    showHide(previous);
                    setEmojies(emojis.map(obj => obj.id === id || obj.id === previous.id ? {
                        ...obj,
                        disabled: false
                    } : obj));
                    setPrevious(null);
                }, 500)
            }
        } else {
            setPrevious(parent);
            setEmojies(emojis.map(obj => obj.id === id ? {...obj, disabled: true} : obj));
        }
    };

    return (
        <div className='grid justify-center gap-2' style={containerStyle}>
            {emojis.map((obj) =>
                <div key={obj.id} id={obj.id} onClick={event => obj.disabled ? null : handleClick(event, obj)}>
                    <div className={gameState.size <= 4 ? "s4 hidden" : "s8 hidden"}>{obj.emoji}</div>
                    <div className={gameState.size <= 4 ? "s4 flex" : "s8 flex"}>?</div>
                </div>
            )}
        </div>
    )
}