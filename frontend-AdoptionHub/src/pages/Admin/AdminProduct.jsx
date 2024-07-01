import React, { useState, useEffect } from "react";
import { createProductApi, deleteProductApi, getProductPaginationApi, searchProductsApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminDash from "../../components/AdminDash";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const AdminProductDashboard = () => {
  // make useState
  const [plantName, setProductName] = useState("");
  const [plantPrice, setProductPrice] = useState("");
  const [plantCategory, setProductCategory] = useState("");
  const [plantDescription, setProductDescription] = useState("");

  // Make useState for image
  const [plantImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [plantImage1, setProductImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);

  const [plantImage2, setProductImage2] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const [plantImage3, setProductImage3] = useState(null);
  const [previewImage3, setPreviewImage3] = useState(null);

  const [plantImage4, setProductImage4] = useState(null);
  const [previewImage4, setPreviewImage4] = useState(null);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Update
  const [searchQuery, setSearchQuery] = useState('');
  // useEffect(() => {
  //   getAllProductApi().then((res) => {
  //     setProducts(res.data.products);
  //   });
  // }, []);
  useEffect(() => {
    fetchProduct();
  }, [currentPage]);


  const fetchProduct = () => {
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
          console.error('Error in searchProductsApi:', error);
        });
    } else {
      getProductPaginationApi(currentPage)
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
          console.error('Error in getProductPaginationApi:', error);
        });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };


  const handleSearch = () => {
    setCurrentPage(1); // Reset current page when searching
    fetchProduct();
  };

  const handleImageUpload = (event) => {
    const mainImageFile = event.target.files[0];
    setProductImage(mainImageFile);
    setPreviewImage(URL.createObjectURL(mainImageFile));

    const additionalFiles = event.target.files.slice(1, 5);
    setProductImage1(additionalFiles[0]);
    setPreviewImage1(URL.createObjectURL(additionalFiles[0]));

    setProductImage2(additionalFiles[1]);
    setPreviewImage2(URL.createObjectURL(additionalFiles[1]));

    setProductImage3(additionalFiles[2]);
    setPreviewImage3(URL.createObjectURL(additionalFiles[2]));

    setProductImage4(additionalFiles[3]);
    setPreviewImage4(URL.createObjectURL(additionalFiles[3]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("plantName", plantName);
    formData.append("plantPrice", plantPrice);
    formData.append("plantCategory", plantCategory);
    formData.append("plantDescription", plantDescription);
    formData.append("plantImage", plantImage);
    formData.append("plantImage1", plantImage1);
    formData.append("plantImage2", plantImage2);
    formData.append("plantImage3", plantImage3);
    formData.append("plantImage4", plantImage4);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete the Product?"
    );
    if (!confirmDialog) {
      return;
    } else {
      deleteProductApi(id).then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      });
    }
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
        <div className="d-flex justify-content-between mb-3">
          <Link
            type="button"
            className="btn btn-success"
            to={"/admin/addProduct"}
          >
            Add Product
          </Link>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
          {products.map((item, index) => (
            <div key={item._id} className="col mb-2">
              <div className="card">
                <img
                  src={item.plantImageUrl}
                  className="card-img-top main-img border"
                  alt={item.plantName}
                  style={{ height: "130px", width: "100%", objectFit: "cover" }}
                />

                <div className="additional-images-container row mt-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="col-md-3">
                      <img
                        src={item[`plantImageUrl${index}`]}
                        className="additional-img border img-thumbnail"
                        alt={`Additional ${index} for ${item.plantName}`}
                        style={{ height: "50px", width: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="card-body">
                  <h5 className="card-title font-weight-bold">{item.plantName}</h5>
                  <p className="card-text font-weight-bold">Price: {item.plantPrice}</p>
                  <p className="card-text font-weight-bold">Category: {item.plantCategory}</p>
                  <p className="card-text font-weight-bold">
                    Description: {item.plantDescription}
                  </p>
                </div>

                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link
                        to={`/admin/edi/${item._id}`}
                        className="btn btn-success"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    </>
  );
};
export default AdminProductDashboard;
