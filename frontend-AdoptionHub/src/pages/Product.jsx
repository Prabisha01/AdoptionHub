import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCartApi,
  addToWishlistApi,
  getUserProductPaginationApi,
  searchProductsApi,
} from "../apis/Api";
import Navbar from "../components/Navbar";
import img1 from "../images/logo.png";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

const Product = () => {
  // useEffect(() => {
  //   // Listen for new notifications
  //   socket.on("new_notification", (notification) => {
  //     console.log("New Notification:", notification);

  //     // Handle the new notification (e.g., update state, show a toast)
  //     // For example, you can use a state management library like Redux
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.off("new_notification");
  //   };
  // }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handlelogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/land");
  };

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = () => {
    if (searchQuery) {
      searchProductsApi(searchQuery)
        .then((res) => {
          if (res.data) {
            setProducts(res.data);
            setTotalPages(1);
          } else {
            setProducts([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error("Error in searchProductsApi:", error);
        });
    } else {
      getUserProductPaginationApi(currentPage)
        .then((res) => {
          if (res.data && res.data.products) {
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
          } else {
            setProducts([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error("Error in getUserProductPaginationApi:", error);
        });
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };

  const handleAdd = (e, plantId) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const data = {
        userId: userId,
        plantId: plantId,
      };

      addToWishlistApi(data)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setWishlistCount((prevCount) => prevCount + 1);
          }
        })
        .catch((err) => {
          toast.error("Server error");
          console.log(err.message);
        });
    } else {
      console.log("User data not found in localstorage");
    }
  };

  const handleAddToCart = (e, plantId) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const data = {
        userId: userId,
        quantity: 1,
        plantId: plantId,
      };

      addToCartApi(data)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setCartCount((prevCount) => prevCount + 1);
          }
        })
        .catch((e) => {
          toast.error(e.message);
          console.log(e);
        });
    } else {
      console.log("User data not found in localstorage");
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset current page when searching
    fetchProducts();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={img1} alt="" style={{ height: "50px", width: "210px" }} />
          </a>
          <ul
            className="navbar-nav"
            style={{ marginLeft: "14rem" }}
            role="search"
          >
            <li className="nav-item">
              <form className="d-flex mx-auto">
                <input
                  className="form-control custom-search-lg  border-dark"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    width: "400px",
                    height: "calc(1.5em + 0.75rem + 2px)",
                    borderRadius: "0.25rem",
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-success ms-2"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
          <form className="navbar-nav ms-auto">
            <li className="nav-item">
              {user ? (
                <>
                  <div
                    className="d-flex align-items-center "
                    style={{ marginLeft: "7rem" }}
                  >
                    <img
                      src={`${user.userImageUrl}`}
                      alt=""
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-light border-0  dropdown-toggle fs-5 text-success "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Welcome{" "}
                        <span className="text-dark">{user.firstName}</span>!
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/profile/edit/${user._id}`}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/changePassword/${user._id}`}
                          >
                            Reset Password
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handlelogout}
                            className="dropdown-item"
                            to="/logout"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-dark rounded-pill me-2 "
                    style={{ marginLeft: "9rem" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-dark rounded-pill  me-3"
                    to={"/signup"}
                  >
                    Register
                  </Link>
                </>
              )}
            </li>
          </form>
          {/* Wishlist and Cart Icons */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className={`nav-link icon-${cartCount > 0 ? "green" : "red"}`}
                href="#"
              >
                <FaShoppingCart
                  className={`text-${cartCount > 0 ? "green" : "red"} fs-5`}
                />
                <span className="visually-hidden">Cart</span>
                <Link
                  className="text-dark ms-1"
                  to="/wishlist"
                  style={{ textDecoration: "none" }}
                >
                  Wishlist {wishlistCount > 0 && <span>({wishlistCount})</span>}
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link icon-green" href="#">
                <FaShoppingCart className="text-green fs-5" />
                <span className="visually-hidden">Cart</span>
                <Link
                  className="text-dark ms-1"
                  to="/addtocart"
                  style={{ textDecoration: "none" }}
                >
                  Cart
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <Navbar />
      </div>

      <div className="container mt-4">
        <h2
          style={{
            color: "green",
            fontSize: "2em",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Available Product
        </h2>
        {products && products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-3">
            {products.map((item) => (
              <div key={item.plantId} className="col">
                <div className="card h-100">
                  <Link
                    to={`/productDetails/${item._id}`}
                    className="card-link"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img
                      src={item.plantImageUrl}
                      className="card-img-top img-fluid"
                      alt={item.plantName}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.plantName}</h5>
                      <p className="card-text">Price: ${item.plantPrice}</p>
                      <p className="card-text">
                        Category: {item.plantCategory}
                      </p>
                      <p className="card-text">
                        Description: {item.plantDescription.slice(0, 50)}
                      </p>
                    </div>
                  </Link>
                  <div className="g-3">
                    <button
                      className="btn btn-success mt-3 me-2"
                      onClick={(e) => {
                        handleAddToCart(e, item._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <button
                      className="btn btn-danger mt-3 me-2"
                      onDoubleClick={(e) => {
                        // Prevent default behavior
                        handleAdd(e, item._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container mt-4">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={paginate}
          containerClassName="pagination justify-content-center"
          activeClassName="page-item active"
          pageLinkClassName="page-link text-success bg-light"
          previousClassName={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          nextClassName={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          previousLinkClassName="page-link text-success"
          nextLinkClassName="page-link text-success"
          breakClassName="page-item"
          breakLinkClassName="page-link text-success"
        />
      </div>
    </>
  );
};

export default Product;
