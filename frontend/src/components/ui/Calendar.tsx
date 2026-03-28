import React, { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookingDate } from "../../types/booking";

dayjs.extend(isBetween);

type CalendarProps = {
  bookings?: BookingDate[];
};

const Calendar: React.FC<CalendarProps> = ({ bookings = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const calendarDays = useMemo(() => {
    const startOfMonth = currentMonth.startOf("month");
    const daysInMonth = currentMonth.daysInMonth();
    const firstDay = startOfMonth.day();

    const days: (Dayjs | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 0; i < daysInMonth; i++) {
      days.push(startOfMonth.add(i, "day"));
    }

    return days;
  }, [currentMonth]);

  const isBooked = (date: Dayjs) => {
    return bookings.some((b) =>
      date.isBetween(
        dayjs(b.checkIn),
        dayjs(b.checkOut),
        "day",
        "[)",
      ),
    );
  };

  const goPrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const goNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  return (
    <div className="w-full mx-auto">
      {/* Header + Arrow */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goPrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <h2 className="text-lg md:text-xl font-semibold">
          {currentMonth.format("MMM YYYY")}
        </h2>

        <button
          onClick={goNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 text-center text-xs md:text-sm font-medium text-gray-500 mb-2">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {calendarDays.map((day, index) => {
          if (!day) return <div key={index} />;

          const isToday = day.isSame(dayjs(), "day");
          const booked = isBooked(day);

          return (
            <div
              key={index}
              className={`
                flex items-center justify-center
                h-10 md:h-12
                rounded-lg text-sm md:text-base
                transition-all duration-200

                ${
                  booked
                    ? "opacity-30 bg-gray-200 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200"
                }

                ${isToday && !booked ? "bg-indigo-200" : ""}
              `}
            >
              {day.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;