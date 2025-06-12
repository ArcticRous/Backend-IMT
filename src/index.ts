import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import personalRoutes from './routes/personal.routes';
import categoryRoutes from './routes/category.routes';
import servicioRoutes from './routes/servicios.routes';
import { sequelize } from './utils/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(json());
app.use('/api', categoryRoutes);
app.use('/api', personalRoutes); 
app.use('/api', servicioRoutes); 
app.use('/api/Auth', authRoutes); 
app.options('*', cors());

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});