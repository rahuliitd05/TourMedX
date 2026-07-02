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
  const { data, loading, setData } = useResource(endpoint, fallbackData);
  const [query, setQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(() => getInitialForm(fields));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editingItem) {
      const nextForm = fields.reduce((accumulator, field) => {
        accumulator[field.name] =
          editingItem[field.name] ?? (field.multiple ? [] : '');
        return accumulator;
      }, {});
      setForm(nextForm);
    }
  }, [editingItem, fields]);

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
      if (value !== undefined && value !== null && value !== '') {
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
          current.map((item) => (item._id === editingItem._id ? updated : item))
        );
        setMessage(`${title} updated successfully.`);
      } else {
        const created = await postResource(endpoint, payload);
        setData((current) => [created, ...current]);
        setMessage(`${title} created successfully.`);
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
                <input
                  name={field.name}
                  type="file"
                  accept={field.accept || 'image/*'}
                  onChange={updateField}
                />
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
              key={item._id || item.name}
            >
              <div>
                <h3>{item.name || item.title || item.packageName}</h3>
                <p>
                  {item.specialty ||
                    item.about ||
                    item.summary ||
                    item.description ||
                    ''}
                </p>
              </div>
              <div className="tmx-admin-list__actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditingItem(item)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
