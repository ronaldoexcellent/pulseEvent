import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('Verifying your email...');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus('Invalid verification link.');
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.post('http://localhost:5000/api/verify-email', { token });
        setStatus('Email verified successfully! Redirecting to login...');
        setTimeout(() => navigate('/signin'), 3000); // Send them to login after 3s
      } catch (error) {
        setStatus(error.response?.data?.message || 'Verification failed. Link may be expired.');
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold">{status}</h2>
      </div>
    </div>
  );
}