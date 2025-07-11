import ContactHeader from "./header";
import Form from "./form";
import { motion } from "framer-motion";

const Contact = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white md:backdrop-blur-sm flex flex-col drop-shadow-2xl rounded-2xl overflow-hidden"
      >
        <ContactHeader />
        <Form onClose={onClose} />
      </motion.div>
    </div>
  );
};

export default Contact;
