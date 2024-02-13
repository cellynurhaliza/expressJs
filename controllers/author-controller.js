const dbConfig = require('../config/db-config');
const mysql = require ('mysql2');
const pool = mysql.createPool (dbConfig);

pool.on('error', (error) => {
    console.log('error');
});

const getAuthors = (req, res) => {
    const { nama } = req.query;
    const { id } = req.params;

    let query = 'SELECT * FROM author;';

    if ( nama != null) {
        query = `SELECT * FROM author WHERE nama LIKE '%${nama}%';`;

        console.log(query);
    }

    pool.getConnection((error, connection) => {
        if(error) throw error;

        connection.query(query, (error, results) => {
            if (error) throw error;

            if(results.length < 1) {
                res.status(404).json({
                    success: false,
                    message: 'Data author tidak ditemukan',
                });
                return;
            }

            sendResponse(res, true, 'Berhasil mengambil data author', results, 200);

            connection.release();
        })
    })
};
const getAuthor = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM author WHERE id = '${id}';`;

    pool.getConnection((error, connection) => {
        if(error) throw error;

        connection.query(query, (error, results) => {
            if (error) throw error;

            if(results.length < 1) {
                res.status(404).json({
                    success: false,
                    message: 'Data Author tidak ditemukan',
                });
                return;
            }
            sendResponse(res, true, 'Berhasil mengambil data author', results, 200);

            connection.release();
        })
    })
};
const addAuthor = (req, res) => {

    const dataAuthor = {
        nama: req.body.nama,
    }

    const query = 'INSERT INTO author SET ? ;';

    pool.getConnection((error, connection) => {
        if (error) throw error;

        connection.query(query, [dataAuthor], (error, results) => {
            if (error) throw error;

            sendResponse(res, true, 'Data author berhasil ditambahkan', results, 200);

            connection.release();
        });
    });
};
const editAuthor = (req, res) => {
    const { id } = req.params;

    const dataAuthor = {
        nama: req.body.nama,
    };

    const query = `UPDATE author SET ? WHERE id = ${id} ;`;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [dataAuthor],(err, results) => {
            if (err) throw err;
            
            if(results.affectedRows < 1) {                          
                res.status(404).json({
                    success: false,
                    message: 'Data author tidak ditemukan',
                });
                return;
            }

            sendResponse(res, true, 'Data author berhasil diedit', results, 200)
        });
        connection.release();
    });
};
const deleteAuthor = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM author WHERE id = ${id}`;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, (err, results) => {
            if (err) throw err;

            if(results.affectedRows < 1) {
                sendResponse(res, false, 'Data author tidak ditemukan', null, 404);
                return;
            }
            sendResponse(res, true, 'Data author berhasil dihapus', results, 200);
        });
    });
};

const sendResponse = (res, success, message, data, statusCode) => res.status(statusCode).json({
    success: success,
    message: message,
    data: data
});

module.exports = {
    getAuthors, 
    getAuthor,
    addAuthor,
    editAuthor,
    deleteAuthor
}