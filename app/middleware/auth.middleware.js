import jwt from "jsonwebtoken";
import Usuario from "../models/user.model.js"

export const emitToken = async (req, res, next) => {
  try {
    let { email, password } = req.body;
  let usuario = await Usuario.findOne({
    where: { email, password },
    attributes: ["id", "nombre", "rut", "email", "admin"],
  });

  if (!usuario) {
    return res
      .status(400)
      .json({ code: 400, message: "Error de autenticación." });
  }
  let token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: usuario,
    },
    process.env.PASSWORD_SECRET
  );
  req.token = token;
  next();
  } catch (error) {
    console.log(`Algo salió mal: ${error} `)
  }
  
};

export const verifyToken = (req, res, next) => {
  try {
    let { token } = req.query;
    console.log(token);
    if (!token) {
      token = req.headers["authorization"];
      if (!token)
        return res
          .status(400)
          .send(
            "ruta protegida, debe proporcionar un token de acceso."
          );
      token = token.split(" ")[1];
      console.log(token);
      if (token.length == 0) {
        throw new Error("No se ha proporcionado un token");
      }
    }

    jwt.verify(
      token,
      process.env.PASSWORD_SECRET,
      async (error, decoded) => {
        console.log("decoded", decoded);
        if (error) {
          return res.status(401).json({
            code: 401,
            message:
              "debe proporcionar un token válido / su token puede estar expirado.",
          });
        }

        try {
          let usuario = await Usuario.findByPk(decoded.data.id, {
            attributes: ["id", "nombre", "rut", "email", "admin"],
          });
          if (!usuario) {
            return res.status(400).json({
              code: 400,
              message: "Usuario ya no existe en el sistema.",
            });
          }
          req.usuario = usuario;
          next();
        } catch (error) {
          res.status(500).json({ code: 500, message: "Error en autencicación." })
        }
      }
    );
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: error.message,
    });
  }
};

export const validarAdmin = async (req, res, next) => {
  let usuario = req.usuario;

  if (!usuario.admin) {
    return res.status(403).json({
      code: 403,
      message: "Usted no tiene los permisos necesarios para continuar.",
    });
  }
  next();
};