import React from 'react'

import { AdminLoginForm } from './Admin-login-form'
export default function AdminLogin() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AdminLoginForm/>
      </div>
    </div>
  )
}