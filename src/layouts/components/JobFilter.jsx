import React, { useState } from "react";

const JobFilter = ({ text, options, show, setShow }) => {
  const [selected, setSelected] = useState(text);
  return (
    <div onClick={() => setShow(!show)} className="dropdown">
      <a
        className={
          show
            ? "btn dropdown-toggle datePosted filter show"
            : "btn dropdown-toggle datePosted filter"
        }
        role="button"
      >
        {selected}
      </a>

      <ul
        className={
          show ? "dropdown-menu content show" : "dropdown-menu content"
        }
        aria-labelledby="dropdownMenuLink"
      >
        {options.map((option, key) => {
          return (
            <li
              onClick={() => {
                setShow(!show);
                setSelected(option);
              }}
            >
              <a className="dropdown-item" href="#">
                {option}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JobFilter;
