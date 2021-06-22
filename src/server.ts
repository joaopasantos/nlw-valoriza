import express, { response } from 'express';

const app = express();

app.get("/teste-get", (request, response) => {
    return response.send("Olá!")
})

app.post("/teste-post", (request, response) => {
    return response.send("Postado, fella!")
})

app.listen(3000,
    () => console.log("Server is running."));