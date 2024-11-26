import { FC } from "react";

export type ToggleButtonProps = {
  onClick: () => void;
  isActive: boolean;
  activeText: string;
  inactiveText: string;
  className?: string;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  onClick,
  isActive,
  activeText,
  inactiveText,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1 ${className}`}
    >
      {isActive ? activeText : inactiveText}
    </button>
  );
};
