import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from 'lucide-react';
import { getNextFourWeeks, TIME_SLOTS, formatDate } from '../utils/dates';
import AppointmentForm from './AppointmentForm';
import { Appointment } from '../types';

interface CalendarProps {
  appointments: Appointment[];
  onAppointmentCreate: (appointment: Appointment) => void;
}

export default function Calendar({ appointments, onAppointmentCreate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  const dates = getNextFourWeeks();

  const isTimeSlotAvailable = (date: Date, time: string) => {
    return !appointments.some(
      (apt) =>
        format(apt.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') &&
        apt.time === time
    );
  };

  const handleTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: Omit<Appointment, 'id' | 'date' | 'time'>) => {
    if (!selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      time: selectedTime,
      ...formData,
    };

    onAppointmentCreate(newAppointment);
    setShowForm(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 bg-indigo-50 border-b border-indigo-100">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Calendario de Turnos</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {dates.map((date) => (
                <div
                  key={date.toISOString()}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-indigo-200 transition-colors"
                >
                  <div className="p-3 bg-gradient-to-br from-indigo-50 to-white border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-500">
                      {format(date, 'dd/MM/yyyy')}
                    </p>
                    <h3 className="text-base font-semibold text-gray-900 capitalize mt-1">
                      {formatDate(date)}
                    </h3>
                  </div>
                  <div className="p-3 space-y-2">
                    {TIME_SLOTS.map((slot) => {
                      const available = isTimeSlotAvailable(date, slot.time);
                      return (
                        <button
                          key={slot.time}
                          onClick={() => available && handleTimeSelect(date, slot.time)}
                          disabled={!available}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                            available
                              ? 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-600'
                              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <span className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{slot.label}</span>
                          </span>
                          {available ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Turno disponible</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <XCircle className="h-4 w-4 text-red-400" />
                <span className="text-gray-600">Turno ocupado</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Selecciona un horario disponible para agendar tu turno. Recibirás una confirmación por WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <AppointmentForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              selectedDate={selectedDate!}
              selectedTime={selectedTime!}
            />
          </div>
        </div>
      )}
    </div>
  );
}