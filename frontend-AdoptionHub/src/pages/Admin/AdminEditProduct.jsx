import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductApi, updateProductApi } from "../../apis/Api";
import { toast } from "react-toastify";
import AdminDash from "../../components/AdminDash";
import { Link } from "react-router-dom";

const AdminEditProduct = () => {
  const { id } = useParams();

  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      const product = res.data.product;
      setProductName(product.plantName);
      setProductPrice(product.plantPrice);
      setProductCategory(product.plantCategory);
      setProductDescription(product.plantDescription);
      setImages([
        product.plantImageUrl,
        product.plantImageUrl1,
        product.plantImageUrl2,
        product.plantImageUrl3,
        product.plantImageUrl4,
      ]);
    });
  }, [id]);

  const [plantName, setProductName] = useState("");
  const [plantPrice, setProductPrice] = useState("");
  const [plantCategory, setProductCategory] = useState("");
  const [plantDescription, setProductDescription] = useState("");
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [newImages, setNewImages] = useState([null, null, null, null, null]);

  const handleImageUpload = (event, imageIndex) => {
    const file = event.target.files[0];

    setNewImages((prevImages) =>
      prevImages.map((image, index) =>
        index === imageIndex ? file : image
      )
    );

    setImages((prevImages) =>
      prevImages.map((image, index) =>
        index === imageIndex ? URL.createObjectURL(file) : image
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("plantName", plantName);
    formData.append("plantPrice", plantPrice);
    formData.append("plantCategory", plantCategory);
    formData.append("plantDescription", plantDescription);

    newImages.forEach((image, index) => {
      if (image) {
        formData.append(`plantImage${index}`, image);
      }
    });

    updateProductApi(id, formData)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
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
              <h2 className="text-center mb-4">
                Editing Product : {plantName}
                <span className="text-success"></span>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="plantName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="plantName"
                    value={plantName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="plantPrice" className="form-label">
                    Product Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="plantName"
                    value={plantPrice}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="plantDescription">Product Category</label>
                  <select
                    className="form-control mb-3"
                    onChange={(e) => setProductCategory(e.target.value)}
                    value={plantCategory}
                  >
                    <option value={null}>Select Product Category</option>
                    <option value={"Angiosperm"}>Angiosperm</option>
                    <option value={"Gymnosperm"}>Gymnosperm</option>
                    <option value={"Thallophyta"}>Thallophyta</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="plantDescription" className="form_label">
                    Product Description
                  </label>
                  <input
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={plantDescription}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Product Description"
                  />
                </div>

                {images.map((oldImage, index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={`plantImage${index}`} className="form-label">
                      {`Product Image ${index + 1}`}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id={`plantImage${index}`}
                      onChange={(e) => handleImageUpload(e, index)}
                    />
                    
                  </div>
                ))}

                <Link
                  onClick={handleSubmit}
                  className="btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "green")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  to={"/admin/product"}
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
                  to={"/admin/product"}
                >
                  Close
                </Link>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="me-3">
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="img-fluid rounded mt-2"
                    style={{ maxHeight: "100px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditProduct;