const checkTokenValidity = () => {
  const tokenData = JSON.parse(localStorage.getItem('userData'));

  if (tokenData) {
    const currentDate = new Date();
    const expiryDate = new Date(tokenData.expiry);

    if (currentDate > expiryDate) {
      localStorage.removeItem('userData');
      // console.log("Token has expired, logging out...");
      return false;
    } else {
      // console.log("User is still logged in");
      return true;
    }
  }
  else {
    // console.log("User is not logged in");
    return false;
  }
};

export default checkTokenValidity;