import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import apiRoutes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok', service: 'TourMedX API' });
});

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
