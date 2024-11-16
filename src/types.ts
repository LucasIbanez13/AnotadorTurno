export interface Appointment {
  id: string;
  date: Date;
  time: string;
  name: string;
  lastName: string;
  phone: string;
  confirmed: boolean;
}

export interface TimeSlot {
  time: string;
  label: string;
}