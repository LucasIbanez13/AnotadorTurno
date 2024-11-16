import React from 'react';
import { format } from 'date-fns';
import { X, Calendar, Clock, User, Phone, CheckSquare } from 'lucide-react';
import { createWhatsAppMessage } from '../utils/whatsapp';

interface AppointmentFormProps {
  onSubmit: (data: {
    name: string;
    lastName: string;
    phone: string;
    confirmed: boolean;
  }) => void;
  onCancel: () => void;
  selectedDate: Date;
  selectedTime: string;
}

export default function AppointmentForm({
  onSubmit,
  onCancel,
  selectedDate,
  selectedTime,
}: AppointmentFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    phone: '',
    confirmed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    const whatsappUrl = createWhatsAppMessage({
      ...formData,
      date: selectedDate,
      time: selectedTime,
    });
    
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Reservar turno</h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-indigo-50 rounded-lg p-4 flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-indigo-900">Fecha y hora seleccionada</h3>
            <div className="mt-1 flex items-center space-x-4">
              <p className="text-sm text-indigo-700">
                {format(selectedDate, 'dd/MM/yyyy')}
              </p>
              <div className="flex items-center text-sm text-indigo-700">
                <Clock className="h-4 w-4 mr-1" />
                {selectedTime}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <User className="h-4 w-4 mr-2" />
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <User className="h-4 w-4 mr-2" />
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa tu apellido"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <Phone className="h-4 w-4 mr-2" />
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+54912345678"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
            <input
              type="checkbox"
              id="confirmed"
              name="confirmed"
              required
              checked={formData.confirmed}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="confirmed" className="flex items-center text-sm text-gray-700">
              <CheckSquare className="h-4 w-4 mr-2" />
              Confirmo mi presencia en el turno seleccionado
            </label>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Confirmar turno
          </button>
        </div>
      </div>
    </form>
  );
}