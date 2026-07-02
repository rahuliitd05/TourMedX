import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsRoot = path.resolve('uploads');

if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, uploadsRoot);
  },
  filename(request, file, callback) {
    const stamp = Date.now();
    callback(null, `${stamp}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

export const upload = multer({ storage });
