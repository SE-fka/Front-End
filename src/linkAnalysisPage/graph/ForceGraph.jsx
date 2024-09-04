import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import { tokens } from "../../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import NodeProperty from "./NodeProperty";

const deepExtend = require('deep-extend');

export default function ForceGraph(){

    const investigation = useSelector((state) => state.investigation);
    const dispatch = useDispatch();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    let nodes = useSelector((state) => state.investigation.nodes);
    let edges = useSelector((state) => state.investigation.edges); 
    let selectedNode = useSelector((state) => state.investigation.selectedNode)

    // { arrows: 'to', from: 3, to: 3 },

    function onChangeHandler(e){
        e.preventDefault(false);
        dispatch({type:'investigation/SET_INVESTIGATION_NAME', payload:{name:e.target.value}});
    }

    const option = {
        width: '100%',
        height: '700px'
    }

    function onClickHandler(e){
        e.event.preventDefault(false)
        if(e.nodes.length>0){
            var result = nodes.find(obj => {
                return obj.id === e.nodes[0];
            })
            dispatch({ type:'investigation/SET_SELECTED_NODES', payload:{selectedNode: result}})
        }
    }

    const visJsRef = useRef(null);
    const propertiyRef = useRef(null);
    
    useEffect(() => {
        var edge = []
        edges.forEach((e)=>{
            edge.push({
                "arrows":e.arrows,
                "to": e.to,
                "from": e.from,
                "length": 115
            })
        }) 
        const network =
        visJsRef.current &&
        new Network(visJsRef.current, { nodes: nodes, edges: edge }, option);
        network.on('click', onClickHandler);
    }, [ nodes]);

    return (
        <Box m="2%" pt={16}>
        <Box
            display="grid"
            gridTemplateColumns="repeat(20, 1fr)"
            gridAutoRows="140px"
            gap="20px"
        >   
            {/* 🟨🟨🟨🟨🟨🟨 ROW 🟨🟨🟨🟨🟨🟨 */}
            <Box
            gridColumn="span 16"
            gridRow="span 5"
            style={{backgroundColor:'#F2F0F0'}}
            >
            <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
            >
                <Box display='grid'>
                <Box  
                    gridColumn="span 3"
                >
                    <TextField
                        pt='5px'
                        onChange={onChangeHandler}
                        value={investigation.name} 
                        variant="standard"
                        />
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}>
                        {investigation.date}
                    </Typography>
                </Box>
                </Box>
            </Box>
            <Box height="380px" m="-20px 0 0 0" gridRow="span 5">
                <div ref={visJsRef}/>
                {/* <LineChart /> */}
            </Box>
        </Box>

        <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            ref={propertiyRef}
        >
            {/* {visblity === true &&  */}
            
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Property
                </Typography>
            </Box>
            <NodeProperty />
              
        </Box>
      </Box>
      <br />
      <br />
      </Box>
    )
}

                
                