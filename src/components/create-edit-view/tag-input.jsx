import { useState } from "react";
import { Tag } from "./tag";

export const TagInput = ({tags, setTags}) => {
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (i) => {
    console.log("index: " + i);
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  }

  return (
    <>
      <div className="tag-container">
        {tags.map((tag, index) => {
          return <Tag key={index} content={tag} handleDelete={handleDelete} index={index} />
        })}
        
      </div>
      <input className="tag-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add tag"
      />
    </>
  )
}