import { HotelStatus } from "../../constants";

interface HotelStatusBadgeProps {
  status: HotelStatus;
}

export const HotelStatusBadge = ({ status }: HotelStatusBadgeProps) => {
  let className = "";
  let label = "";

  switch (status) {
    case HotelStatus.OPEN:
      className = "bg-green-500/90 text-white";
      label = "Open";
      break;

    case HotelStatus.CLOSED:
      className = "bg-red-500/90 text-white";
      label = "Closed";
      break;

    case HotelStatus.RENOVATION:
      className = "bg-amber-500/90 text-white";
      label = "Renovation";
      break;

    default:
      className = "bg-gray-400 text-white";
      label = status;
  }

  return (
    <div className="absolute top-3 left-3 z-10">
      <div className="relative group/status">
        <span
          className={`
            px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
            backdrop-blur shadow-sm transition
            ${className}
          `}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
