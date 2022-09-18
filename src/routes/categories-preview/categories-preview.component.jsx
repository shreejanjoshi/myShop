import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {/* You can do object keys, which will essentially allow you to pass this an object itself, and it will return you back an array of the keys. So here I can say, hey, let me give you the categories map. And what this will give us back is an array of all of these key values. So it's an array of strings where it contains hats, jackets, men's. Sneakers, women's. */}
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
