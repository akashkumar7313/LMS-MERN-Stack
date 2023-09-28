import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL]
}));

app.use(cookieParser());


app.use('/ping', function(req, res){
    res.send('/pong');
});

app.all('*',(req, res) => {
    res.status(404).send('OPPS!!! 404 Page Not Found');
})

export default app;