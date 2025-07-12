import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Form = ({ onClose }: { onClose?: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        'service_rhngt5h',
        'template_30c1qnc',
        formRef.current!,
        'Wrykb51H_UdQUJg80'
      );
      toast.success('Message sent successfully!', {
        position: 'top-left',
        autoClose: 3000,
        toastId: 'form-success',
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      if (onClose) {
        setTimeout(onClose, 500);
      }
    } catch {
      toast.error('Failed to send message. Please try again.', {
        position: 'top-left',
        autoClose: 3000,
        toastId: 'form-error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center flex-col justify-center px-4 bg-primary">
      <form ref={formRef} onSubmit={submitForm} className="mb-6 w-full flex itemx-center justify-center gap-y-3 flex-col">
        <div className="mb-6">
          <input
            type="text"
            name="user_name"
            className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            name="user_email"
            className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
            placeholder="Email ID"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            name="subject"
            className="form-control block w-full px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <textarea
            name="message"
            className="form-control block w-full min-h-[25vh] px-4 py-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-red-600 hover:bg-red-700 w-full focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 block disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      <p className="mb-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400">
        <a href="mailto:relishers@gmail.com" className="hover:underline">
          relishers@gmail.com
        </a>
      </p>
      <p className="text-sm cursor-pointer text-gray-500 dark:text-gray-400">
        <a href="tel:+19876541201" className="hover:underline">
          +1 987 654 1201
        </a>
      </p>
    </div>
  );
};

export default Form;
