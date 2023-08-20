import axios from 'axios'

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getTradeVolume,
    getAvgBlockSize
}

const CACHE_TIMEOUT = 3600000 // 1 hour

function getRate(coins) {
    const cachedRate = localStorage.getItem('bitcoinRate')
    const cachedTime = localStorage.getItem('bitcoinRateTime')

    if (cachedRate && cachedTime && (Date.now() - cachedTime) < CACHE_TIMEOUT) {
        return Promise.resolve(cachedRate)
    }

    return axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
        .then(res => {
            localStorage.setItem('bitcoinRate', res.data)
            localStorage.setItem('bitcoinRateTime', Date.now().toString())
            return res.data
        })
}

function getMarketPrice() {
    const cachedPrice = localStorage.getItem('marketPrice')
    const cachedTime = localStorage.getItem('marketPriceTime')

    if (cachedPrice && cachedTime && (Date.now() - cachedTime) < CACHE_TIMEOUT) {
        return Promise.resolve(JSON.parse(cachedPrice))
    }

    return axios.get(`https://api.blockchain.info/charts/market-price?timespan=3months&format=json&cors=true`)
        .then(res => {
            localStorage.setItem('marketPrice', JSON.stringify(res.data))
            localStorage.setItem('marketPriceTime', Date.now().toString())
            return res.data
        })
}

function getTradeVolume() {
    const cachedVolume = localStorage.getItem('tradeVolume')
    const cachedTime = localStorage.getItem('tradeVolumeTime')

    if (cachedVolume && cachedTime && (Date.now() - cachedTime) < CACHE_TIMEOUT) {
        return Promise.resolve(JSON.parse(cachedVolume))
    }

    return axios.get('https://api.blockchain.info/charts/trade-volume?timespan=3months&format=json&cors=true')
        .then(res => {
            const values = res.data.values.map(item => item.y)
            localStorage.setItem('tradeVolume', JSON.stringify(values))
            localStorage.setItem('tradeVolumeTime', Date.now().toString())
            return values
        })
}

function getAvgBlockSize() {
    const cachedSize = localStorage.getItem('avgBlockSize')
    const cachedTime = localStorage.getItem('avgBlockSizeTime')

    if (cachedSize && cachedTime && (Date.now() - cachedTime) < CACHE_TIMEOUT) {
        return Promise.resolve(JSON.parse(cachedSize))
    }

    return axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=3months&format=json&cors=true')
        .then(res => {
            const values = res.data.values.map(item => item.y)
            localStorage.setItem('avgBlockSize', JSON.stringify(values))
            localStorage.setItem('avgBlockSizeTime', Date.now().toString())
            return values
        })
}