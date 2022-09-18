import { createContext, useState, useEffect } from "react";

//  I'm going to create some kind of helper function that's going to help me find inside of my existing array any items that exist that match the ID of this product. And then if I can find it, I'm going to increment the quantity. Otherwise, I'm going to make a new cart item.
const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //  check if quantity is equal to 1, if it is reomve that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  //  return back cartitems withmatching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  //   this have all things like prodt but add quantity extra
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  // whenever cartitem changes we want to be able to show a new cart count
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // with use effect, we pass it a callback and this callback runs every time something in your dependency or rate changes. So for us I want to change the cart items. Every time this items array changes in any way we need to recalculate the cart count.
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  //   this add item to cart method is going to be a function that triggers whenever a user clicks on this add to cart. So that means that what we're going to receive from the product card is going to be the product to add.
  const addItemToCart = (productToAdd) => {
    // cartItem is just like product / productToAdd is some prop obj that we are adding in this cartItems arry
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
