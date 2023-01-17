import express from 'express';
import ErrorHandler from './Middleware/ErrorHandler';
import cars from './Routes/CarRoutes';
import motorcycle from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());
app.use(cars);
app.use(motorcycle);
app.use(ErrorHandler.handle);

export default app;