function listAdder(listNum){
    let sum = 0;
    listNum.forEach(element => {
        element.forEach(elem=> {
            sum = sum+elem;
        })
    });
    
    return sum;
}

export function avregeView(views){
    let total_view = listAdder(views);
    let counts = 0;
    views.forEach(element => {
        counts = counts + element.length;
        
    });
    return total_view/counts
}


export function engagementRate(followers,reply, retweet, like){
    if(followers===0){
        return "unable to calculate";
    }
    if(followers===undefined){
        return "follower not provided"
    }
    
    let total_reply = listAdder(reply);
    let total_retweet = listAdder(retweet);
    let total_like = listAdder(like);
    
    return (total_like+total_reply+total_retweet)/followers;
}

