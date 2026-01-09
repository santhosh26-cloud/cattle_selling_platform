import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminUsers from "./pages/AdminUsers";
import BuyerOrders from "./pages/BuyerOrders";
import AdminOrders from "./pages/AdminOrders";
import BuyerPayableOrders from "./pages/BuyerPayableOrders";
import ChangePassword from "./pages/ChangePassword";
import UpdateEmail from "./pages/UpdateEmail";
import UploadProfileImage from "./pages/ProfilePictureUpload"
import UpdateContactInfo from "./pages/UpdateContactInfo";
import AdminEditUser from "./pages/AdminEditUser";
import Settings from "./pages/Settings";
import EditCattle from "./pages/EditCattle";
import SellerOrders from "./pages/SellerOrders";
import SellerNotifications from "./pages/SellerNotifications";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROFILE (ALL ROLES) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["admin", "seller", "buyer"]}>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute allowedRoles={["admin", "seller", "buyer"]}>
            <MainLayout>
              <ProfileEdit />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/password"
        element={
          <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/email"
        element={
          <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
            <MainLayout>
              <UpdateEmail />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/upload"
        element={
          <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
            <MainLayout>
              <UploadProfileImage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/contact"
        element={
          <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
            <MainLayout>
              <UpdateContactInfo />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={["admin", "seller", "buyer"]}>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <AdminUsers />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout>
              <AdminOrders />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* SELLER */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <MainLayout>
              <SellerDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/notifications"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <MainLayout>
              <SellerNotifications />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/edit-cattle/:id"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <MainLayout>
              <EditCattle />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/orders"
        element={
          <ProtectedRoute allowedRoles={["seller"]}>
            <MainLayout>
              <SellerOrders />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* BUYER */}
      <Route
        path="/buyer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <MainLayout>
              <BuyerDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/orders"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <MainLayout>
              <BuyerOrders />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/payable-orders"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <MainLayout>
              <BuyerPayableOrders />
            </MainLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
