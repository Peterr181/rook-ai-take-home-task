import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
};

export const Card: FC<CardProps> = ({ title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium cursor-pointer" onClick={handleExpandClick}>
          {title}
        </h1>
        <div className="flex">
          <ExpandButton onClick={handleExpandClick}>
            <div className="transition-transform duration-300">
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
          </ExpandButton>
          <DeleteButton />
        </div>
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
