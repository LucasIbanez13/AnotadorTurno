import { addWeeks, eachDayOfInterval, format, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

export const TIME_SLOTS = [
  { time: '10:00', label: '10:00 AM' },
  { time: '12:00', label: '12:00 PM' },
  { time: '16:00', label: '4:00 PM' },
  { time: '18:00', label: '6:00 PM' },
];

export const getNextFourWeeks = () => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday
  const end = addWeeks(start, 4);

  return eachDayOfInterval({ start, end }).filter(
    (date) => ![0, 6].includes(date.getDay()) // Filter out weekends
  );
};

export const formatDate = (date: Date) => {
  return format(date, 'EEEE d MMM', { locale: es });
};