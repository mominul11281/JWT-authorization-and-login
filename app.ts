import 'dotenv/config';
import express from 'express';
import authRouter from './routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on ${process.env.PORT || 3000}`);
});
