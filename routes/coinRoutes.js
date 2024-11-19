const express = require('express');
const router = express.Router();
const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

router.get('/api/coins', async (req, res) => {
    try {
        const db = getDB();
        const coins = await db.collection('coin').find().toArray()
        //console.log(coins);
        res.json(coins);
    } catch (error) {
        console.error('Error fetching coins:', error);
        res.status(500).send(error);
    }
})
//업비트 코인만 가져오는 api
router.get('/api/upbit/coins/list', async (req, res) => {
    try {
        const db = getDB();
        const upbitcoins = await db.collection('upbitcoinstest').find().toArray();
        res.json(upbitcoins);
    } catch (error) {
        res.status(500).send(error);
    }
})
router.post('/api/save/coin', async (req, res) => {
    try {
        const db = getDB();
        const coins = req.body;
        //console.log(coins);
        // const result = await db.collection('upbitcoins').insertOne({
        //     ticker: ticker,
        //     shortname: shortname,
        //     cryptoExchange: cryptoExchange,`
        //     englishname: englishname,
        //     koreanname, koreanname,
        //     theme: theme,
        // });
        const result = await db.collection('upbitcoinstest').insertMany(coins);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error Save coins in DB:', error);
        res.status(500).send(error);
    }
})
router.post('/api/save/rates', async (req, res) => {
    try {
        const db = getDB();
        const { baseprice, date } = req.body;
        const result = await db.collection('rates').insertOne({ baseprice: baseprice, date: date });
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})
router.get('/api/rates', async (req, res) => {
    try {
        const db = getDB();
        const rate = await db.collection('rates').find().sort({ _id: -1 }).toArray();
        res.json(rate);
    } catch (error) {
        res.status(500).send(error);
    }
})
router.get('/api/theme', async (req, res) => {
    try {
        const db = getDB();
        const themes = await db.collection('theme').find().toArray();
        res.json(themes);
    } catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).send(error);
    }
})
//공포탐욕지수 가져오는 api
router.get('/api/fearAndGreedIdx', async (req, res) => {
    try {
        const db = getDB();
        //const idx = await db.collection('fearAndGreedIndex').find().sort({ _id: -1 }).toArray();
        const idx = await db.collection('fearAndGreedIndex').findOne({}, { sort: { _id: -1 } });

        //console.log("공탐지수 db에서 가져옴", idx)
        res.json(idx);
    } catch (error) {
        res.status(500).send(error);
    }
})
router.post('/api/save/feargreedIdx', async (req, res) => {
    try {
        const db = getDB();
        const { today, todayIdx, yesterdayIdx, sevenDaysIdx, oneMonthIdx,
            todayclassification,
            yesterdayclassification, sevenDaysclassification,
            oneMonthclassification, nextUpdateDate,
        } = req.body;

        const idx = await db.collection('fearAndGreedIndex').insertOne({
            date: today,
            todayIdx: todayIdx,
            yesterdayIdx: yesterdayIdx,
            sevenDaysIdx: sevenDaysIdx,
            oneMonthIdx: oneMonthIdx,
            todayclassification: todayclassification,
            yesterdayclassification: yesterdayclassification,
            sevenDaysclassification: sevenDaysclassification,
            oneMonthclassification: oneMonthclassification,
            nextUpdateDate: nextUpdateDate,
        })
        res.status(201).send(idx);
    } catch (error) {
        console.error("Error saving to the database:", error);
        res.status(500).send(error);
    }
})

router.post('/api/theme/coins', async (req, res) => {
    try {
        const db = getDB();
        await db.collection()
    } catch (error) {

    }
})
module.exports = router;