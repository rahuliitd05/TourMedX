import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { postResource } from '../services/api';

function formatLoginError(error) {
  const status = error?.response?.status;
  const backendMessage =
    error?.response?.data?.message || error?.message || 'Unknown error';

  if (status) {
    return `Sign in failed (${status}): ${backendMessage}`;
  }

  return `Sign in failed: ${backendMessage}`;
}

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!form.email || !form.password) {
      setMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await postResource('/auth/login', form);
      login(response.token);
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setMessage(formatLoginError(error));
    }
  }

  return (
    <div className="tmx-auth-page">
      <Card
        className="tmx-auth-card"
        title="Admin Login"
        description="Securely sign in to manage TourMedX content."
      >
        <form className="tmx-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              required
            />
          </label>
          <div className="tmx-form__actions">
            <Button type="submit">Sign In</Button>
            {message ? <p className="tmx-form__status">{message}</p> : null}
          </div>
        </form>
      </Card>
    </div>
  );
}
