import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";

import { Spinner } from "../components/common/Spinner";
import {
  useCardStore,
  loadStateFromLocalStorage,
} from "../stores/useCardStore";
import CardList from "../components/Card/CardList";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const { refetch } = listQuery;
  const {
    visibleCards,
    setVisibleCards,
    deletedCards,
    showDeletedCards,
    revealDeletedCards,
    hideDeletedCards,
  } = useCardStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const { visibleCards, deletedCards } = loadStateFromLocalStorage();
    const filteredVisibleCards = visibleCards.filter(
      (card: { id: string }) =>
        !deletedCards.some(
          (deletedCard: { id: string }) => deletedCard.id === card.id
        )
    );
    setVisibleCards(filteredVisibleCards);
    useCardStore.setState({ deletedCards, showDeletedCards: false });
  }, [setVisibleCards]);

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    const filteredVisibleCards = (
      listQuery.data?.filter((item) => item.isVisible) ?? []
    ).filter(
      (card) => !deletedCards.some((deletedCard) => deletedCard.id === card.id)
    );

    setVisibleCards(filteredVisibleCards);
    setIsRefreshing(false);
  }, [listQuery.data, listQuery.isLoading, setVisibleCards, deletedCards]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
  };

  const handleToggleDeletedCards = () => {
    if (showDeletedCards) {
      hideDeletedCards();
    } else {
      revealDeletedCards();
    }
  };

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex lg:flex-row flex-col gap-x-16">
      <CardList
        title="My Awesome List"
        cards={visibleCards}
        isRefreshing={isRefreshing}
        toggleButtonProps={{
          onClick: handleRefresh,
          isActive: isRefreshing,
          activeText: "Refreshing...",
          inactiveText: "Refresh",
        }}
        loading={listQuery.isLoading}
        fixedHeight
      />
      <CardList
        title="Deleted Cards"
        cards={deletedCards}
        isRefreshing={!showDeletedCards}
        toggleButtonProps={{
          onClick: handleToggleDeletedCards,
          isActive: showDeletedCards,
          activeText: "Hide",
          inactiveText: "Reveal",
        }}
        loading={listQuery.isLoading}
        fixedHeight
      />
    </div>
  );
};

export default Entrypoint;
