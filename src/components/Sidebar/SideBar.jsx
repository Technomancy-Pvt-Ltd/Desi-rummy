// import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,  
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUsers />,
  },
  {
    path: "/PayOutList",
    name: "Withdrawl Requests",
    icon: <MdOutlinePendingActions />,
  },
  {
    path: "/PayInList",
    name: "Received Payments ",
    icon: <AiOutlineFileDone />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
   
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "270px" : "65px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo text-light"
                >
                  Desi Rummy
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                  // onMouseEnter={() => setHover(route.path)}
                  // onMouseLeave={() => setHover("")}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
   
  );
};

export default SideBar;
