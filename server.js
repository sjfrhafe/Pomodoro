const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')

app.use('/pomodoro', express.static(path.join(__dirname,'webapp', 'dist')));

app.get('/pomodoro', function(req, res) {
  res.sendFile(path.join(__dirname, 'webapp', 'dist', 'index.html'));
});

app.get('/pomodoro/:nav', function(req, res) {
  res.sendFile(path.join(__dirname, 'webapp', 'dist', 'index.html'));
});

app.listen(11020);
