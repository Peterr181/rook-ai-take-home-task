import { create } from "zustand";
import { ListItem } from "../api/getListData";

type DeletedListItem = {
  id: number;
  title: string;
  isVisible: boolean;
  isDeleted: boolean;
};

type StoreState = {
  deletedCards: DeletedListItem[];
  visibleCards: ListItem[];
  showDeletedCards: boolean;
  setVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (id: number, title: string, isVisible: boolean) => void;
  revealDeletedCards: () => void;
  hideDeletedCards: () => void;
};

export const useCardStore = create<StoreState>((set) => ({
  deletedCards: [],
  visibleCards: [],
  showDeletedCards: false,
  setVisibleCards: (cards: ListItem[]) => {
    set((state) => {
      const filteredCards = cards.filter(
        (card) =>
          !state.deletedCards.some((deletedCard) => deletedCard.id === card.id)
      );
      localStorage.setItem("visibleCards", JSON.stringify(filteredCards));
      return { visibleCards: filteredCards };
    });
  },
  deleteCard: (id: number, title: string, isVisible: boolean) => {
    set((state) => {
      const updatedDeletedCards = [
        ...state.deletedCards,
        { id, title, isVisible, isDeleted: true },
      ];
      const updatedVisibleCards = state.visibleCards.filter(
        (card) => card.id !== id
      );
      localStorage.setItem("deletedCards", JSON.stringify(updatedDeletedCards));
      localStorage.setItem("visibleCards", JSON.stringify(updatedVisibleCards));
      return {
        deletedCards: updatedDeletedCards,
        visibleCards: updatedVisibleCards,
      };
    });
  },
  revealDeletedCards: () => {
    set({ showDeletedCards: true });
    localStorage.setItem("showDeletedCards", "true");
  },
  hideDeletedCards: () => {
    set({ showDeletedCards: false });
    localStorage.setItem("showDeletedCards", "false");
  },
}));

export const loadStateFromLocalStorage = () => {
  const visibleCards = JSON.parse(localStorage.getItem("visibleCards") || "[]");
  const deletedCards = JSON.parse(localStorage.getItem("deletedCards") || "[]");
  const showDeletedCards = false;

  return { visibleCards, deletedCards, showDeletedCards };
};
