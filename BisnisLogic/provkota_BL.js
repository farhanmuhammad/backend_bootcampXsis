const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')


const M_provkota_BL ={
    readProvinsiAllHandler: (req, res, next) => { //res=lempar data ke client
  
        dtl.readProvinsiAllHandlerData(function (items) {
          ResponseHelper.sendResponse(res, 200, items)
        })
    
      },
      readKotaAllHandler: (req, res, next) => { //res=lempar data ke client
      
        dtl.readKotaAllHandlerData(function (items) {
          ResponseHelper.sendResponse(res, 200, items)
        })
    
      }
    
}
module.exports = M_provkota_BL
