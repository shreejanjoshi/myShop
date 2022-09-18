import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      {/* And what this path will match is actually going to be a unique string. This string only works when you're trying to say, Hey, I want a parameter here, meaning that you can access it from a component and you say semicolon and then the name of the variable. So I'm going to call it category, and what I'm going to render is the category component. */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
