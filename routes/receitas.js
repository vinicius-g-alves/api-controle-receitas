const express = require("express");
const {
  saveRevenue,
  getAllRevenues,
  getRevenuesById,
  updateRevenue,
  deleteRevenue,
} = require("../database/receitas");
const { getUserById } = require("../database/user");

const router = express.Router();

router.post("/revenue", async (req, res) => {
  const { name, description, preparationTime } = req.body;
  const userId = req.userId;

  const user = await getUserById(userId);
  const newRecipe = {
    name,
    description,
    preparationTime,
    userId: user.id,
  };

  const savedRevenue = await saveRevenue(newRecipe);

  res.json({ Recipe: savedRevenue });
});

// Rota para obter todas as receitas de um usuário
router.get("/revenue", async (req, res) => {
  const userId = req.userId;
  const userRevenue = await getAllRevenues(userId);

  res.json(userRevenue);
});

// Rota para atualizar uma receita
router.put("/revenue/:id", async (req, res) => {
  const recipeId = Number(req.params.id);
  const userId = res;
  const recipe = await getRevenuesById(recipeId);

  if (!recipe || recipe.userId !== userId) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  const { name, description, preparationTime } = req.body;

  const newRevenue = { name, description, preparationTime };

  const updatedRevenue = await updateRevenue(recipeId, newRevenue);

  res.json({ updatedRevenue });
});

// Rota para deletar uma receita
router.delete("/revenue/:id", async (req, res) => {
  const recipeId = parseInt(req.params.id);

  const recipe = await getRevenuesById(recipeId);

  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  const deletedRevenue = await deleteRevenue(recipeId);

  res.json({ deletedRevenue });
});

module.exports = router;
