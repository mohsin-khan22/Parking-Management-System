const phoneNumber = (e) => {
  console.log(e);
  const key = window.event ? e.which : e.keyCode;
  if (key !== 43 && (key < 48 || key > 57)) {
    e.preventDefault();
  }
};

export default phoneNumber;
