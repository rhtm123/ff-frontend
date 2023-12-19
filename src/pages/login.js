import React from 'react'

export default function login() {
  return (
    <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
  <div className="card w-full max-w-sm shadow-2xl bg-base-100">
    <form className="card-body text-center">
      <h1 className="text-5xl font-bold mb-6">Login</h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" placeholder="email" className="input input-bordered" required />
      </div>
      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" placeholder="password" className="input input-bordered" required />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</div>


  )
}
