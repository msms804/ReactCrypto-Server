const express = require('express')
const app = express();
const path = require('path');
const { connectDB } = require('./config/database')
const coinRoutes = require('./routes/coinRoutes')

connectDB();
app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버실행중')
})

//이거 추가해야 ajax 잘됨
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'react-crypto', 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'react-crypto', 'dist', 'index.html'))
})


app.get('/api/coins', coinRoutes);
app.post('/api/save/coin', coinRoutes);
app.get('/api/theme', coinRoutes);
app.get('/api/upbit/coins/list', coinRoutes);
app.post('/api/save/rates', coinRoutes);
app.get('/api/rates', coinRoutes);
app.get('/api/fearAndGreedIdx', coinRoutes);
app.post('/api/save/feargreedIdx', coinRoutes);
app.post('/api/save/theme/coins', coinRoutes);
app.get('/api/theme/coins', coinRoutes);

//리액트 라우터(마지막에 두는게 좋음)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'react-crypto', 'dist', 'index.html'))
})

