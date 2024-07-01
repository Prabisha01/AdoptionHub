import React, { useState } from 'react'
import AdminDash from "../../components/AdminDash";
import { createProductApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  
    // make useState
  const [plantName, setProductName] = useState("");
  const [plantPrice, setProductPrice] = useState("");
  const [plantCategory, setProductCategory] = useState("");
  const [plantDescription, setProductDescription] = useState("");

  // Make useState for image
  const [plantImageUrl, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [plantImageUrl1, setProductImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);

  const [plantImageUrl2, setProductImage2] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const [plantImageUrl3, setProductImage3] = useState(null);
  const [previewImage3, setPreviewImage3] = useState(null);

  const [plantImageUrl4, setProductImage4] = useState(null);
  const [previewImage4, setPreviewImage4] = useState(null);

  const handleImageUpload = (event, setImage, setPreview) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/product');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('plantName', plantName);
    formData.append('plantPrice', plantPrice);
    formData.append('plantCategory', plantCategory);
    formData.append('plantDescription', plantDescription);
    formData.append('plantImageUrl', plantImageUrl);
    formData.append('plantImageUrl1', plantImageUrl1);
    formData.append('plantImageUrl2', plantImageUrl2);
    formData.append('plantImageUrl3', plantImageUrl3);
    formData.append('plantImageUrl4', plantImageUrl4);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error('Server Error');
        console.log(err.message);
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
              <h2 className="text-center mb-4">Add New Product</h2>
              <form>
                <div className="mb-2">
                  <label>Product Name</label>
                  <input
                    onChange={(e) => setProductName(e.target.value)}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter product name"
                  />

                  <label>Product Price</label>
                  <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter product price"
                  />

                  <label>Product Category</label>
                  <select
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="form-control mb-2"
                  >
                    <option value="Angiosperm">Angiosperm</option>
                    <option value="Gymnosperm">Gymnosperm</option>
                    <option value="Thallophyta">Thallophyta</option>
                  </select>

                  <label>Product Description</label>
                  <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    name=""
                    id=""
                    cols="3"
                    rows="3"
                    className="form-control"
                    placeholder="Enter description"
                  />
                                   <label>Product Image</label>
                  <input
                    onChange={(e) => handleImageUpload(e, setProductImage, setPreviewImage)}
                    type="file"
                    className="form-control mb-2"
                  />

                  <label>Additional Images</label>
                  <input
                    onChange={(e) => handleImageUpload(e, setProductImage1, setPreviewImage1)}
                    type="file"
                    className="form-control mb-2"
                  />
                  <input
                    onChange={(e) => handleImageUpload(e, setProductImage2, setPreviewImage2)}
                    type="file"
                    className="form-control mb-2"
                  />
                  <input
                    onChange={(e) => handleImageUpload(e, setProductImage3, setPreviewImage3)}
                    type="file"
                    className="form-control mb-2"
                  />
                  <input
                    onChange={(e) => handleImageUpload(e, setProductImage4, setPreviewImage4)}
                    type="file"
                    className="form-control mb-2"
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
                alt="main product"
                style={{ maxHeight: '200px', maxWidth: '200px' }}
              />
            )}
            {previewImage1 && (
              <img
                src={previewImage1}
                className="img-fluid rounded object-fit-cover mt-2"
                alt="additional product 1"
                style={{ maxHeight: '200px', maxWidth: '200px' }}
              />
            )}
            {previewImage2 && (
              <img
                src={previewImage2}
                className="img-fluid rounded object-fit-cover mt-2"
                alt="additional product 2"
                style={{ maxHeight: '200px', maxWidth: '200px' }}
              />
            )}
            {previewImage3 && (
              <img
                src={previewImage3}
                className="img-fluid rounded object-fit-cover mt-2"
                alt="additional product 3"
                style={{ maxHeight: '200px', maxWidth: '200px' }}
              />
            )}
            {previewImage4 && (
              <img
                src={previewImage4}
                className="img-fluid rounded object-fit-cover mt-2"
                alt="additional product 4"
                style={{ maxHeight: '200px', maxWidth: '200px' }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;