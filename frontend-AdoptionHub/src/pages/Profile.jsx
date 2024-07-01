import React, { useEffect, useState } from "react";
import UpNavbar from "../components/UpNavbar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { getSingleUserApi, updateUserApi } from "../apis/Api";
import { Link , useNavigate, useParams} from 'react-router-dom';

const Profile = () => {
  //receive user id from url
  const { id } = useParams()


  //useEffect to fetch user details
  useEffect(() => {
    getSingleUserApi(id).then((res) => {
      console.log(res.data);
      setfirstName(res.data.user.firstName);
      setlastName(res.data.user.lastName);
      setemail(res.data.user.email);
      setpassword(res.data.user.password);
      setOldImage(res.data.user.userImageUrl);
    });
  }, [id]);

  //make useState
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //make useState for image
  const [oldImage, setOldImage] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    console.log(userImage);

    // make a form data
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userImage", userImage);
    // make api call
    updateUserApi(id, formData)
      .then((res) => {
        // res.send
        if (res.data.success == true) {
          toast.success(res.data.message);
          // navigate('/admin/dashboard')
        
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
        <UpNavbar />
        <div>
          <Navbar />
        </div>
      </div>
      <div className="comtainer mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="border border-dark p-4">
              <h2 className="text-center mb-4">
                Editing User : {firstName}
                <span className="text-success"></span>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    className="form-control mb-3"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="Enter Last Name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form_label">
                    Email
                  </label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="userImage" className="form-label">
                    User Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="userImage"
                    onChange={handleImageUpload}
                  />
                </div>
                {/* {previewImage && (
                        <img
                            src={previewImage}
                            alt="Product Preview"
                            className="img-fluid rounded"
                            style={{ maxHeight: "180px" }} />
                    )} */}

                <Link
                  onClick={handleSubmit}
                  className="btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "green")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  to={"/home"}
                >
                  Update User
                </Link>
                <Link
                  type="close"
                  className=" btn btn-outline-dark rounded-pill me-2"
                  style={{ transition: "0.3s" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "green")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  to={"/home"}
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

export default Profile;
