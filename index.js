const express = require("express");
const app = express();

const port = 1234;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
