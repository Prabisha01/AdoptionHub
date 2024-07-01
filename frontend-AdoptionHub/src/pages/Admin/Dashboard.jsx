import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComments,
  faBox,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";
import AdminDash from "../../components/AdminDash";
import {
  getUserCountApi,
  getContactCountApi,
  getBlogCountApi,
  getProductsCountApi,
  getAllOrder,
} from "../../apis/Api";

const AdminDashboard = () => {
  const [totalUsersCount, setTotalUserCount] = useState(0);
  const [totalBlogsCount, setTotalBlogCount] = useState(0);
  const [totalContactsCount, setTotalContactCount] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserCountApi()
      .then((res) => {
        if (res.data.success) {
          setTotalUserCount(res.data.totalUsersCount);
        } else {
          console.error("Error fetching total user count:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching total user count:", error);
      });

    getBlogCountApi()
      .then((res) => {
        if (res.data.success) {
          setTotalBlogCount(res.data.totalBlogsCount);
        } else {
          console.error("Error fetching total blog count:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching total blog count:", error);
      });

    getContactCountApi()
      .then((res) => {
        if (res.data.success) {
          setTotalContactCount(res.data.totalContactsCount);
        } else {
          console.error(
            "Error fetching total contact count:",
            res.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching total contact count:", error);
      });

    getProductsCountApi()
      .then((res) => {
        if (res.data.success) {
          setTotalProductsCount(res.data.totalProductsCount);
        } else {
          console.error(
            "Error fetching total products count:",
            res.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching total products count:", error);
      });

    getAllOrder()
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          console.error("Error fetching orders:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const organizedOrders = {};
  orders.forEach((order) => {
    if (!organizedOrders[order.orderId]) {
      organizedOrders[order.orderId] = [];
    }
    const existingItem = organizedOrders[order.orderId].find(
      (item) => item.productId === order.productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      organizedOrders[order.orderId].push({ ...order, quantity: 1 });
    }
  });

  return (
    <>
      <div>
        <AdminDash />
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card h-100 bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Users
                </h5>
                <p className="card-text">Total Users: {totalUsersCount}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card h-100 bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faBox} className="me-2" />
                  Products
                </h5>
                <p className="card-text">
                  Total Products: {totalProductsCount}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card h-100 bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faBlog} className="me-2" />
                  Blogs
                </h5>
                <p className="card-text">Total Blogs: {totalBlogsCount}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card h-100 bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faComments} className="me-2" />
                  Messages
                </h5>
                <p className="card-text">
                  Total Messages: {totalContactsCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
