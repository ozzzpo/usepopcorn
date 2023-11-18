import logo from "./img/popcorn.png";

export default function Logo() {
  return (
    <div className='logo'>
      <img src={logo} alt='#' style={{ width: "40px" }} />
      <h1>usePopcorn</h1>
    </div>
  );
}
