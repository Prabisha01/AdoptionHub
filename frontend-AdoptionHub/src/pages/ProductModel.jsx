import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProductModal = ({ isOpen, onClose, product, addToCart }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-50"
      id="my-modal"
    >
      <div className="relative bg-white rounded-lg shadow-lg border border-black w-full max-w-[1102px] h-[711px] mx-4 p-6" style={{ borderRadius: '25px' }}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute"
          style={{ top: '29px', right: '27px', fontSize: '1.5rem', color: 'black' }}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="flex justify-center items-center">
            <img
              src={product.productImageUrl}
              alt={product.productName}
              className="rounded-lg"
              style={{ width: '452px', height: '293px' }}
            />
          </div>
          <div className="text-lg">
            <h2 className="text-left font-bold text-gray-800 mb-10" style={{ fontSize: '30px' }}>
              {product.productName}
            </h2>
            <div className="space-y-[17px]">
              <p className="text-left" style={{ fontSize: '25px', marginTop: '41px' }}>
                Price: {product.productPrice} Rs
              </p>
              <p className="text-left" style={{ fontSize: '25px' }}>
                Description: {product.productDescription}
              </p>
              <button
                onClick={() => addToCart(product._id)}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                style={{ fontSize: '25px', marginTop: '20px' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
