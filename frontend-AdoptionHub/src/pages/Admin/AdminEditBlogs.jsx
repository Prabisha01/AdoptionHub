import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlogApi, updateBlogApi } from "../../apis/Api"; // Update with your actual API functions for blogs
import { toast } from "react-toastify";
import AdminDash from "../../components/AdminDash";
import { Link , useNavigate} from 'react-router-dom';

const AdminEdiBlog = () => {
  const { id } = useParams();

  useEffect(() => {
    getSingleBlogApi(id).then((res) => {
      console.log(res.data);
      setBlogTitle(res.data.blog.blogTitle);
      setBlogContent(res.data.blog.blogContent);
      setBlogAuthor(res.data.blog.blogAuthor);
      setBlogCategory(res.data.blog.blogCategory);
      setBlogDate(formatDate(res.data.blog.blogDate)); // Assuming the date needs formatting
      setOldImage(res.data.blog.blogImageUrl);
    });
  }, [id]);
  //format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  //make useState
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogDate, setBlogDate] = useState("");

  //makeuseSatate for image
  const [oldImage, setOldImage] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setBlogImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogTitle, blogContent, blogAuthor, blogCategory, blogDate);
    console.log(blogImage);

    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogContent", blogContent);
    formData.append("blogAuthor", blogAuthor);
    formData.append("blogCategory", blogCategory);
    formData.append("blogDate", blogDate); // Adding blog date to form data
    formData.append("blogImage", blogImage);
    //makeApiCall
    updateBlogApi(id, formData)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          // Redirect or perform necessary action upon successful update
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error(err);
      });
  };

  return (
    <>
      <div>
        <AdminDash />
      </div>
      <div className="comtainer mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border border-dark p-4">
              <h2 className="text-center mb-4">
                Editing Blog : {blogTitle}
                <span className="text-success"></span>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="blogTitle" className="form-label">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="blogTitle"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter Blog Title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="blogAuthor" className="form-label">
                    Blog Author
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="blogAuthor"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    placeholder="Enter Blog Author"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="blogCategory">Blog Category</label>
                  <select
                    className="form-control mb-3"
                    onChange={(e) => setBlogCategory(e.target.value)}
                    value={blogCategory}
                  >
                    <option value={null}>Select Blog Category</option>
                    <option value={"Technology"}>Technology</option>
                    <option value={"Law"}>Law</option>
                    <option value={"Social Work"}>Social Work</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="blogContent" className="form_label">
                    Blog Content
                  </label>
                  <input
                    onChange={(e) => setBlogContent(e.target.value)}
                    value={blogContent}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Blog Content"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="blogDate" className="form_label">
                    Blog Date
                  </label>
                  <input
                    onChange={(e) => setBlogDate(e.target.value)}
                    value={blogDate}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Blog Date"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="blogImage" className="form-label">
                    Blog Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="blogImage"
                    onChange={handleImageUpload}
                  />
                </div>

                <Link
                onClick ={handleSubmit} 
                  className="btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "green")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  to={"/admin/blog"}
                >
                  Update Product
                </Link>
                <Link
                  type="close"
                  className=" btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "green")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  to={"/admin/blog"}
                >
                  Close
                </Link>
              </form>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border border-dark p-4">
              <h6>Old Image</h6>
              <img
                src={oldImage}
                alt=""
                className="object-fit-cover rounded-3"
                height={170}
                width={180}
              />
              <hr />
              {previewImage && (
                <>
                  <h6 className="mt-2">New Image</h6>
                  <img
                    src={previewImage}
                    alt=""
                    className="object-fit-cover rounded-3"
                    height={170}
                    width={180}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEdiBlog;
