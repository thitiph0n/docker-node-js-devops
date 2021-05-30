const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  PORT,
} = require('./config/config');

const postRouter = require('./routes/postRoutes');

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const app = express();

app.use(express.json());

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get('/', (req, res) => {
  res.send('<h2>Nodemon!!!</h2>');
});

app.use('/api/v1/posts', postRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
