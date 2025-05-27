import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIconButton = () => {
  const phoneNumber = '98948 19272';
  const message = 'Hi! I want to chat!';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',             // reduced gap
        backgroundColor: '#25D366',
        color: 'white',
        padding: '6px 12px',    // reduced padding
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '14px'        // reduced font size
      }}
    >
      <FaWhatsapp size={14  } />  {/* reduced icon size */}
      WhatsApp Us
    </a>
  );
};

export default WhatsAppIconButton;
