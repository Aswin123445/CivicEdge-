import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../validators';
import { useNavigate } from 'react-router-dom';

export default function SignInForm() {
  const { login, loginStatus, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    if (emailErr || passErr) {
      setLocalError(emailErr || passErr);
      return;
    }
    await login({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      {localError && <div className="text-red-600 text-sm">{localError}</div>}
      {loginStatus.error && (
        <div className="text-red-600 text-sm">{loginStatus.error?.data || loginStatus.error}</div>
      )}
      <button
        disabled={loginStatus.isLoading}
        className="w-full bg-blue-600 text-white rounded py-2"
      >
        {loginStatus.isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
