import clsx from "clsx";
import { memo } from "react";

function FilterListButton({ list, active, parentSelector }) {
  const { handleClick, buttonList } = list;
  return (
    <div>
      {buttonList.map((item, index) => {
        return (
          <button
            key={index}
            className={clsx("filter-btn", active === item.name ? "active" : "")}
            onClick={(e) => {
              if (active === item.name) return;
              document
                .querySelector(`${parentSelector} .active`)
                .classList.remove("active");
              e.target.classList.add("active");
              active = item.name;
              handleClick(item.path);
            }}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}

export default memo(FilterListButton);
