import React , { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { deleteUserApi, getUserPaginationApi, searchUsersApi } from "../../apis/Api"; // Import your API functions
import AdminDash from '../../components/AdminDash';
import ReactPaginate from "react-paginate";
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Update
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect(() => {
  //   // Fetch all users when the component mounts
  //   getAllUserApi()
  //     .then((res) => {
  //       setUsers(res.data.users); // Assuming the users are returned in the 'users' field of the response
  //     })
  //     .catch((error) => {
  //       toast.error('Failed to fetch users.');
  //       console.error(error);
  //     });
  // }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);



  const fetchUsers = () => {
    if (searchQuery) {
      searchUsersApi(searchQuery)
      .then((res) => {
        setUsers(res.data);
        setTotalPages(1); 
      })
      .catch((error) => {
        console.error('Error in searchUserApi:', error);
      });
    }else{
    getUserPaginationApi(currentPage).then((res) => {
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages); // Update
    })
    .catch((error) => {
      console.error('Error in getUserPaginationApi:', error);
    });
  }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };



  //delete user Function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete the User?');
    if (!confirmDialog) {
      return;
    } else {
      //make API call to delete user
      deleteUserApi(id)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            window.location.reload();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          toast.error('Failed to delete user.');
          console.error(error);
        });
    }
  };
  const handleSearch = () => {
    setCurrentPage(1); // Reset current page when searching
    fetchUsers();
  };

  return (
    <>
      <div>
        <AdminDash />
      </div>
      <div className="m-4 d-flex justify-content-center">
      <form className="d-flex mx-auto">
              <input
                className="form-control custom-search-lg  border-dark"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  width: "800px",
                  height: "calc(1.5em + 0.75rem + 2px)",
                  borderRadius: "0.25rem",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               />
             <button type="button" className="btn btn-success ms-2" onClick={handleSearch}>
             Search
           </button>
         </form>
         </div>
      <div className="m-4">
        <table className="table mt-2 table-bordered ">
          <thead className="table-light">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.userImageUrl} width="40" height="40" alt="" />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminUser;
