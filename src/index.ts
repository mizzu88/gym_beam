//import express from 'express';
import   app    from  './server/server';

const PORT = 3000;
const HOST = 'localhost';

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});