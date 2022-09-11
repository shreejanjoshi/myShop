import { createContext, useState, useEffect } from "react";

//  I'm going to create some kind of helper function that's going to help me find inside of my existing array any items that exist that match the ID of this product. And then if I can find it, I'm going to increment the quantity. Otherwise, I'm going to make a new cart item.
export const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  //   So we're going to get each car item. Then what happens is that we're expected to return a boolean value. And if this boolean value is true, then this method will exit, giving you back the item that returned the true boolean based on the callback. So what we want to say is that only return us back.
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found increment
  // if found a match then wanna return new arry of card item
  //   We want to modify the existing cart items, but we still want to return back a new array because we don't want to mutate our code.
  if (existingCartItem) {
    // ? if match retun this
    // : if not the case
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //  return new arry with modified cartItems / new cart item
  //   so what we'll do is we'll create a new array and we'll spread through all of the existing cart items that we have. But what we're going to add as an additional is we are going to say, okay, I know for sure I need a new product to add, except we're also going to add this quantity of one. That's it.
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  //   this have all things like prodt but add quantity extra
  cartItems: [],
  addItemToCart: () => {},
  // whenever cartitem changes we want to be able to show a new cart count
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // with use effect, we pass it a callback and this callback runs every time something in your dependency or rate changes. So for us I want to change the cart items. Every time this items array changes in any way we need to recalculate the cart count.
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  //   this add item to cart method is going to be a function that triggers whenever a user clicks on this add to cart. So that means that what we're going to receive from the product card is going to be the product to add.
  const addItemToCart = (productToAdd) =>
    // cartItem is just like product / productToAdd is some prop obj that we are adding in this cartItems arry
    setCartItems(addCartItem(cartItems, productToAdd));

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
