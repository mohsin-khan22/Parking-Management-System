const numericOnly = (e) => {
  const key = window.event ? e.which : e.keyCode;
  if ((key < 48 || key > 57) && key !== 46) {
    e.preventDefault();
  }
};

export default numericOnly;
