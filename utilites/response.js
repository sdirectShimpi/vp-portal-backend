/**
 * 
 * 
 * 
 */




exports.successAction = (data, message = "Ok")=> {
    return { statusCode :200, data ,message}

}
exports.faildAction = (statusCode, data ="null" , message ="Faild") =>{
    return {statusCode ,data ,message}

}