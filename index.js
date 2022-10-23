import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dante123',
    database: 'test'
})

app.use(express.json())
app.use(cors())


app.get('/', (req,res)=>{
    res.json('This is the backend')
})
app.get('/books', (req,res)=>{
    const q = 'SELECT * FROM books'
    db.query(q , (err, data)=>{
       if(err) return res.json(err)
       return res.json(data)
    })
})
app.post('/books', (req,res)=>{
    const q = 'INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES (?)';
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ]
    db.query(q, [values],(err, data)=>{
        if (err) return res.json(err)
        return console.log('Book added')
    })
})

app.delete('/books:id', (req,res)=>{
    const bookId = req.params.id;
    const q = 'DELETE FROM books WHERE id = ?'
    db.query(q, bookId, (err,data)=>{
        if (err) return res.json(err)
        return console.log('Book deleted')
    })
})
// app.put('/books:id', (req,res)=>{
//     const bookId = req.params.id;
//     const q = 'UPDATE books SET `title`= ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?'
//     const values = [
//         req.body.title,
//         req.body.description,
//         req.body.cover,
//         req.body.price
//     ]
//     db.query(q, [...values, bookId], (err,data)=>{
//         if (err) return res.json(err)
//         return console.log('Book Updated')
//     })
// })

app.put('/books:id', (req,res)=>{
    const bookId = req.params.id;
    const q = 'UPDATE books SET `title`= ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?'
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ]
    
    db.query(q, [...values, bookId], (err,data)=>{
        if (err) return res.json(err)
        return console.log('Book Updated')
    })
})



app.listen(8800, ()=>{
    console.log('backend running')
})

