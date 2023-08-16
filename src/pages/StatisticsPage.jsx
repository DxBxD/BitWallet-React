import React, { useEffect, useState } from 'react';
import { bitcoinService } from '../services/bitcoin.service';
import { utilService } from '../services/util.service';
import { Chart } from '../cmps/Chart';

export function StatisticsPage() {
    const [tradeVolume, setTradeVolume] = useState([])
    const [avgBlockSize, setAvgBlockSize] = useState([])
    const [marketPrice, setMarketPrice] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const tradeData = await bitcoinService.getTradeVolume()
                const blockData = await bitcoinService.getAvgBlockSize()
                const marketData = await bitcoinService.getMarketPrice()

                setTradeVolume(tradeData.map((value, idx, arr) => ({
                    name: idx === arr.length - 1 ? '1 Day Ago' : `${arr.length - idx} Days Ago`,
                    value
                })))
                setAvgBlockSize(blockData.map((value, idx, arr) => ({
                    name: idx === arr.length - 1 ? '1 Day Ago' : `${arr.length - idx} Days Ago`,
                    value
                })))
                setMarketPrice(marketData.values.map(item => ({
                    name: `${utilService.formatTimestampToShortDate(item.x)}`, value: item.y
                })))
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        })()
    }, [])

    return (
        <div className="statistic-page">
            <Chart
                title="Trade Volume - Past 3 Months"
                data={tradeVolume}
                dataKey="value"
                description="Trade Volume over 5 months"
                color="gold"
                valueFormatter={(val) => `$${val.toLocaleString()} M`}
            />
            <Chart
                title="Average Block Size - Past 3 Months"
                data={avgBlockSize}
                dataKey="value"
                description="Average Block Size over 5 months"
                color="gold"
                valueFormatter={(val) => `${val.toFixed(2)} MB`}
            />
            <Chart
                title="Market Price - Past 3 Months"
                data={marketPrice}
                dataKey="value"
                description="Market Price over 5 months"
                color="gold"
                valueFormatter={(val) => `$${val.toFixed(2)}`}
            />

        </div>
    )
}