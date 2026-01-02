import express from 'express'
const app=express()

app.get('/',(req,res)=>{
    res.send('I am from your new project')
})
app.listen(7000,()=>{
    console.log('server is listening');
    
})