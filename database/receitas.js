const prisma = require("./prisma");

const saveRevenue = (revenue) => {
  return prisma.revenue.create({ data: revenue });
};

const getAllRevenues = (userId) => {
  return prisma.revenue.findMany({ where: { userId: userId } });
};

const getRevenuesById = (id) => {
  return prisma.revenue.findFirst({ where: { id } });
};

const updateRevenue = (id, revenue) => {
  return prisma.revenue.update({
    where: { id },
    data: revenue,
  });
};

const deleteRevenue = (id) => {
  return prisma.revenue.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  saveRevenue,
  getAllRevenues,
  getRevenuesById,
  updateRevenue,
  deleteRevenue,
};
