const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/stackfusion'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/stackfusion/'}
  );
  });
app.listen(process.env.PORT || 8080);
