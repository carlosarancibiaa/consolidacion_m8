import User from '../models/user.model.js';
import Bootcamp from '../models/bootcamp.model.js';

export const createBootcamp = async (req, res) => {
  try {
    let { title, cue, description } = req.body;

    const newBootcamp = await Bootcamp.create({
      title,
      cue,
      description
    })
    res.status(201).send({
      code: 201,
      message: `Bootcamp ${newBootcamp.title} created successfully`
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: 500,
      message: error.message
    })
  }
}
export const addUser = async (req, res) => {
  try {
    let { idBootcamp, idUser } = req.body;
    let user = await User.findByPk(idUser)
    let bootcamp = await Bootcamp.findByPk(idBootcamp)
    if (!user || !bootcamp) {
      res.status(404).send({
        code: 404,
        message: 'User not found',
      })
    }
    await bootcamp.addUser(user)
    res.status(201).send({
      code: 201,
      message: `User ${user.firstName} with ID: ${user.id} added successfully ${bootcamp.title}.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: 500,
      message: error.message
    })
  }
}
export const findById = async (req, res) => {
  try {
    let { id } = req.body;
    let bootcampFound = await Bootcamp.findOne({
      where: { id },
      attributes: ['id', 'title', 'cue', 'description'],
      include: {
        model: User,
        as: "users",
        through: { attributes: [] },
        attributes: ['id', 'firstName', 'lastName', 'email']
      },
    })
    if (!bootcampFound) {
      res.status(404).send({
        code: 404,
        message: `Bootcamp with ID: ${id} not found`
      })
    } else {
      return res.status(201).send({
        code: 201,
        data: bootcampFound
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      message: error.message
    })
  }
}
export const findAll = async (req, res) => {
  try {
    let allBootcamps = await Bootcamp.findAll({
      attributes: ['id', 'title', 'cue', 'description'],
      include: [
        {
          model: User,
          as: 'users',
          throught: {attributes: []},
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });
    if (!allBootcamps) {
      res.status(404).send({
        code: 404,
        message: `Bootcapms have not been created`
      })
    } else {
      res.status(201).send({
        code: 201,
        data: allBootcamps
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      message: error.message
    })
  }
}