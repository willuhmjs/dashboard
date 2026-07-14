const express = require('express');
const app = express();

// Simple CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Mock Rancher version endpoint
app.get('/rancherversion', (req, res) => {
  res.json({
    Version: 'v2.8.0',
    GitCommit: 'abc123',
    RancherPrime: 'true'
  });
});

app.get('/version', (req, res) => {
  res.json({
    Version: 'v2.8.0',
    GitCommit: 'abc123'
  });
});

// Mock UI plugins
app.get('/v1/uiplugins', (req, res) => {
  res.json({
    type: 'collection',
    data: []
  });
});

// Mock management API
app.get('/v1/management.cattle.io.*', (req, res) => {
  res.json({
    type: 'collection',
    data: []
  });
});

// Mock auth
app.get('/v3/users', (req, res) => {
  res.json({
    type: 'collection',
    data: [{
      id: 'user-admin',
      type: 'user',
      username: 'admin',
      name: 'Admin User'
    }]
  });
});

app.get('/v3/principals', (req, res) => {
  res.json({
    type: 'collection',
    data: [{
      id: 'local://user-admin',
      principalType: 'user',
      provider: 'local',
      me: true
    }]
  });
});

// Mock schemas
app.get('/v1/schemas', (req, res) => {
  res.json({
    type: 'collection',
    data: []
  });
});

app.get('/v3/schemas', (req, res) => {
  res.json({
    type: 'collection',
    data: []
  });
});

// Catch all
app.all('*', (req, res) => {
  console.log(`Mock API: ${req.method} ${req.path}`);
  res.json({
    type: 'collection',
    data: []
  });
});

const PORT = 8989;
app.listen(PORT, () => {
  console.log(`Mock Rancher API running on http://localhost:${PORT}`);
});
