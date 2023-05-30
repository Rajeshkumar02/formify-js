const regexVal = {
  min: (val) => {
    return new RegExp(`^.{${val},}$`);
  },
  max: (val) => {
    return new RegExp(`^.{0,${val}}$`);
  },
  email: () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  },
  specialCharacters: () => {
    return /^(?=.*[!@#$%^&*])/;
  },
};

export default regexVal;
