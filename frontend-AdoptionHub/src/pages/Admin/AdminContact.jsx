import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { deleteContactApi,  getContactPaginationApi , searchContactsApi } from "../../apis/Api"; // Import your API functions
import AdminDash from '../../components/AdminDash';
import ReactPaginate from "react-paginate";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);

  // useEffect(() => {
  //   // Fetch all contacts when the component mounts
  //   getAllContactApi()
  //     .then((res) => {
  //       setContacts(res.data.contacts); 
  //     })
  //     .catch((error) => {
  //       toast.error('Failed to fetch contacts.');
  //       console.error(error);
  //     });
  // }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [searchQuery, setSearchQuery] = useState('');// Update

  useEffect(() => {
    fetchContacts();
  }, [currentPage]);



  const fetchContacts = () => {
    if (searchQuery) {
      searchContactsApi(searchQuery)
        .then((res) => {
          if (res.data) {
            setContacts(res.data);
            setTotalPages(1);
          } else {
            setContacts([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error('Error in searchContactsApi:', error);
        });
    } else {
      getContactPaginationApi(currentPage)
        .then((res) => {
          if (res.data && res.data.contacts) {
            setContacts(res.data.contacts);
            setTotalPages(res.data.totalPages);
          } else {
            setContacts([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error('Error in getContactPaginationApi:', error);
        });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset current page when searching
    fetchContacts();
  };


  //delete product Function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete the Product?')
    if(!confirmDialog){
      return;
    }else {
      //make api
      deleteContactApi(id).then((res) =>{
        if(res.data.success == true){
          toast.success(res.data.message)
          window.location.reload ()
        }else{
          toast.error(res.data.message)
        }
      })
    }

  }
  return (
    <><div>
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
     
        <table className="table mt-2 table-bordered " >
          <thead className="table-light">
            <tr>
              <th>Contact Name</th>
              <th>Contact Email</th>
              <th>Contact Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td >{contact.contactName}</td>
                <td>{contact.contactEmail}</td>
                <td>{contact.contactMessage}</td>
                <td>
                  <button
                    onClick={() => handleDelete(contact._id)}
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
      </div></>
  );
};

export default AdminContact;
