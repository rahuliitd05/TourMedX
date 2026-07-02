import { useState } from 'react';
import Button from '../ui/Button';

const initialState = {
  name: '',
  email: '',
  phone: '',
  country: '',
  treatment: '',
  message: ''
};

export default function ContactForm({ onSubmit, submitLabel = 'Submit' }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    await onSubmit?.(form);
    setStatus('Your request has been received.');
    setForm(initialState);
  }

  return (
    <form className="tmx-form" onSubmit={handleSubmit}>
      <div className="tmx-grid tmx-grid--2">
        <label>
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            required
          />
        </label>
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
          <span>Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            required
          />
        </label>
        <label>
          <span>Country</span>
          <input
            name="country"
            value={form.country}
            onChange={updateField}
            required
          />
        </label>
      </div>
      <label>
        <span>Treatment</span>
        <input
          name="treatment"
          value={form.treatment}
          onChange={updateField}
          required
        />
      </label>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={updateField}
          required
        />
      </label>
      <div className="tmx-form__actions">
        <Button type="submit">{submitLabel}</Button>
        {status ? <p className="tmx-form__status">{status}</p> : null}
      </div>
    </form>
  );
}
