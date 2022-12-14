import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import logo from "../image/logo.png";
const NavBarList = ({ title, classprops }: any) => {
  return <li className={`m-4 cursor-pointer ${classprops}`}>{title}</li>;
};

const NavBar = () => {
  const [toggleMenu, setToggelMenu] = useState(false);
  return (
    <nav className="w-full flex justify-between md:justify-center items-center text-white text-xl p-4 ">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer " />
      </div>
      <ul className="text-white text-xl  justify-between items-center hidden md:flex list-none flex-row">
        {["market", "exchange", "tutoriak", "wallet"].map(
          (list: any, index: any) => (
            <NavBarList key={list + index} title={list} />
          )
        )}
        <li className="bg-blue-500 px-5 py-3 mx-3 rounded-full cursor-pointer hover:bg-red-500">
          login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className={"text-white sm:hidden cursor-pointer"}
            onClick={() => {
              setToggelMenu(false);
            }}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className={"text-white md:hidden cursor-pointer"}
            onClick={() => {
              setToggelMenu(true);
            }}
          />
        )}
        {toggleMenu && (
          <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in ">
            <li className="text-xl w-full my-3">
              {
                <AiOutlineClose
                  onClick={() => {
                    setToggelMenu(false);
                  }}
                />
              }
            </li>

            {["market", "exchange", "tutoriak", "wallet"].map(
              (list: any, index: any) => (
                <NavBarList key={list + index} title={list} />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
