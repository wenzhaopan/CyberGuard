import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EmailSubscription = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    return Boolean(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5001/add-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully subscribed to news updates!');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setEmail('');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to the server');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Mail className="h-4 w-4" />
        Subscribe to Updates
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Subscribe to Security Updates</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setStatus('idle');
              setEmail('');
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">
          Stay informed about the latest cybersecurity threats and receive important updates directly in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none text-gray-900"
              placeholder="your@email.com"
              disabled={status === 'loading'}
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              status === 'error' ? 'bg-red-50 text-red-700' : 
              status === 'success' ? 'bg-green-50 text-green-700' : ''
            }`}>
              {status === 'error' && <AlertCircle className="h-5 w-5" />}
              {status === 'success' && <CheckCircle className="h-5 w-5" />}
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="w-full py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailSubscription;
