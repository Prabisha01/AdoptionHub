// AddBlogPage.js
import React, { useState } from "react";
import { createBlogApi } from "../../apis/Api";
import { toast } from "react-toastify";
import AdminDash from "../../components/AdminDash";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setBlogImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  const navigate = useNavigate();

const handleCancel = () => {
  setBlogTitle("");
  setBlogContent("");
  setBlogAuthor("");
  setBlogCategory("");
  setBlogDate("");
  setBlogImage(null);
  setPreviewImage(null);

  // Navigate to the admin page
  navigate("/admin/blog"); 
};

  //handle date
  const handleDateChange = (e) => {
    setBlogDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogContent", blogContent);
    formData.append("blogAuthor", blogAuthor);
    formData.append("blogCategory", blogCategory);
    formData.append("blogDate", blogDate);
    formData.append("blogImage", blogImage);

    

    createBlogApi(formData)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          // Redirect or perform necessary action upon successful addition
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error(err.message);
      });
  };

  return (
    <>
      <div>
        <AdminDash />
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border border-dark p-4">
              <h2 className="text-center mb-4">Add New Blog</h2>
              <form>
                
                <div className="mb-2">
                  <label htmlFor="blogTitle">Blog Title</label>
                  <input
                    onChange={(e) => setBlogTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    id="blogTitle"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="blogContent">Blog Content</label>
                  <textarea
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="form-control"
                    id="blogContent"
                    rows="3"
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label htmlFor="blogAuthor">Blog Author</label>
                  <input
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    type="text"
                    className="form-control"
                    id="blogAuthor"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="blogCategory">Blog Category</label>
                  <select
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="form-control"
                    id="blogCategory"
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Law">Law</option>
                    <option value="Social Work">Social Work</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="blogDate">Blog Date</label>
                  <input
                    onChange={handleDateChange}
                    value={blogDate}
                    type="date"
                    className="form-control"
                    id="blogDate"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="blogImage">Blog Image</label>
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    className="form-control"
                    id="blogImage"
                  />
                  </div>
                  
             


                <div>
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-success me-3"
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                 
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            {previewImage && (
              <img
                src={previewImage}
                className="img-fluid rounded object-fit-cover mt-2"
                alt="blog Image"
              />
            )}
            </div>
        </div>
      </div>
    </>
  );
};

export default AddBlogPage;
