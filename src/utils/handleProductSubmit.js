import emailjs from '@emailjs/browser';

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
  setIsLoading(true);

  try {
    emailjs.init("d1YGFS1dDCmPJB0N4");

    await emailjs.send(
      "service_m73cz7e",
      "template_mxugw58",
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "reachpuviyan@gmail.com",
      }
    );

    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setShowForm(false);
  } catch (error) {
    console.error('Error:', error);
    setSubmitStatus('error');
  } finally {
    setIsLoading(false);
  }
};