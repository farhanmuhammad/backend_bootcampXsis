const MahasiswaBisnisLogic = require('../BisnisLogic/mahasiswa_BL')     
const UserBisnisLogic = require('../BisnisLogic/user_BL')     
const ProvKotaBisnisLogic = require('../BisnisLogic/provkota_BL')
const authToken = require('../Token/authToken')

// const UserBisnisLogic = require('../BisnisLogic/M_user_BL') 


module.exports = exports = function(server){
 
  //mahasiswa
  server.get('/api/mahasiswa',authToken.checkToken,MahasiswaBisnisLogic.readMahasiswaAllHandler)
  server.post('/api/mahasiswa',authToken.checkToken,MahasiswaBisnisLogic.createMahasiswaAllHandler)
  server.put('/api/mahasiswa',authToken.checkToken,MahasiswaBisnisLogic.updateMahasiswaAllHandler)
  server.del('/api/mahasiswa',authToken.checkToken,MahasiswaBisnisLogic.deleteMahasiswaAllHandler)

  //user
  server.get('/api/user',authToken.checkToken,UserBisnisLogic.readUserAllHandler)
  server.post('/api/user',authToken.checkToken,UserBisnisLogic.createUserAllHandler)
  server.put('/api/user',authToken.checkToken,UserBisnisLogic.updateUserAllHandler)
  server.del('/api/user',authToken.checkToken,UserBisnisLogic.deleteUserAllHandler)

  //provinsi dan kota
  server.get('/api/provinsi',authToken.checkToken,ProvKotaBisnisLogic.readProvinsiAllHandler)
  server.get('/api/kota',authToken.checkToken,ProvKotaBisnisLogic.readKotaAllHandler)
  //login
  server.post('/api/login',UserBisnisLogic.login)
}