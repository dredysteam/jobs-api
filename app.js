const express = require('express');

// MIDDLEWARES
const logger = require('./middleware/logger');

// Init express
const app = express();

// Init MIDDLEWARE
app.use(logger);
app.use(express.json());

// connectDB

// const connectDB = require('./db/connect');

// ROUTES
const membersRouter = require('./routes/members');

app.use('/api/members', membersRouter);

// routes
app.get('/', (req, res) => {
  res.send('<h1>Light Freight API is Working...</h1>');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => console.log(`Server is listening on port ${port}...`));
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();
