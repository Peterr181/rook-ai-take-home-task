import { FC, useState } from "react";
import { DeleteButton, ExpandButton } from "../common/Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "../../assets/icons/icons";
import { useCardStore } from "../../stores/useCardStore";

type CardProps = {
  id: number;
  title: string;
  description?: string;
  isVisible: boolean;
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
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium cursor-pointer" onClick={handleExpandClick}>
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
