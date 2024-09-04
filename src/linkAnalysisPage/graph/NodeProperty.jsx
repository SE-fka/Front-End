import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";

export default function NodeProperty(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const access_token = useSelector((state)=>{return state.auth.access_token});
    const nodes = useSelector((state)=>{return state.investigation.nodes});
    const edges = useSelector((state)=>{return state.investigation.edges});
    
    const [entityCount, setEntityCount] = useState(25)

    const selectedNode = useSelector(state=>{return state.investigation.selectedNode});

    useEffect(()=>{
        console.log(selectedNode);
    })

    function onChangeHandler(e){
        e.preventDefault(false);
        dispatch({ type:"investigation/SET_USER_NAMES", payload:{name: e.target.id, value: e.target.value}});
    }

    function onClickHandler(e){
        e.preventDefault(false);

        const type = e.target.id;



        // console.log(type)
        // console.log("============================================================================")
        dispatch({
            type: 'GET_NODES_AND_EDGES', 
            payload: {
                type: type, 
                nodes: nodes,
                edges: edges,
                initialNode: selectedNode,
                access_token: access_token,
                entity_count: entityCount,
            },
        })
    }

    if(Object.keys(selectedNode).length === 0){
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pl="10px"
            pb="20px"
            >
            <Box>
                <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600">
                    No Node Selected
                </Typography>                 
            </Box>
        </Box>
    }else{
        return (
            <>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    // borderBottom={`4px solid ${colors.primary[500]}`}
                    pl="10px"
                    pb="20px">
                    <TextField 
                        id="maximum_entity_count"
                        pt='5px'
                        onChange={(e)=> setEntityCount(e.target.value)}
                        label="Maximum entity count:(25)" 
                        variant="standard"
                    />
                    <br></br>
                </Box>
                {Object.keys(selectedNode.property).map((key) => (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        // borderBottom={`4px solid ${colors.primary[500]}`}
                        pl="10px"
                        pb="20px"
                        key={key}
                        >
                        <Box>
                            <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                            key={key+'-lable'}
                            >
                                {key}:
                            </Typography>
                            
                            {(key==="fb username"||key==="twitter username"||key==="telegram username"||key==="youtube username") ?
                                <TextField 
                                    pt='5px'
                                    id={key}
                                    key={key+'-value'}
                                    onChange={onChangeHandler}
                                    label={selectedNode.property[key]===""?"enter user name":selectedNode.property[key]} 
                                    variant="standard"
                                />
                                :
                                <Typography key={key+'-value'} id={key} color={colors.grey[100]}>{selectedNode.property[key]}</Typography>
                            }                 
                        </Box>
                    </Box>
                ))}
                <Box  sx={{
                        display:'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',    
                    }}>
                    {selectedNode.action.map((key) => (
                        <Box
                            justifyContent="space-between"
                            alignItems="center"
                            pl="10px"
                            pb="20px"
                            key={key}
                            
                            >
                            <Box>
                                <Button onClick={onClickHandler} id={key.type} color='info' p="3px 6px" variant="contained">
                                    {key.name}
                                </Button>               
                            </Box>
                        </Box>
                    ))}
                </Box>
            </>
        )
    }
}