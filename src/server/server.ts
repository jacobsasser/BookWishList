import express, {
    Request,
    Response,
    NextFunction
  } from 'express';
  
  const app = express();
  
  app.use(express.json());
  

  
  app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    console.log(errorObj);
    return res.status(errorObj.status).json(errorObj.message);
  });
  
  app.listen(3000, () => console.log('server is listening on port 3000'));