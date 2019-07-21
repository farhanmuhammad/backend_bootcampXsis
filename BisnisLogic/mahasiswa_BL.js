const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')



const M_mahasiswa_BL = {
    
    readMahasiswaAllHandler: (req, res, next) => { //res=lempar data ke client
        
        dtl.readMahasiswaAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        })       
        
    },
    createMahasiswaAllHandler: (req, res, next) => { //res=lempar data ke client
        console.log("test")
        var docs=req.body
        // console.log(JSON.stringify(req));
        
        dtl.createMahasiswaAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    updateMahasiswaAllHandler: (req, res, next) => { //res=lempar data ke client
        
        var docs=req.body
        
        dtl.updateMahasiswaAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    deleteMahasiswaAllHandler: (req, res, next) => { //res=lempar data ke client
        
        var docs=req.body
        
        dtl.deleteMahasiswaAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    }
    
}

module.exports = M_mahasiswa_BL