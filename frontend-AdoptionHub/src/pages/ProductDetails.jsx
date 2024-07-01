import React, { useState, useEffect } from "react";
import { useParams ,Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import UpNavbar from "../components/UpNavbar";
import { getSingleProductApi } from "../apis/Api"; //api
import wall from "../images/wall.jpg";

const ProductDetails = () => {
  const { id } = useParams();

  // State variables
  const [plantName, setProductName] = useState("");
  const [plantPrice, setProductPrice] = useState("");
  const [plantCategory, setProductCategory] = useState("");
  const [plantDescription, setProductDescription] = useState("");
  const [plantImageURLs, setProductImageURLs] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    // api call
    getSingleProductApi(id).then((res) => {
      setProductName(res.data.product.plantName);
      setProductPrice(res.data.product.plantPrice);
      setProductCategory(res.data.product.plantCategory);
      setProductDescription(res.data.product.plantDescription);
      setProductImageURLs([
        res.data.product.plantImageUrl,
        res.data.product.plantImageUrl1,
        res.data.product.plantImageUrl2,
        res.data.product.plantImageUrl3,
        res.data.product.plantImageUrl4,
      ]);
      setSelectedImage(res.data.product.plantImageUrl);
    });
  }, [id]);

  const bgImage = {
    backgroundImage: `url(${wall})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "81vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

return (
    <div>
      <UpNavbar />
      <Navbar />
  
      <div style={bgImage}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: "8px",
            width: "1000px",
            border: "2px solid green",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Left Section */}
          <div
            style={{
              width: "420px",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                height: "400px",
                overflow: "hidden",
                position: "relative",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <img
                src={selectedImage}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                alt="Product"
              />
            </div>
            {/* Small Images */}
            <div style={{ display: "flex", marginTop: "10px" }}>
              {plantImageURLs.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    marginRight: "5px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    border: selectedImage === image ? "2px solid green" : "none",
                  }}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
  
          {/* Right Section */}
          <div>
            {/* Product Details */}
            <div>
              <h2 style={{ marginBottom: "10px" }}>{plantName}</h2>
              <p style={{ color: "#888", marginBottom: "8px", fontSize: "1em" }}>Category: {plantCategory}</p>
              <p style={{ fontSize: "1.2em", marginBottom: "12px" }}>Description: {plantDescription}</p>
              <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>Price: {plantPrice}</p>
            </div>
            <Link
                type="close"
                className=" btn btn-outline-dark  me-4 mr-auto"
                style={{ transition: "0.3s" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "green")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                to={"/products"}
              >
                Close
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
  };
  
  export default ProductDetails;
  