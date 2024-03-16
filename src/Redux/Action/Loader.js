const Loader = (value) => {
  console.log(value);
  if (!value) {
    document.getElementById("Loader").classList.add("hidden");
  }
  if (value) {
    document.getElementById("Loader").classList.remove("hidden");
  }
};

export default Loader;