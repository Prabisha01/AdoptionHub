import React, { useState, useEffect } from "react";
import { createBlogApi, deleteBlogApi,  getBlogPaginationApi , searchBlogsApi} from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminDash from "../../components/AdminDash";
import ReactPaginate from "react-paginate";

//usestate
const AdminBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogDate, setBlogDate] = useState("");

//usestate for image

  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //use state for fetching
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Update
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);


  const fetchBlogs = () => {
    if (searchQuery) {
      searchBlogsApi(searchQuery)
        .then((res) => {
          if (res.data) {
            setBlogs(res.data);
            setTotalPages(1);
          } else {
            setBlogs([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error('Error in searchBlogsApi:', error);
        });
    } else {
      getBlogPaginationApi(currentPage)
        .then((res) => {
          if (res.data && res.data.blogs) {
            setBlogs(res.data.blogs);
            setTotalPages(res.data.totalPages);
          } else {
            setBlogs([]); // Set empty array if no data
            setTotalPages(1);
          }
        })
        .catch((error) => {
          console.error('Error in getBlogPaginationApi:', error);
        });
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };


  //image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setBlogImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  //handle date
  const handleDateChange = (e) => {
    setBlogDate(e.target.value);
  };

  //handle submit

  const handleSubmit = (e) => {
    e.preventDefault();


    //making logical form data

    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogContent", blogContent);
    formData.append("blogAuthor", blogAuthor);
    formData.append("blogCategory", blogCategory);
    formData.append("blogDate", blogDate);
    formData.append("blogImage", blogImage);

    //api call
    createBlogApi(formData)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error(err.message);
      });
  };
//delete function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete the Blog?"
    );
    if (!confirmDialog) {
      return;
    } else {
      deleteBlogApi(id).then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };
  const handleSearch = () => {
    setCurrentPage(1); // Reset current page when searching
    fetchBlogs();
  };


  return (
    <>
    <div>
        <AdminDash/>
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
        <div className="d-flex justify-content-between">
         

        <Link
           type="button"
           className="btn btn-success"
            to={"/admin/addBlog"}
          >
            Add Blog
          </Link>
          </div>


        <table className="table mt-2 table-bordered" >
          <thead className="table-light">
            <tr>
              <th>Blog Image</th>
              <th>Blog Title</th>
              <th>Blog Author</th>
              <th>Blog Date</th>
              <th>Blog Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr>
                <td>
                <img
                      src={blog.blogImageUrl}
                      width={"40"}
                      height={"40"}
                      alt =""
                    />
                </td>
                <td>{blog.blogTitle}</td>
                <td>{blog.blogAuthor}</td>
                <td>{new Date(blog.blogDate).toLocaleDateString()}</td>
                <td>{blog.blogCategory}</td>
                
                <td>
                  <div className="btn-group" role="group">
                  <Link to = {`/admin/up/${blog._id}`} className="btn btn-success">Edit</Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
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

            }

export default AdminBlog;

