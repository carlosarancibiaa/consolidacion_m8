import User from '../models/user.model.js';
import Bootcamp from '../models/bootcamp.model.js';

export const createUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    res.status(201).send({
      code: 201,
      message: `User ${newUser.firstName} ${newUser.lastName} created successfully`
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  res.json({ code: 200, message: "Login correcto.", token: req.token });
};

export const findUserById = async (req, res) => {
  try {
    let { id } = req.body
    const userFound = await User.findOne({
      where: { id: id },
      attributes: ['id', 'firstName', 'lastName', 'email'],
      include: {
        model: Bootcamp,
        as: 'bootcamps',
        throught: {
          attributes: []
        },
        attributes: ['id', 'title', 'cue', 'description']
      }
    })
    res.status(201).send({
      code: 201,
      data: userFound || `User with ID: ${id} not found`
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      code: 500,
      message: error.message
    })
  }

}

export const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      include: [
        {
          model: Bootcamp,
          as: 'bootcamps',
          throught: {
            attributes: []
          },
          attributes: ["id", "title", "cue", "description"]
        }
      ],
      where: { status: true }
    });
    res.status(201).send({
      code: 201,
      data: users
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      code: 500,
      message: error.message
    })
  }
}

export const updateUserById = async (req, res) => {
  try {
    let { id, firstName, lastName, email } = req.body;
    let user = await User.findByPk(id)
    if (user) {
      let updatedUser = await User.update(
        {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email
        },
        { where: { id: id } }
      );
      return res.status(201).send(` User with ID: ${updatedUser}  updated successfully: ${firstName} ${lastName} ${email}`)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      code: 500,
      message: error.message
    })
  }
}

export const deleteUserById = async (req, res) => {
  try {
    let { id } = req.body;
    await User.destroy({
      where: {
        id: id
      }
    })
    res.status(201).send(`User with ID: ${id} deleted successfully`)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      code: 500,
      message: error.message
    })
  }
}

export const changeStatus = async (req, res) => {
  try {
    let { id, status } = req.body;
    await User.update(
      { status },
      { where: { id } }
    )
    res.status(201).send(`Status of user with ID: ${id} change successfully`)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      code: 500,
      message: error.message
    })
  }
}