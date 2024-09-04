import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Box, Button, Grid, Input, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";

export default function CircularProgression(prop){
    const percentage = prop.percentage;
    const title = prop.title;
    const title2 = prop.title2;
    let strokeColor = '#3576cb'
    let size = prop.size;
    let width=250;
    let height = 200;

    console.log(size)
    
    if(size==1){
        width=250;
        height = 200;
    }else if(size==2){
        width = 400;
        height = 400;
    }

    if(percentage>0){
        strokeColor = '#3576cb';
    }
    else{
        strokeColor = 'red';
    }

    return(
        <Box style={{ width: size==1? 250 : 400, height: size==1? 250 : 400}}>
            <CircularProgressbar
                value={ percentage>0 ? percentage : percentage*(-1) }
                text={`${percentage}%`}
                styles={{

                    // Customize the root svg element
                    root: {
                        boxSizing: '20px'
                    },

                    // Customize the path, i.e. the "completed progress"
                    path: {
                        stroke: `${strokeColor}`,
                        strokeWidth: '8px',
                        strokeLinecap: 'round',
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                    },

                    // Customize the trail, i.e. the "remaining progress"
                    trail: {
                        stroke: "#d6d6d6",
                    },

                    // Customize the text
                    text: {
                        // Text color
                        
                        fill: 'black',
                        
                        // Text size
                        // fontSize: '24px',
                        
                        // Text alignment
                        dominantBaseline: 'central',
                        textAnchor: 'middle',
                    },
                }} />
            <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}>
                {title}
            </Typography>
            <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}>
                {title2}
            </Typography>
        </Box>
    )
}