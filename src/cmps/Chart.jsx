import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function Chart({ title, data, dataKey, color = "blue", valueFormatter = (val) => val }) {

    function CustomTooltip({ payload, label, active }) {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '8px', borderRadius: '5px', border: '1px solid black' }}>
                    <p className="label" style={{ color: 'black' }}>{`${label}`}</p>
                    <p className="desc" style={{ color: color }}>{`${valueFormatter(payload[0].value)}`}</p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="chart-container">
            <h3>{title}</h3>
            <LineChart
                width={0.7 * window.innerWidth}
                height={600}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={valueFormatter} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
        </div>
    )
}
