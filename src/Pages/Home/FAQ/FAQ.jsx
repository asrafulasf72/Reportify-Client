import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Reportify?",
    answer:
      "Reportify is a community-driven civic platform that empowers citizens to report local issues such as road damage, waste management problems, and public safety concerns while tracking their resolution transparently.",
  },
  {
    question: "Who can report an issue?",
    answer:
      "Any registered user can report an issue. Simply create an account, log in, and submit reports with location details, descriptions, and supporting images.",
  },
  {
    question: "How do I track my reported issues?",
    answer:
      "Each reported issue appears in your dashboard where you can monitor real-time status updates such as pending, in progress, or resolved.",
  },
  {
    question: "Can I upload images while reporting?",
    answer:
      "Yes. Uploading images helps authorities and volunteers better understand the issue and take faster, more effective action.",
  },
  {
    question: "Is Reportify free to use?",
    answer:
      "Reportify offers a free tier that allows users to post up to three issues at no cost. For users who want to report more issues or boost their reports for higher visibility and priority, premium options are available. This model helps us keep the platform sustainable while ensuring fair access for everyone.",
  },
  {
    question: "Who resolves the reported issues?",
    answer:
      "Issues may be resolved by local authorities, NGOs, or community volunteers depending on the category and location of the report.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative bg-linear-to-b from-teal-100 to-green py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Clear answers to common questions about reporting, tracking, and
            resolving community issues using Reportify.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`rounded-2xl border backdrop-blur-md transition-all ${
                  isOpen
                    ? "bg-white shadow-xl border-primary/30"
                    : "bg-white/70 hover:shadow-md"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg md:text-xl font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary"
                  >
                    <ChevronDown size={24} />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
