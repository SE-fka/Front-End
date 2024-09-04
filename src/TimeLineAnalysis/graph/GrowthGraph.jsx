import { Box, Button, Grid, Input, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LineGraph from "./LineGraph";
import { tokens } from "../../styles/theme";

export default function GrowthGraph() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const access_token = useSelector((state) => state.auth.access_token);
    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [platforms, setPlatforms] = useState('twitter');
    const [inputValue, setInputValue] = useState(false);
    const data = useSelector((state) => state.targetAnalysis.post);

    function onClickHandle(e) {
        e.preventDefault();
        if (userName) {
            dispatch({
                type: 'GET_TARGET_DATA',
                payload: {
                    platforms: platforms,
                    username: userName,
                    year: year,
                    month: month,
                    access_token: access_token,
                },
            });
        } else {
            setInputValue(true);
        }
    }

    return (
        <Box m="2%" pt={16}>
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={9}>
                    <Box display="flex" flexDirection="column" alignItems="center" m={'2%'}>
                        <Typography variant="h6" gutterBottom>
                            Filter Data
                        </Typography>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Typography variant="body1" mr={1}>Platform:</Typography>
                            <Select
                                sx={{ width: '150px', height: "30px", marginRight: '20px' }}
                                value={platforms}
                                id="platforms"
                                label="platforms"
                                onChange={(e) => { setPlatforms(e.target.value) }}
                                name="platforms"
                            >
                                <MenuItem value={'twitter'}>Twitter</MenuItem>
                                <MenuItem value={"facebook"}>Facebook</MenuItem>
                                <MenuItem value={'youtube'}>YouTube</MenuItem>
                                <MenuItem value={'telegram'}>Telegram</MenuItem>
                            </Select>

                            <Typography variant="body1" mr={1}>User:</Typography>
                            <Input
                                id="user"
                                value={userName}
                                onChange={(e) => { setUserName(e.target.value) }}
                                sx={{ marginRight: '20px' }}
                            />

                            <Typography variant="body1" mr={1}>Year:</Typography>
                            <Select
                                sx={{ width: '150px', height: "30px", marginRight: '20px' }}
                                value={year}
                                id="year"
                                label="year"
                                onChange={(e) => { setYear(e.target.value) }}
                                name="year"
                            >
                                <MenuItem value={0}>select year</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2023}>2023</MenuItem>
                            </Select>

                            <Typography variant="body1" mr={1}>Month:</Typography>
                            <Select
                                sx={{ width: '150px', height: "30px", marginRight: '5px' }}
                                value={month}
                                id="month"
                                onChange={(e) => { setMonth(e.target.value) }}
                                name="month"
                            >
                                <MenuItem value={0}>select month</MenuItem>
                                {[...Array(12)].map((_, index) => (
                                    <MenuItem key={index + 1} value={index + 1}>{String(index + 1).padStart(2, '0')}</MenuItem>
                                ))}
                            </Select>

                            <Button
                                sx={{ backgroundColor: "#868cfb" }}
                                onClick={onClickHandle}
                            >
                                Filter
                            </Button>
                        </Box>
                        <LineGraph data={data} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
