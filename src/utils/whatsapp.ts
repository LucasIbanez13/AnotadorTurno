// Business owner's WhatsApp number (replace with the actual number)
export const BUSINESS_WHATSAPP = '+543812018090';

export const createWhatsAppMessage = (appointmentData: {
  name: string;
  lastName: string;
  phone: string;
  date: Date;
  time: string;
}) => {
  const message = `Confirmo turno.\n\n` +
    `📅 Fecha: ${new Intl.DateTimeFormat('es-AR', { dateStyle: 'full' }).format(appointmentData.date)}\n` +
    `🕒 Hora: ${appointmentData.time}\n\n` +
    `👤 Datos del cliente:\n` +
    `- Nombre: ${appointmentData.name}\n` +
    `- Apellido: ${appointmentData.lastName}\n` +
    `- Teléfono: ${appointmentData.phone}`;

  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
};