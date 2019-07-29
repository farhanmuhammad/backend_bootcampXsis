const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')
const authConfig = require('../Config/auth.config.json')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
let jumlahlogin = 0;
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
    changeStatusAllhandler:(req,res,next) =>{
        dtl.changeStatusAll('yes')
    },

    login: (req, res, next) => {
        console.log("hayooWeb2") 
        let data=req.body
        dtl.readOneUserByIdData(function(items){ 
            
            if(items[0] && items[0].status == 'yes')
            {  
                
                if(bcrypt.compareSync(data.password,items[0].password)){    
                        let token=jwt.sign(items[0],authConfig.secretkey)
                    
                        delete items[0].password
                        let result={
                        userdata: items[0],
                        token: token
                        }
                        jumlahlogin = 0;
                        ResponseHelper.sendResponse(res, 200, result)
                        //let result="Berhasil Login"
                }else{
                    
                    if(jumlahlogin >= 2)
                    {
                        statusChange = "NO"
                        dtl.changeStatus(data.username,statusChange)
                        jumlahlogin = 0;
                        let result ="3 KALI LOGIN GAGAL USER BANNED"
                        ResponseHelper.sendResponse(res, 404, result)
                    }
                    else{
                        jumlahlogin++;
                        let result="Wrong Password"+jumlahlogin
                        ResponseHelper.sendResponse(res, 404, result)
                    }      
                    
                }
                
            } 
            else if(items[0].status !='yes'){
                
                    console.log('masih dalam status no')
                    let result ="STATUS NO"
                    ResponseHelper.sendResponse(res,404,result)
            
            }
            else
            {
                jumlah=0;
                let result="User not Found"
                ResponseHelper.sendResponse(res, 404, result)
                
            }
               
            
        },data.username)
        
    },
    
}

module.exports = M_user_BL