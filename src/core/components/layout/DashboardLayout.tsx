import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((current) => !current)}
      />

      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          onSidebarToggle={() => setSidebarCollapsed((current) => !current)}
        />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </main>

        {/* ===== Footer ===== */}
        <Footer showScrollTop={false} />

        {/* ===== Scroll to Top Button (Floating) ===== */}
        <ScrollToTop threshold={300} showWhen="scroll" />
      </div>
    </div>
  );
};

export default DashboardLayout;