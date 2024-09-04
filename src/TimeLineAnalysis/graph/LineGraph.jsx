import { Box } from "@mui/material";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';



const deepExtend = require('deep-extend');


export default function LineGraph({data}){


    return (
        <Box m="2%">
            <LineChart width={1600} height={600} data={data} strokeWidth={3}>
                <CartesianGrid strokeDasharray="6 6" />

                <XAxis dataKey="name" >
                    <Label style={{
                            textAnchor: "middle",
                            fontSize: "130%",
                        }}
                    angle={270} />
                </XAxis>
                <YAxis >
                    <Label style={{
                            textAnchor: "middle",
                            fontSize: "130%",
                        }}
                    angle={270} 
                    value={"posts count"} />    
                </YAxis>
                <Tooltip />
                <Legend />
                {/* Linear */}
                <Line type="monotone" label={"count"} dataKey="value" stroke="#3576cb" strokeWidth={3} activeDot={{ r: 20 }} />
            </LineChart>
        </Box>
    )
}