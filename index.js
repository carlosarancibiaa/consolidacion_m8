import sequelize from './app/config/db.config.js';
import app from './app/app.js';

import './app/models/associations.model.js'// el archivo associatiosn.js no es usado por ningun controlador por lo que es necesario importarlo aca en el index

const main = async() => {
  try{
    await sequelize.authenticate();
    await sequelize.sync({
      force: false,
      alter: true
    });

    let PORT = 3000;
    app.listen(PORT, ()=>{
      console.log(`Servidor escuchando en http://localhost: ${PORT}`)
    });
  }catch(error){
    console.log('Ha ocurrido un error', error);
  }
};

main();