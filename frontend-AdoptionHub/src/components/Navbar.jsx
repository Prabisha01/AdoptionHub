import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navigation = [
  { name: "Adopt", href: "/", current: false },
  { name: "Shop", href: "#", current: false },
  { name: "Donate", href: "/donation-form", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="p-2 bg-white border-gray-500 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-[#F24E1E] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mr-5">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={"/"}>
                    <img
                      className="h-16 w-auto"
                      src="assets/logo/logo.png"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "text-[#1d1f8d]"
                            : "text-gray-800 hover:text-[#1d1f8d]",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          location.pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              href="#"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              onClick={logout}
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="relative gap-3 ml-1 hidden sm:flex sm:flex-row md:items-center">
                    <Link
                      to="/login"
                      className="w-full bg-[#F24E1E] border-solid text-white px-4 p-2 rounded-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full bg-[#F24E1E] text-white px-4 p-2 rounded"
                    >
                      Donor
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-[#F24E1E] text-white"
                      : "text-gray-800 hover:bg-[#F24E1E] hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// import { useNavigate, NavLink } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const logout = (e) => {
//     e.preventDefault();
//     localStorage.clear();
//     navigate("/login");
//     toast.success("Logged out successfully");
//   };
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <>
//       <nav class="bg-white border-gray-200 dark:bg-gray-900">
//         <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
//           <a
//             class="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <img src="assets/logo/logo.png" class="h-14" alt="Adoption Hub" />
//           </a>
//           <div class="flex items-center space-x-6 rtl:space-x-reverse">
//             <a
//               href="tel:5541251234"
//               class="text-sm text-gray-500 dark:text-white hover:underline"
//             >
//               Profile here
//             </a>
//             <a
//               href="#"
//               class="text-sm px-8 py-2 rounded bg-[#FF8534] hover:bg-[#F24E1E] text-white font-medium"
//             >
//               Donor
//             </a>
//           </div>
//         </div>
//       </nav>
//       <nav class="bg-gray-50 dark:bg-gray-700">
//         <div class="max-w-screen-xl px-4 py-3 mx-auto">
//           <div class="flex items-center">
//             <ul class="flex flex-row mt-0 text-2xl font-semibold space-x-20 rtl:space-x-reverse">
//               {["Home", "Adopt", "Shop", "Event", "Donate", "Contact", "Story"].map((item, index) => (
//                 <li key={index}>
//                   <NavLink
//                     to={`/${item.toLowerCase()}`}
//                     className={({ isActive }) =>
//                       `text-gray-900 dark:text-white hover:underline ${isActive ? "text-blue-800" : ""}`
//                     }
//                     style={({ isActive }) => ({
//                       color: isActive ? '#004AAD' : '',
//                     })}
//                   >
//                     {item}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }