import React from 'react'
import AdminLayout from "@/layouts/AdminLayout";

const Dashboard = () => {
  return (
    <div>Dashboard asda</div>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout title={"Dashboard"}>{page}</AdminLayout>;
}

export default Dashboard;