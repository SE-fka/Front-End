import axios from "axios"

 let rootUrl = "http://172.20.102.64:8000"  

export async function get_Nodes_And_Edges_Api(payload){
    console.log("here: api connection")
    const type = payload.type;
    const initialNode = payload.initialNode;
    const nodes = payload.nodes;
    const edges = payload.edges;
    const entity_count = payload.entity_count;
    var response = axios({
        method: 'post',
        url: `${rootUrl}/api/`,
        headers: {
            // 'Authorization': `Bearer ${payload.access_token}`,
            'Content-Type': 'application/json'
        },        
        data: {
            type: type,
            initialNode: initialNode,
            nodes: nodes,
            edges: edges,
            entity_count: entity_count,
        }
    }).then((data)=>{
        return ["SUC_REQUEST_SUCCESS", data.data.initialNode, data.data.nodes, data.data.edges];
    }).catch((error)=>{
        console.log(error)
    })
    return response;
}