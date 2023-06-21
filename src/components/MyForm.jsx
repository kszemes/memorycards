import React from "react";
import { categories } from "../utils";
import { useRef } from "react";
import { selectedEmojis } from "../utils";

export const MyForm = ({ setGameState, setEmojis }) => {
  const sizeRef = useRef(null);
  const categRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!sizeRef.current.value || categRef.current.value == "0") return;

    //console.log('submit', sizeRef.current.value, categRef.current.value)
    setGameState({
      size: sizeRef.current.value,
      category: categRef.current.value,
      remaining: sizeRef.current.value**2/2,
      score: 0,
      won: false,
      running: false,
    });
    setEmojis(selectedEmojis(categRef.current.value, sizeRef.current.value))
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
        <div className="mr-1 mb-6">
          <label className="block" htmlFor="size">
            Game Size (2/4/6/8/10)
          </label>
          <input
            ref={sizeRef}
            className="rd-lg p-3"
            type="text"
            id="size"
            placeholder="square grid size"
            pattern="^(2|4|6|8|10)$"
          />
        </div>
        <div className="mr-1 mb-6">
          <label className="block" htmlFor="category">
            Select category
          </label>
          <select ref={categRef} className="rd-lg p-3" id="category">
            <option value="0">category...</option>
            {categories().map((ctg) => (
              <option key={ctg} value={ctg}>
                {ctg}
              </option>
            ))}
          </select>
        </div>
        <button className="btn">Start game</button>
      </form>
    </div>
  );
};
