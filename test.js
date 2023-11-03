const test = async () => {
    console.log('A');
    const messages =  ["1","2","3"]; 
    const result = [];
    const mappper = {"1":"ONE","2":"TWO","3":"THREE"}
    let p;
    for(let i=0; i<3;i++){
        try{
            p = await Promise.all(messages.map(msg => {
                console.log('B call -> '+ msg);
                let waitTime = Math.ceil(Math.random() * 10000);
                return new Promise((resolve, reject)=>{
                    if(waitTime<5000){
                        setTimeout(() => resolve('response in :: '+ waitTime), waitTime)
                    }else{
                        reject('error in :: '+ waitTime)
                    }
                }).then(resp => {
                    const msgChild =  `B call ${msg} Processed :: ${resp}`;
                    return new Promise((resolve, reject) => {
                        let childWaitTime = Math.ceil(Math.random() * 10000);
                        if(childWaitTime<6000){
                            setTimeout(() => resolve('response in :: '+ childWaitTime), childWaitTime)
                        }else{
                            reject('error in :: '+ childWaitTime)
                        }
                    }).then(respChild => {
                        result.push(mappper[msg])
                        return `${msgChild} :: Processed child :: ${respChild}`
                    }).catch(err => {
                        return `${msgChild} :: Processed child :: ${err}` 
                    })
                }).catch(errChild => {
                    throw Error(`B call ${msg} Processed :: ${errChild}`)
                })
            }))

            console.log('C');
            console.log("Promise.All :: ", p)
        }catch(err){
            console.log('D');
            console.log(err)
        }
    }

    console.log('E')
    console.log("Result :: "+ result)
   
}

test()
