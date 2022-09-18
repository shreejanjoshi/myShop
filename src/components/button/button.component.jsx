import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

// And what Get button should do is it should take the button type string and it should return us back one of these three button components because remember, these are individual components now.
// Then what I'm going to do is I'm going to say, okay, the button types default value, if none is past, is button type classes base.
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  // And then what I'm going to do is I'm going to return back from a special map object, and this map object is going to be past the button type value.
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
