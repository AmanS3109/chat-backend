import express from 'express';
import healthRouter from './routes/health';

const app = express();

app.use(express.json());

// Health check route
app.use('/api/health', healthRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

