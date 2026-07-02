export function normalizeList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return [];
  }

  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toText(value) {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value).trim();
}
