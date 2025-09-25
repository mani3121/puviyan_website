import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_m73cz7e';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_mxugw58';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'DC-AUxWF_PZKhnpao';

if (PUBLIC_KEY) {
  try {
    emailjs.init(PUBLIC_KEY);
  } catch (err) {
    console.error('EmailJS init failed:', err);
  }
} else {
  console.error('EmailJS PUBLIC_KEY is missing!');
}

export const handleProductSubmit = async ({
  e,
  formData,
  setIsLoading,
  setSubmitStatus,
  setFormData,
  setShowForm,
}) => {
  e.preventDefault();
  e.stopPropagation();

  // basic client-side validation
  if (!formData?.name || !formData?.email || !formData?.message) {
    setSubmitStatus('validation_error');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setSubmitStatus('invalid_email');
    return;
  }

  setIsLoading(true);

  try {
    // Map template variables exactly as defined in your EmailJS template
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Puviyan Team', // Add recipient name
      reply_to: formData.email,
    };

    console.log('Sending email with params:', templateParams);
    console.log('Using service:', SERVICE_ID, 'template:', TEMPLATE_ID);

    // Use send() after init(PUBLIC_KEY) — do not pass an email address as user id
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('EmailJS send result:', result);

    if (result.status === 200) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setShowForm(false);
      console.log('Email sent successfully!');
    } else {
      console.error('Unexpected result status:', result.status);
      setSubmitStatus('error');
    }
  } catch (error) {
    console.error('EmailJS error details:', {
      error: error,
      status: error?.status,
      text: error?.text,
      message: error?.message,
      stack: error?.stack
    });
    
    // More specific error handling
    if (error?.status === 422) {
      console.error('Template or service configuration error');
    } else if (error?.status === 400) {
      console.error('Bad request - check template parameters');
    } else if (error?.status === 403) {
      console.error('Forbidden - check your EmailJS credentials');
    }
    
    setSubmitStatus('error');
  } finally {
    setIsLoading(false);
  }
};