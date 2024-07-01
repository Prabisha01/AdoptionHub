import React from "react";

const LandingPage = () => {
  const products = [
    {
      id: 1,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
    {
      id: 2,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
    {
      id: 3,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
    {
      id: 4,
      name: "Chicken Flavour",
      image: "assets/images/product.png",
    },
  ];
  return (
    <>
      <div className="bg-white">
        <div
          className="relative w-full h-[800px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('assets/images/landingpage.png')",
            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute bottom-40 right-0 p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow"
            style={{ border: "solid" }}
          >
            <div className="flex justify-between w-96 text-center">
              <div>
                <div className="font-bold text-3xl">23</div>
                <div className="text-3xl">Adopted</div>
              </div>
              <div>
                <div className="font-bold text-3xl">236</div>
                <div className="text-3xl">Waiting</div>
              </div>
              <div>
                <div className="font-bold text-3xl">45</div>
                <div className="text-3xl">Pet Item</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-6 md:p-20 items-center gap-6 md:gap-24 justify-center">
          <div className="">
            <img
              src="assets/images/cat.png"
              alt="Welcome Cat"
              className="mx-auto rounded-3xl object-cover border-2 border-gray-300"
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-bold text-left text-2xl md:text-4xl">
              Welcome Your New{" "}
              <span className="text-orange-600">Furry Friend</span> into a{" "}
              <br className="hidden md:inline" />
              Loving Home Today
            </h1>
            <p className="mt-4 text-left">
              Discover the Joy of Adopting a Pet and Transforming Your Life with
              Unconditional Love
            </p>
            <div className="flex justify-center md:justify-end mt-8">
              <button className="bg-orange-500 text-white font-bold text-xl md:text-2xl px-4 py-2 w-full md:w-auto rounded hover:bg-orange-600">
                Adopt
              </button>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="font-bold text-2xl md:text-4xl">
            Pamper Your Pet with
            <span className="text-orange-600">Tasty</span> Treats
          </h1>
          <p className="mt-1">Because Your Pet Deserves the Best</p>
        </div>

        <div className="bg-white py-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            Recently Added
          </h2>
          <div className="flex overflow-x-auto no-scrollbar space-x-4 px-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[160px] bg-gray-100 rounded-lg shadow-md p-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-full object-cover rounded-t-lg"
                />
                <div className="text-center mt-2">
                  <p className="text-sm font-medium">{product.name}</p>
                  <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded hover:bg-orange-600 mt-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
