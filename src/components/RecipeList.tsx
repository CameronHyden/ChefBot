import { useEffect, useState } from "react";
import { getRecipes } from "../api/api";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
}

export const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes().then(res => setRecipes(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map(r => (
          <li key={r.id}>
            <h3>{r.title}</h3>
            <p>{r.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
