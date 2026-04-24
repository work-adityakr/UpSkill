import ContactUsForm from "../ContactUsPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-3 py-20 text-center">
      <h1 className="text-5xl font-extrabold tracking-tighter text-white">
        Get in <span className="bg-gradient-to-r from-primary-50 to-blue-200 bg-clip-text text-transparent italic">Touch</span>
      </h1>
      <p className="max-w-[600px] text-lg font-medium text-richblack-300 italic">
        We'd love to hear from you. Whether you're curious about features, a free trial, or even press—we're ready to answer any questions.
      </p>

      <div className="mt-12 w-full">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
