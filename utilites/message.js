/**
 * 
 * 
 */


exports.statusCode={
success: 200,
create: 201,
bedRequest: 400,
unauthorized: 401,
notfound: 400,
notallowed: 405,
serverError: 500
}



exports.message = {
    resume:"resume add successfully",
    dataFetched:"record featch successfully",
    dataExist: "user all ready exist",
    loging:"user loging successfully",
    dataNotfound: "user Record not found",
    recordNotFound: (val) =>`${val} record not found.`,
    dataAdded: (val) =>`${val}  added successfully.`,
    dataUpdated: (val) =>`${val}  dataUpdated successfully.`,
    dataDeleted: (val) =>`${val}  dataDeleted successfully.`,

    


    dataAdded : "user has been added successfully",
    projectdataAdded : "projectdataAdded has been added successfully",
    invalidCredentials: "Invalid Credentials",
     uplode :"file uplode successfuly",
     updateUser:"user updeate successfully",
     Activated:      "Account Activated",
     Dctivated  :"Account Dctivated",
     getData :"Get data successfuly",
     deleteData :"Datadelete data successfully",
     InvalidOTP:"InvalidOTP",
     otpExpire:"otpExpire",
   changePassword:"password changed successfully",
   search:"serach successfully",
   ResetPassword:"ResetPassword successfully"
}

