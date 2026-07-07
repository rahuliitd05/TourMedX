import { useEffect, useMemo, useState } from 'react';
import { deleteResource, postResource, putResource } from '../../services/api';
import { useResource } from '../../hooks/useResource';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

function getInitialForm(fields) {
  return fields.reduce(
    (accumulator, field) => ({
      ...accumulator,
      [field.name]: field.multiple ? [] : ''
    }),
    {}
  );
}

export default function AdminResourceManager({
  title,
  endpoint,
  fallbackData,
  fields,
  searchFields = []
}) {
  const { data, loading, error, setData } = useResource(endpoint, fallbackData);
  const [query, setQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(() => getInitialForm(fields));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editingItem) {
      const nextForm = fields.reduce((accumulator, field) => {
        const value = editingItem[field.name];

        // Serialize FAQ-style arrays [{question, answer}] → "Q|A" lines for the textarea
        if (field.type === 'textarea' && Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object') {
            accumulator[field.name] = value
              .map((item) => `${item.question || ''}|${item.answer || ''}`)
              .join('\n');
          } else {
            accumulator[field.name] = value.join('\n');
          }
        } else {
          accumulator[field.name] = value ?? (field.multiple ? [] : '');
        }

        return accumulator;
      }, {});
      setForm(nextForm);
    }
  }, [editingItem, fields]);

  // Reset form and message state when the module/endpoint changes
  useEffect(() => {
    resetForm();
    setQuery('');
    setMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const filteredData = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    if (!lowerQuery) {
      return data;
    }

    return data.filter((item) =>
      searchFields.some((field) =>
        String(item[field] ?? '')
          .toLowerCase()
          .includes(lowerQuery)
      )
    );
  }, [data, query, searchFields]);

  function updateField(event) {
    const { name, value, type, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'file' ? files[0] : value
    }));
  }

  function resetForm() {
    setEditingItem(null);
    setForm(getInitialForm(fields));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const hasFileField = fields.some((field) => field.type === 'file');
    const payload = hasFileField ? new FormData() : {};

    fields.forEach((field) => {
      const value = form[field.name];
      if (value !== undefined && value !== null) {
        // Skip empty file fields to prevent overwriting existing assets
        if (field.type === 'file' && value === '') {
          return;
        }
        if (hasFileField) {
          payload.append(field.name, value);
        } else {
          payload[field.name] = value;
        }
      }
    });

    try {
      if (editingItem?._id) {
        const updated = await putResource(
          `${endpoint}/${editingItem._id}`,
          payload
        );
        setData((current) =>
          current.map((item) => (item._id === updated._id ? updated : item))
        );
        setMessage(`${title} updated successfully.`);
      } else {
        const created = await postResource(endpoint, payload);
        setData((current) => {
          // Replace the matching fallback item (no _id) or existing DB item
          const key = created.slug || created.name || created.title || created.packageName || created.question;
          const matchIndex = current.findIndex(
            (item) =>
              item._id === created._id ||
              (!item._id &&
                key &&
                (item.slug === key || item.name === key || item.title === key || item.packageName === key || item.question === key))
          );
          if (matchIndex >= 0) {
            const next = [...current];
            next[matchIndex] = created;
            return next;
          }
          return [created, ...current];
        });
        setMessage(`${title} saved successfully.`);
      }
      resetForm();
    } catch (error) {
      setMessage(error.message || 'Unable to save record.');
    }
  }

  async function handleDelete(itemId) {
    await deleteResource(`${endpoint}/${itemId}`);
    setData((current) => current.filter((item) => item._id !== itemId));
  }

  if (loading) {
    return <Loader label={`Loading ${title.toLowerCase()}`} />;
  }

  return (
    <section className="tmx-admin-module">
      {error && (
        <div
          className="tmx-alert tmx-alert--warning"
          style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            backgroundColor: '#fff3cd',
            color: '#856404',
            border: '1px solid #ffeeba',
            borderRadius: '6px',
            fontSize: '0.95rem'
          }}
        >
          <strong>Database Connection Warning:</strong> {error}. You are currently viewing offline fallback data. Changes cannot be saved to the database.
        </div>
      )}
      <div className="tmx-admin-module__header">
        <div>
          <p className="tmx-eyebrow">Manage content</p>
          <h1>{title}</h1>
        </div>
        <input
          className="tmx-search"
          placeholder={`Search ${title.toLowerCase()}`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="tmx-admin-grid">
        <form className="tmx-admin-form tmx-card" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  rows={field.rows || 4}
                  value={form[field.name]}
                  onChange={updateField}
                />
              ) : field.type === 'file' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    name={field.name}
                    type="file"
                    accept={field.accept || 'image/*'}
                    onChange={updateField}
                  />
                  {typeof form[field.name] === 'string' && form[field.name] && (
                    <div className="tmx-image-preview" style={{ marginTop: '0.25rem' }}>
                      <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Current Image:</p>
                      <img
                        src={form[field.name]}
                        alt={`${field.label} preview`}
                        style={{
                          maxWidth: '120px',
                          maxHeight: '120px',
                          borderRadius: '6px',
                          border: '1px solid #ddd',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <input
                  name={field.name}
                  type={field.type || 'text'}
                  value={form[field.name]}
                  onChange={updateField}
                />
              )}
            </label>
          ))}

          <div className="tmx-form__actions">
            <Button type="submit">{editingItem ? 'Update' : 'Create'}</Button>
            {editingItem ? (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            ) : null}
            {message ? <p className="tmx-form__status">{message}</p> : null}
          </div>
        </form>

        <div className="tmx-admin-list">
          {filteredData.map((item) => (
            <article
              className="tmx-card tmx-admin-list__item"
              key={item._id ?? item.slug ?? item.title ?? item.name ?? item.packageName}
            >
              <div>
                <h3>{item.name || item.title || item.packageName}</h3>
                <p>
                  {item.specialty ||
                    item.overview ||
                    item.about ||
                    item.summary ||
                    item.description ||
                    ''}
                </p>
                {!item._id && (
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>
                    Not saved to DB yet
                  </span>
                )}
              </div>
              <div className="tmx-admin-list__actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditingItem(item)}
                >
                  Edit
                </Button>
                {item._id && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
