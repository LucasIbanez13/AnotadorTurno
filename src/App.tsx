import React from 'react';
import Calendar from './components/Calendar';
import { Appointment } from './types';
import { Clock } from 'lucide-react';

function App() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);

  const handleAppointmentCreate = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Turnos</h1>
              <p className="text-sm text-gray-500">Agenda tu cita de manera simple y rápida</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Calendar
          appointments={appointments}
          onAppointmentCreate={handleAppointmentCreate}
        />
      </main>
    </div>
  );
}

export default App;