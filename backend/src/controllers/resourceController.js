import ApiError from '../utils/apiError.js';
import { normalizeList, toText } from '../utils/normalize.js';

function toDataUrl(file) {
  if (!file) {
    return '';
  }

  const mimeType = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

function toBoolean(value) {
  if (value === undefined) {
    return undefined;
  }

  return value === true || value === 'true' || value === '1';
}

function parseFaqItems(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim().startsWith('[')) {
    try {
      return JSON.parse(value);
    } catch (_error) {
      return [];
    }
  }

  return String(value)
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [question, answer] = item.split('|').map((part) => part.trim());
      return { question, answer };
    })
    .filter((item) => item.question && item.answer);
}

function buildPayload(request, options) {
  const payload = { ...request.body };

  for (const field of options.arrayFields || []) {
    if (payload[field] !== undefined) {
      payload[field] = normalizeList(payload[field]);
    }
  }

  if (options.booleanFields) {
    for (const field of options.booleanFields) {
      if (payload[field] !== undefined) {
        payload[field] = toBoolean(payload[field]);
      }
    }
  }

  if (options.faqField && payload[options.faqField] !== undefined) {
    const targetField = options.faqTargetField || options.faqField;
    payload[targetField] = parseFaqItems(payload[options.faqField]);
    if (targetField !== options.faqField) {
      delete payload[options.faqField];
    }
  }

  if (options.singleFileField) {
    if (request.file) {
      payload[options.singleFileField] = toDataUrl(request.file);
    }

    if (request.files && request.files[options.singleFileField]?.[0]) {
      payload[options.singleFileField] = toDataUrl(
        request.files[options.singleFileField][0]
      );
    }
  }

  if (options.multiFileFields && request.files) {
    for (const field of options.multiFileFields) {
      const files = request.files[field] || [];
      if (files.length > 0) {
        payload[field] = files.map((file) => toDataUrl(file));
      }
    }
  }

  return payload;
}

function buildFilter(query, options) {
  const filter = {};

  for (const field of options.filterFields || []) {
    if (query[field] !== undefined && query[field] !== '') {
      filter[field] = query[field];
    }
  }

  return filter;
}

export default function createResourceController(Model, options = {}) {
  return {
    async list(request, response, next) {
      try {
        const page = Math.max(parseInt(request.query.page || '1', 10), 1);
        const limit = Math.min(
          Math.max(parseInt(request.query.limit || '12', 10), 1),
          50
        );
        const search = toText(request.query.search);
        const sort = toText(request.query.sort) || '-createdAt';
        const query = { ...buildFilter(request.query, options) };

        if (search && options.searchFields?.length) {
          query.$or = options.searchFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' }
          }));
        }

        const [items, total] = await Promise.all([
          Model.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit),
          Model.countDocuments(query)
        ]);

        response.json({
          items,
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        });
      } catch (error) {
        next(error);
      }
    },

    async getOne(request, response, next) {
      try {
        const item = await Model.findById(request.params.id);

        if (!item) {
          return next(new ApiError(404, `${Model.modelName} not found`));
        }

        response.json(item);
      } catch (error) {
        next(error);
      }
    },

    async createOne(request, response, next) {
      try {
        const payload = buildPayload(request, options);
        const item = await Model.create(payload);
        response.status(201).json(item);
      } catch (error) {
        next(error);
      }
    },

    async updateOne(request, response, next) {
      try {
        const payload = buildPayload(request, options);
        const item = await Model.findByIdAndUpdate(
          request.params.id,
          { $set: payload },
          { new: true }
        );

        if (!item) {
          return next(new ApiError(404, `${Model.modelName} not found`));
        }

        response.json(item);
      } catch (error) {
        next(error);
      }
    },

    async deleteOne(request, response, next) {
      try {
        const item = await Model.findByIdAndDelete(request.params.id);

        if (!item) {
          return next(new ApiError(404, `${Model.modelName} not found`));
        }

        response.json({ message: `${Model.modelName} removed successfully` });
      } catch (error) {
        next(error);
      }
    }
  };
}
