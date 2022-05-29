var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();



app.use(cors());
app.use(bodyparser.json());


app.listen('3000',()=>{
    console.log('server is running....');
})



// mysql database connection 

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'apibus'
});

// check db connection 
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('Database terhubung');
    }
});


// REST API CURD

app.get('/api',(req,res)=>{
    res.send('API berjalan');
});


// Create data 

app.post('/api/create',(req,res)=>{

    console.log(req.body);

    // sql query 
    let sql = `INSERT INTO karyawan (nama, alamat, email, password, username, nik, roles) 
    VALUES ('${req.body.nama}', '${req.body.alamat}' ,'${req.body.email}', '${req.body.password}','${req.body.username}','${req.body.nik}','${req.body.roles}')`; 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data inserted');
    });        


});


// Read data 
app.get('/api/read',(req,res)=>{
    // sql query 
    let sql = `SELECT * FROM karyawan`;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})

// Read single data 
app.get('/api/read/:id',(req,res)=>{
    console.log(req.params.id);
    // sql query 
    let sql = `SELECT * FROM karyawan
                WHERE karyawan_id = '${req.params.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });          


});

// update single data 

app.put('/api/update/:id',(req,res)=>{
        console.log(req.params.id);
        // sql query 
        let sql = `UPDATE karyawan SET 
                    alamat = '${req.body.alamat}',
                    email = '${req.body.email}',
                    username = '${req.body.username}',
                    nik = '${req.body.nik}'

                    WHERE karyawan_id = '${req.params.id}'
                    `;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('data updated');
        })            
})


// delete single data 

app.delete('/api/delete/:id',(req,res)=>{

    // sql query 
    let sql = `DELETE FROM karyawan
                WHERE karyawan_id = '${req.params.id}'
                `;
    //    run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('data deleted');
    });         
});















