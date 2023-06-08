const prisma = require("./prisma");

const saveUser = (user) => {
  return prisma.user.create({ data: user });
};

const getAllUsers = () => {
  return prisma.user.findMany();
};

const getUserByEmail = (email) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};

const getUserById = (id) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
};

const updateUser = (id, user) => {
  return prisma.user.update({
    where: { id: id },
    data: user,
  });
};

module.exports = {
  saveUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
};
