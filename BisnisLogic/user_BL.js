const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')
const authConfig = require('../Config/auth.config.json')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const M_user_BL = {
    
    readUserAllHandler: (req, res, next) => { //res=lempar data ke client
        
        dtl.readUserAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        })       
        
    },
    createUserAllHandler: (req, res, next) => { //res=lempar data ke client
        console.log("test")
        var docs=req.body
        // console.log(JSON.stringify(req));
        
        dtl.createUserAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    updateUserAllHandler: (req, res, next) => { //res=lempar data ke client
        
        var docs=req.body
        
        dtl.updateUserAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    deleteUserAllHandler: (req, res, next) => { //res=lempar data ke client
        
        var docs=req.body
        
        dtl.deleteUserAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    login: (req, res, next) => {
        console.log("hayooWeb2") 
        let data=req.body    
        
        dtl.readOneUserByIdData(function(items){ 
            
            if(items[0])
            {  
                
                if(bcrypt.compareSync(data.password,items[0].password)){
                    let token=jwt.sign(items[0],authConfig.secretkey)
                    
                    delete items[0].password
                    let result={
                        userdata: items[0],
                        token: token
                    }
                    //let result="Berhasil Login"
                    ResponseHelper.sendResponse(res, 200, result)
                }else{
                    let result="Wrong Password"
                    ResponseHelper.sendResponse(res, 404, result)
                }
                
            } else
            {
                let result="User not Found"
                ResponseHelper.sendResponse(res, 404, result)
            }  
            
        },data.username)
        
    },
    
}

module.exports = M_user_BL