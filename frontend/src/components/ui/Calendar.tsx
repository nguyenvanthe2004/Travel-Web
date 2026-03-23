import React, { useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { BookingDate } from "../../types/booking";

dayjs.extend(isBetween);

type CalendarProps = {
  bookings?: BookingDate[];
};

const Calendar: React.FC<CalendarProps> = ({ bookings = [] }) => {
  const now = dayjs();

  const calendarDays = useMemo(() => {
    const startOfMonth = now.startOf("month");
    const daysInMonth = now.daysInMonth();
    const firstDay = startOfMonth.day();

    const days: (Dayjs | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 0; i < daysInMonth; i++) {
      days.push(startOfMonth.add(i, "day"));
    }

    return days;
  }, [now]);

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

  return (
    <div className="w-full mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">
          {now.format("MMM YYYY")}
        </h2>
      </div>

      <div className="grid grid-cols-7 text-center text-xs md:text-sm font-medium text-gray-500 mb-2">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

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
