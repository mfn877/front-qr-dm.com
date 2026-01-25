//src/app/settings/page.js
"use client";
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import React from 'react'

export default function page() {
  return (
    <>
      <Header2 />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card settings-card p-4">
              <h4 className="settings-title mb-4 text-center">Account Settings</h4>
              <div className="section-box">
                <h6 className="fw-bold mb-3">Change Password</h6>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="form-control" placeholder="Enter current password" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" placeholder="Enter new password" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" placeholder="Confirm new password" />
                  </div>

                  <button type="submit" className="btn btn-dark px-4 rounded-pill">
                    Update Password
                  </button>
                </form>
              </div>
              <div className="section-box danger-box">
                <h6 className="fw-bold text-dark mb-2">Deactivate Account</h6>
                <p className="text-muted mb-3">
                  Your account will be temporarily disabled. You can reactivate by logging in again.
                </p>
                <button className="btn btn-soft-dark px-4">
                  Deactivate Account
                </button>
              </div>
              <div className="section-box danger-box">
                <h6 className="fw-bold text-danger mb-2">Delete Account</h6>
                <p className="text-muted mb-3">
                  This action is permanent and cannot be undone.
                </p>
                <button className="btn btn-danger px-4 rounded-pill">
                  Delete Account Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
