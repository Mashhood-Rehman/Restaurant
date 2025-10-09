import { Link } from "react-router-dom";

const MobileSidebar = ({ navbarSections, userIn, toggleForm, handleLogout, scrollToSection, handleNavlinkScroll }) => {
    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 text-black w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>

            <ul className="menu menu-sm dropdown-content bg-white z-50 mt-3 w-52 p-2 rounded-lg shadow-lg">
                {navbarSections.map((section, index) => (
                    <li key={index} className="relative">
                        <button
                            onClick={() => handleNavlinkScroll(section.id)}
                            className="hover:text-orange-500 text-black text-xl"
                        >
                            {section.name}
                        </button>
                    </li>
                ))}

                {userIn ? (
                    <div>
                        {/* User Info */}
                        <li className="border-t mt-2 pt-2">
                            <div className="flex items-center gap-2 px-2 py-2">
                                {userIn.userData?.profileImg ? (
                                    <img
                                        src={userIn.userData.profileImg}
                                        alt={userIn.userData.name}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                                        {userIn.userData?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{userIn.userData?.name}</span>
                                    <span className="text-xs text-gray-500 truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                                        {userIn.userData?.email}
                                    </span>
                                </div>
                            </div>
                        </li>

                        {/* Orders */}
                        <li>
                            <Link to="/orders" className="w-full text-left">
                                Orders
                            </Link>
                        </li>

                        {/* Logout */}
                        <li>
                            <button
                                className="w-full text-xl text-red-500 hover:text-white hover:bg-red-500 transition duration-300"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </div>
                ) : (
                    <div>
                        <span
                            onClick={toggleForm}
                            className="text-center cursor-pointer"
                        >
                            Login
                        </span>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default MobileSidebar;
