"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getDefaultData() {
  const data = await prisma.category.findMany({
    include: {
      ingredients: true,
    },
  });

  return data;
}

async function getDefaultCategories() {
  const categories = await prisma.category.findMany();
  console.log(categories);
  return categories;
}

async function getDefaultIngredients(category: string) {
  const ingredients = await prisma.ingredient.findMany({
    where: {
      category: {
        name: category,
      },
    },
    select: {
      name: true,
    },
  });

  console.log("ingredients is", ingredients);

  return ingredients;
}

export { getDefaultCategories, getDefaultData, getDefaultIngredients };
