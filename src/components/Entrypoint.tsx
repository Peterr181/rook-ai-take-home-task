import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import {
  useCardStore,
  loadStateFromLocalStorage,
} from "../stores/useCardStore";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const {
    visibleCards,
    setVisibleCards,
    deletedCards,
    showDeletedCards,
    revealDeletedCards,
  } = useCardStore();

  useEffect(() => {
    const { visibleCards, deletedCards } = loadStateFromLocalStorage();
    setVisibleCards(visibleCards);
    useCardStore.setState({ deletedCards, showDeletedCards: false });
  }, [setVisibleCards]);

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading, setVisibleCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg mt-3 ">
          My Awesome List ({visibleCards.length})
        </h1>

        <div className="flex flex-col gap-y-3 mt-3">
          {visibleCards.map((card, index) => (
            <Card
              key={`visible-${card.id}-${index}`}
              id={card.id}
              title={card.title}
              description={card.description}
              isVisible={card.isVisible}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg ">
            Deleted Cards ({deletedCards.length})
          </h1>
          <button
            onClick={revealDeletedCards}
            className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
          >
            Reveal
          </button>
        </div>
        <div
          className={`flex flex-col gap-y-3 transition-opacity duration-500 mt-3 ${
            showDeletedCards ? "opacity-100" : "opacity-0"
          }`}
        >
          {deletedCards.map((card, index) => (
            <Card
              key={`deleted-${card.id}-${index}`}
              id={card.id}
              title={card.title}
              isVisible={card.isVisible}
              isDeleted={card.isDeleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Entrypoint;
