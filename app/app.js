import express from 'express';
import usersRoutes from './routes/users.routes.js'
import bootcampsRoutes from './routes/bootcamps.routes.js'

const app = express();

//middleware
app.use(express.json());

//definir rutas:
app.use('/api', usersRoutes);
app.use('/api/bootcamp', bootcampsRoutes);

app.use("/", (req, res) =>{
  res.send({
      message:'Bienvenido a la API Bootcamp'
  })
})

export default app;