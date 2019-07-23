const pg = require('pg')
const DatabaseConnection = require('../Config/dbp.config.json')
var DB = new pg.Pool(DatabaseConnection.config);
const bcrypt = require('bcryptjs')
const dt = {
    readMahasiswaAllHandlerData: (callback) => { //res=lempar data ke client      
        DB.connect(function(err,client,done) {
            var data=''
            if(err){              
                
                data=err;
            } 
            client.query('SELECT * FROM mahasiswa',function(err,result) {
                
                done()
                if(err){                       
                    data=err;
                }else{
                    data=result.rows
                }
                
                
                callback(data)
                
                
            }   )
            
            
        })} ,
        createMahasiswaAllHandlerData: (callback,docs) => { //res=lempar data ke client      
            DB.connect(function(err,client,done) {
                var data=''
                if(err){              
                    
                    data=err;
                } 
                
                const query = {
                    text: 'INSERT INTO mahasiswa(kode_mahasiswa,nama_mahasiswa,alamat,kode_agama,kode_jurusan,hobby) VALUES($1,$2,$3,$4,$5,$6)',
                    values: [docs.kode_mahasiswa, docs.nama_mahasiswa,docs.alamat,docs.kode_agama,docs.kode_jurusan,docs.hobby],
                }
                client.query(query,function(err,result) {
                    console.log(result)
                    done()
                    if(err){                       
                        data=err;
                    }else{
                        data=result.rows
                    }
                    
                    
                    callback(data)
                    
                    
                })
                
                
            })},
            updateMahasiswaAllHandlerData: (callback,docs) => { //res=lempar data ke client      
                DB.connect(function(err,client,done) {
                    var data=''
                    let adrs=''
                    if(err){              
                        
                        data=err;
                    } 
                    console.log(JSON.stringify(docs))
                    const query = {
                        text: 'update mahasiswa set  nama_mahasiswa=($1), kode_agama=($2), alamat=($3), kode_jurusan=($4), hobby=($5) where kode_mahasiswa=($6)',
                        values: [docs.nama_mahasiswa,docs.kode_agama,docs.alamat,docs.kode_jurusan,docs.hobby,docs.kode_mahasiswa],
                    }
                    client.query(query,function(err,result) {                        
                        done()
                        if(err){                       
                            data=err;
                        }else{
                            data=result.rows
                        }
                        
                        
                        callback(data)
                        
                        
                    })
                    
                    
                })
                
                
            },
            deleteMahasiswaAllHandlerData: (callback,docs) => { //res=lempar data ke client      
                DB.connect(function(err,client,done) {
                    var data=''
                    let adrs=''
                    if(err){              
                        
                        data=err;
                    } 
                    console.log(JSON.stringify(docs))
                    const query = {
                        text: 'delete from mahasiswa where kode_mahasiswa=($1)',
                        values: [docs.kode_mahasiswa],
                    }
                    client.query(query,function(err,result) {                        
                        done()
                        if(err){                       
                            data=err;
                        }else{
                            data=result.rows
                        }
                        
                        
                        callback(data)
                        
                        
                    })
                    
                    
                })
                
                
            },
            readUserAllHandlerData: (callback) => { //res=lempar data ke client      
                DB.connect(function(err,client,done) {
                    var data=''
                    if(err){              
                        
                        data=err;
                    } 
                    client.query('SELECT * FROM tb_user',function(err,result) {
                        
                        done()
                        if(err){                       
                            data=err;
                        }else{
                            data=result.rows
                        }
                        
                        
                        callback(data)
                        
                        
                    })
                    
                    
                })} ,
                
                createUserAllHandlerData: (callback,docs) => { //res=lempar data ke client      
                    DB.connect(function(err,client,done) {
                        var data=''
                        if(err){              
                            
                            data=err;
                        } 
                        var salt = bcrypt.genSaltSync(10);
                        let pashash=bcrypt.hashSync(docs.password, salt);
                        const query = {
                            text: 'INSERT INTO tb_user(username,password) VALUES($1,$2)',
                            values: [docs.username, pashash],
                        }
                        client.query(query,function(err,result) {
                            console.log(result)
                            done()
                            if(err){                       
                                data=err;
                            }else{
                                data=result.rows
                            }
                            
                            
                            callback(data)
                            
                            
                        })
                        
                        
                    })},
                    updateUserAllHandlerData: (callback,docs) => { //res=lempar data ke client      
                        DB.connect(function(err,client,done) {
                            var data=''
                            let adrs=''
                            if(err){              
                                
                                data=err;
                            } 
                            var salt = bcrypt.genSaltSync(10);
                            let pashash=bcrypt.hashSync(docs.password, salt);
                            console.log(JSON.stringify(docs))
                            const query = {
                                text: 'update tb_user set password=($1) where username=($2)',
                                values: [pashash,docs.username],
                            }
                            client.query(query,function(err,result) {                        
                                done()
                                if(err){                       
                                    data=err;
                                }else{
                                    data=result.rows
                                }
                                
                                
                                callback(data)
                                
                                
                            })
                            
                            
                        })
                        
                        
                    },
                    deleteUserAllHandlerData: (callback,docs) => { //res=lempar data ke client      
                        DB.connect(function(err,client,done) {
                            var data=''
                            let adrs=''
                            if(err){              
                                
                                data=err;
                            } 
                            console.log(JSON.stringify(docs))
                            const query = {
                                text: 'delete from tb_user where username=($1)',  
                                values: [docs.username],
                            }
                            client.query(query,function(err,result) {                        
                                done()
                                if(err){                       
                                    data=err;
                                }else{
                                    data=result.rows
                                }
                                
                                
                                callback(data)
                                
                                
                            })
                            
                            
                        })
                        
                        
                    },
                    readOneUserByIdData: (callback,username) => { //res=lempar data ke client      
                    
                        DB.connect(function(err,client,done) {
                            var data=''
                            if(err){              
                              
                               data=err;
                            } 
                           client.query('SELECT * FROM tb_user where username=($1)',[username],function(err,result) {
                             
                                    done()
                                    if(err){                       
                                        data=err;
                                    }else{
                                        data=result.rows
                                    }
                                      
                                       
                                            callback(data)
                    
                                
                            })
                        
                            
                        })
                
                                        
                        }
                    
                    
                    
                    
                    
                }
                
                module.exports = dt