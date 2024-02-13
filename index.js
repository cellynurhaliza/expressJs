//import
const express = require('express');
const bookRouter = require('./router/book-router');
const authorRouter = require('./router/author-router');
const authRouter = require('./router/auth-router');
const authenticateJWT = require('./middleware/jwt-auth-middleware');
// const bookController = require('./controllers/book-controller');
//instansiasi
var cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json())
// const { handler, handleHome, handleAbout, handleContact, handleNews } = require('./router.js');


// HTTP Method: Get, Post(ngirim data), Put/PATCH(mengedit data yang sudah ada), Delete

// URL Root
// localhost:3000/contohparam/cel?sort=asc
// const siswa = [ 
//     {
//         id: 1,
//         nama: 'Celly',
//     },
//     {
//         id: 2,
//         nama: 'Nurha',
//     },
//     {
//         id: 3,
//         nama: 'Liza',
//     },
// ];

// app.post('/test', (req,res) => {
//     res.send('POST test nodemon');
// });
// app.put('/test', (req,res) => {
//     res.send('PUT test');
// });
// app.delete('/test', (req,res) => {
//     res.send('DELETE test');
// });

// app.get('/siswa/:id/', (req,res) => {
//     const { id } = req.params;
//     const student = siswa.find((student) => 
//     student.id == parseInt(id))
//     res.send(student.nama);
// });
// app.get('/contohparam/:username', (req,res) => {
//     //const username = req.params.username
//     //const test = req.params.test
//     //const id = req.params.id
//     // const {username, id} = req.params;
//     const { sort } = req.query;
//     res.send(sort ?? 'desc');
//     // res.send(req.params.username);
// });

// app.get('/', handler);
// app.get('/home', handleHome);
// app.get('/about', handleAbout );
// app.get('/contact', handleContact);
// app.get('/news', handleNews);
// app.get('/', (req, res) => {
//     res.send('<h1>Welcome to Express</h1>');
// }); 

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/book',authenticateJWT, bookRouter);
app.use('/author', authorRouter);
app.use('/auth', authRouter);

// app.get('/book', bookController.getBooks);
// app.get('/book/:id', bookController.getBook);
// app.post('/book', bookController.addBook);
// app.put('/book/:id', bookController.editBook);
// app.delete('/book/:id', bookController.deleteBook);
app.listen(3000, () => {
    console.log(`Server berjalan di http://localhost:3000`);
});