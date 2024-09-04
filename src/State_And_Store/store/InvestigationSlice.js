import { createSlice } from "@reduxjs/toolkit";

function getDate(){
    const date = new Date();
    const time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
    return time
}

function getTime(){
    const date = new Date();
    const hour = date.getHours()+':'+date.getMinutes()
    return hour 
}

function edge_Similarity_Check(element, item_list){
    let result = true;
    
    item_list.forEach(elem => {
        // console.log(element.from===elem.from, element.to===elem.to, element.arrow)
        if(element.from===elem.from && element.to===elem.to && elem.arrows===element.arrows){
            result = false;
            return result;
        }else{
            result=true
            return result
        }
    });
    return result
}

function node_Similarity_Check(element, item_list){
    let result = false;
    
    item_list.forEach(elem => {
        
        const elem_keys = elem.uniqe;
        const element_keys = element.uniqe;

        if(elem_keys.length === element_keys.length){

            elem_keys.forEach((e,index)=> {

                const elem_key=e
                const element_key=element_keys[index]

                if(elem_key === element_key){
                    if(elem.property[elem_key]!==element.property[element_key]){
                        result = true
                        return result
                    }
                }else{
                    result = true
                    return result
                }
            });   
        }else{
            result = true
            return result
        }
    });
    return result
}

const initialState = {
    init: true,
    name: "Untitled investigation",
    date: getDate(),
    time: getTime(),
    selectedNode: {},
    nodes: [
        {
            id: 0, 
            image:"https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_960_720.png", 
            shape: "circularImage", 
            label: "Initial entity", 
            font: "12px arial",
            property: {
                name: 'Inital node',
                'fb username': "",
                'twitter username': "",
                'telegram username': "",
                'youtube username': "",
                'init date': getDate(),
                'init time': getTime(),
            },
            action: [{name: "get users", type: "GET_ALL_USER_INIT"}],
            uniqe: ['name', 'fb username', 'twitter username','telegram username','youtube username']
        }
    ],
    edges: [],
}

export const InvestigationSlice = createSlice({
    name: 'investigation',
    initialState,
    reducers: {
        ADD_NODES_AND_EDGES_SUCCESS:(state, action)=>{
            const response_data = action.payload;
            
            const newNodes = response_data.nodes;
            const newEdges = response_data.edges;
            
            state.nodes = newNodes
            state.edges = newEdges        
        },
        ADD_NODES_AND_EDGES_FAILED:(state, action)=>{
            console.log("ADD_NODES_AND_EDGES_FAILED")
        },
        SET_SELECTED_NODES:(state, action)=>{
            state.selectedNode = action.payload.selectedNode
        },
        SET_USER_NAMES:(state, action)=>{
            console.log(action.payload.name)
            state.selectedNode.property[action.payload.name] = action.payload.value;
            
            state.nodes.forEach(element=>{
                if(element.id===state.selectedNode.id){
                    element.property[action.payload.name] = action.payload.value; 
                }
            })
        }
    },
})

export default InvestigationSlice.reducer;