import { Card } from "./Card";
import { ToggleButton, ToggleButtonProps } from "../common/ToggleButton";

interface CardProps {
  id: number;
  title: string;
  description?: string;
  isVisible: boolean;
  isDeleted?: boolean;
}

interface CardListProps {
  title: string;
  cards: CardProps[];
  isRefreshing: boolean;
  toggleButtonProps: ToggleButtonProps;
  loading: boolean;
  fixedHeight?: boolean;
}

const CardList: React.FC<CardListProps> = ({
  title,
  cards,
  isRefreshing,
  toggleButtonProps,
  loading,
  fixedHeight,
}) => (
  <div className="w-full max-w-xl">
    <div className="flex items-center justify-between">
      <h1 className=" font-medium text-lg ">
        {title} ({cards.length})
      </h1>
      <div>
        <ToggleButton {...toggleButtonProps} />
      </div>
    </div>
    <div
      className={`flex flex-col gap-y-3 mt-3 transition-opacity duration-500 ${
        isRefreshing ? "opacity-0" : "opacity-100"
      } ${fixedHeight ? "h-96 " : ""}`}
    >
      {loading ? (
        <p>Loading...</p>
      ) : cards.length === 0 ? (
        <p>No available items in the list</p>
      ) : (
        cards.map((card, index) => (
          <Card
            key={`${title.toLowerCase().replace(" ", "-")}-${card.id}-${index}`}
            {...card}
          />
        ))
      )}
    </div>
  </div>
);

export default CardList;
