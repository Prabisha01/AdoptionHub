import React, { useState } from "react";
import { createNotificationApi } from "../../apis/Api";
import AdminDash from "../../components/AdminDash";
import { toast } from "react-toastify";

const AdminCreateNotificationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateNotification = async () => {
    try {
      // Calling createNotificationApi function
      const response = await createNotificationApi({ title, description });

      console.log(response.data);
      toast.success("Notification created successfully");
    } catch (error) {
      console.error("Error creating notification:", error.message);
      toast.error("Notification not created");
    }
  };

  return (
    <>
      <div>
        <AdminDash />
      </div>
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4 text-center">Create Notification</h2>

              <div className="border p-4">
                <div className="mb-3">
                  <label className="form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-success w-100"
                  onClick={handleCreateNotification}
                >
                  Create Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreateNotificationPage;
