import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_m73cz7e';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_mxugw58';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'DC-AUxWF_PZKhnpao';

// initialize once with the EmailJS public key
if (PUBLIC_KEY && PUBLIC_KEY !== 'DC-AUxWF_PZKhnpao') {
  try {
    emailjs.init(PUBLIC_KEY);
  } catch (err) {
    // safe to ignore in dev, but log for debugging
    // console.warn('EmailJS init failed', err);
  }
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
      // add required template variables here, for example:
      // reply_to: formData.email,
      // subject: formData.subject,
    };

    // Use send() after init(PUBLIC_KEY) — do not pass an email address as user id
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('EmailJS send result:', result);

    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setShowForm(false);
  } catch (error) {
    console.error('EmailJS error:', error);
    // If server responded with details, log them for debugging
    if (error && error.status) console.error('status:', error.status);
    if (error && error.text) console.error('text:', error.text);
    setSubmitStatus('error');
  } finally {
    setIsLoading(false);
  }
};