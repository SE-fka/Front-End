import { call, put, takeLatest } from 'redux-saga/effects';
import { get_Nodes_And_Edges_Api } from '../../API/InvestigationApi';

export function* get_Nodes_And_Edges(action){
    
    const req_type = action.payload.type;
    const req_initialNode = action.payload.initialNode;
    const nodes = action.payload.nodes;
    const edges = action.payload.edges;
    const access_token = action.payload.access_token;
    const entity_count = action.payload.entity_count;

    console.log("here: api connection")
    const response =  yield call(get_Nodes_And_Edges_Api, {access_token:access_token, type: req_type, initialNode: req_initialNode, nodes:nodes, edges:edges, entity_count: entity_count})

    const state = response[0];
    const data = response.slice(1);

    switch (state) {
        case "SUC_REQUEST_SUCCESS":
            yield put({
                type: "investigation/ADD_NODES_AND_EDGES_SUCCESS", 
                payload: {
                    nodes: data[1],
                    edges: data[2],  
                }
            })
            break;
        case "ERR_BAD_REQUEST":
            yield put({ 
                type: 'investigation/ADD_NODES_AND_EDGES_FAILED', 
                payload: {
                    message: "Incorrect credential please try again."
                } 
            })
            break;

            default:
               
    }
}


export default function* myInvestigationSagaMiddleware(){
    yield takeLatest('GET_NODES_AND_EDGES', get_Nodes_And_Edges)
}