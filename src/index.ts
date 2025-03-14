// src/index.ts
import express from 'express';
// import cors from 'cors';
import errorHandler from '../src/_middleware/error-handler';
import usersController from '../src/users/users.controller';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use('/users', usersController);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));