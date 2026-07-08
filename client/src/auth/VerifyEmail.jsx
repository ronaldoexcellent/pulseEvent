import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get('token');
  const navigate = useNavigate();

  // Initialize the textbox with the token from the URL if it exists
  const [tokenInput, setTokenInput] = useState(urlToken || '');
  const [statusMsg, setStatusMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!tokenInput) {
      setStatusMsg('Please enter a valid verification token.');
      setIsSuccess(false);
      return;
    }

    // Disable textbox and button
    setIsLoading(true);
    setStatusMsg('');
    const toastId = toast.loading('Verifying your email...');

    try {
      // Using the endpoint and GET method from your first code
      const response = await axios.get(`/api/auth/verify-email?token=${tokenInput}`, {
        withCredentials: true
      });

      if (response.status === 201) {
        setIsSuccess(true);
        const successMsg = 'Your email has been successfully verified!';
        setStatusMsg(successMsg + ' Redirecting to dashboard...');
        toast.success(successMsg, { id: toastId });
        
        // Redirect after 3 seconds
        setTimeout(() => navigate('/dashboard'), 3000); 
      }
    } catch (error) {
      // Re-enable textbox and button on error
      setIsSuccess(false);
      const errorMsg = error.response?.data?.message || 'Verification failed. The token may have expired.';
      setStatusMsg(errorMsg);
      toast.error(errorMsg, { id: toastId });
    } finally {
      // This ensures the loading state ends, re-enabling the input if isSuccess is false
      setIsLoading(false);
    }
  };

  return (
    // Light Gray Background: #f7f7fa
    <div className="flex items-center justify-center min-h-screen bg-pulse-bg-light p-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Background White, Gray-800 text */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center text-gray-800 border-t-4 border-pulse-purple-primary">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold mb-2 text-gray-900">Verify Your Email</h2>
          <p className="text-sm text-gray-500">
            Enter your verification token to continue.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter Token"
              disabled={isLoading || isSuccess} // Disables input during load or after success
              className="w-full text-center text-xl tracking-[0.2em] font-bold p-4 border border-gray-300 rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-[#c13ac7] focus:border-[#c13ac7] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || isSuccess} // Keeps button disabled on success as well
            className="w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                       bg-gradient-to-r from-pulse-purple-primary via-pulse-gradient-blend to-pulse-pink-primary 
                       hover:from-pulse-purple-secondary hover:to-pulse-pink-accent 
                       disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        {/* Status Message Display */}
        {statusMsg && (
          <div className={`mt-6 p-3 rounded-lg text-sm font-medium ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;