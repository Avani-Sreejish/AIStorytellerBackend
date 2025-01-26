
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/generateStory.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use('/generateStory', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
