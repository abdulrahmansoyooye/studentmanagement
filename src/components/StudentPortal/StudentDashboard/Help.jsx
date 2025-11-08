import React from "react";
import { HelpCircle, Mail, MessageSquare, Phone, BookOpen, Globe } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I request for my ID card?",
      answer:
        "After logging into your account, go to the ID Card section and click on 'Request ID Card'. Once your request is approved by the admin, you will be notified and can download your card and QR code.",
    },
    {
      question: "My ID card status shows 'Pending'. What does that mean?",
      answer:
        "This means your request has been received and is awaiting administrative approval. You will receive a notification once it's approved or rejected.",
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer:
        "On the login page, click 'Forgot password?' and follow the instructions. You’ll receive an email with a secure reset link.",
    },
    {
      question: "Why can't I see my ID details?",
      answer:
        "Your ID card details will only appear after your request has been approved. Please check back later or contact support if it takes longer than expected.",
    },
    {
      question: "Who should I contact for technical issues?",
      answer:
        "For technical issues like login errors or bugs, contact the IT support team using the contact form or any of the channels below.",
    },
  ];

  const contacts = [
    {
      icon: <Mail className="w-5 h-5 text-blue-600" />,
      title: "Email Support",
      detail: "support@newgateuniversity.edu.ng",
      link: "mailto:support@newgateuniversity.edu.ng",
    },
    {
      icon: <Phone className="w-5 h-5 text-blue-600" />,
      title: "Phone Support",
      detail: "+234 901 234 5678",
      link: "tel:+2349012345678",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      title: "Live Chat",
      detail: "Chat with our support team",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      {/* Header Section */}
      <section className="max-w-4xl w-full mb-12 text-center">
        <div className="flex justify-center mb-4">
          <HelpCircle className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Need Help?</h1>
        <p className="text-gray-600 text-lg">
          We’re here to assist you with ID card requests, login issues, or general inquiries.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl w-full mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <summary className="cursor-pointer font-medium text-gray-800 p-4 flex justify-between items-center">
                {faq.question}
              </summary>
              <p className="text-gray-600 p-4 border-t border-gray-100">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex justify-center items-center gap-2">
          <Globe className="w-6 h-6 text-blue-600" />
          Contact Support
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-full">{contact.icon}</div>
                <h3 className="font-semibold text-gray-800">{contact.title}</h3>
                <p className="text-gray-600 text-sm group-hover:text-blue-600 transition">
                  {contact.detail}
                </p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-10">
          Need more assistance? Visit the{" "}
          <a
            href="https://www.newgateuniversity.edu.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            official university website
          </a>{" "}
          or stop by the ICT Department.
        </p>
      </section>
    </div>
  );
};

export default Help;
