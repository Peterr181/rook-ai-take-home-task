import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useCardStore } from "../stores/useCardStore";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
  isVisible: ListItem["isVisible"];
  isDeleted?: boolean;
};

export const Card: FC<CardProps> = ({
  id,
  title,
  description,
  isVisible,
  isDeleted,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deleteCard = useCardStore((state) => state.deleteCard);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteClick = () => {
    deleteCard(id, title, isVisible);
  };

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5 ">
        <div className="cursor-pointer flex justify-between items-center w-full">
          <h1 className="font-medium " onClick={handleExpandClick}>
            {title}
          </h1>
          {isVisible && !isDeleted && (
            <div className="flex items-center">
              <ExpandButton onClick={handleExpandClick}>
                <div className="transition-transform duration-300">
                  {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>
              </ExpandButton>
              <DeleteButton onClick={handleDeleteClick} />
            </div>
          )}
        </div>
      </div>
      {description && isVisible && (
        <div
          className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-40" : "max-h-0"
          }`}
        >
          <p className="text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};
