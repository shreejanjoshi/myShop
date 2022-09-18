// Now what we also need once we get this category value, if you think about it, once we get jackets, well we need to call jackets on our categories map to get the associated products to this category. So that means that we need to now bring in the context.
import { useContext, useState, useEffect, Fragment } from "react";
// Use params now will allow us to actually get this value and the way it gives it to us is it actually gives us to it as an object. shop componenet
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, Title } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {/* if products is undefined, then don't render it, only render products */}
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
