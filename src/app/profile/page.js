"use client";
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import React, { useState }  from 'react'

export default function page() {

   // 👁 password toggle states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      <Header2 />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card profile-card p-4">
              <h4 className="mb-4 fw-bold text-center">My Profile</h4>
              <form>
                <div className="text-center mb-4">
                  {/* <img src="https://via.placeholder.com/120" className="profile-img mb-3" alt="Profile" /> */}
                  {/* <div>
                    <input type="file" className="form-control w-auto d-inline-block" />
                  </div> */}
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" />
                  </div>

                     <hr className="my-4" />

                <h5 className="mb-3 fw-semibold text-center">
                  Change Password
                </h5>

                  <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input type={showCurrent ? "text" : "password"} className="form-control" placeholder="Enter your Current Password" />
                 
                  <span
                       onClick={() => setShowCurrent(!showCurrent)}
                       style={{
                       color: showCurrent ? "#1A73E8" : "#1A73E8", // red when Hide, blue when Show
                       fontWeight: 500, cursor: "pointer",
                       }}
                    >
                      {showCurrent ? "Hide" : "Show"}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input type={showNew ? "text" : "password"} className="form-control" placeholder="Enter your New Password" />

                       <span
                       onClick={() => setShowNew(!showNew)}
                       style={{
                       color: showNew ? "#1A73E8" : "#1A73E8", // red when Hide, blue when Show
                       fontWeight: 500, cursor: "pointer",
                       }}
                    >
                      {showNew ? "Hide" : "Show"}
                    </span> 
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input type={showConfirm ? "text" : "password"} className="form-control" placeholder="Enter your Confirm Password" />
                 
                      <span
                       onClick={() => setShowConfirm(!showConfirm)}
                       style={{
                       color: showConfirm ? "#1A73E8" : "#1A73E8", // red when Hide, blue when Show
                       fontWeight: 500, cursor: "pointer",
                       }}
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </span>
                  </div>




                  {/* <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" placeholder="Enter your phone" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select className="form-select">
                      <option>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" placeholder="Enter your city" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" rows="3" placeholder="Enter your address"></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label">About Me</label>
                    <textarea className="form-control" rows="3" placeholder="Write something about yourself"></textarea>
                  </div> */}

                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-dark px-5 py-2 rounded-pill">Save Changes</button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
      <Footer />
      
    </>
  )
}
