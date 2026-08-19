import {
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
} from "lucide-react";

import StatCard from "../components/StatCard";
import WelcomeCard from "../components/WelcomeCard";

const DashboardPage = () => {
  return (
    <div
      style={{
        padding: "1.5rem",
      }}
    >
      <WelcomeCard
        name="Admin"
        description="Welcome to your dashboard. Here's an overview of your system."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <StatCard
          title="Users"
          value="1,234"
          icon={Users}
          description="from last month"
          trend={{
            value: "12.5%",
            positive: true,
          }}
        />

        <StatCard
          title="Orders"
          value="567"
          icon={ShoppingCart}
          description="from last month"
          trend={{
            value: "8.2%",
            positive: true,
          }}
        />

        <StatCard
          title="Revenue"
          value="$12,345"
          icon={DollarSign}
          description="from last month"
          trend={{
            value: "5.4%",
            positive: true,
          }}
        />

        <StatCard
          title="Active"
          value="89%"
          icon={Activity}
          description="current activity"
          trend={{
            value: "2.1%",
            positive: true,
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            style={{
              margin: "0 0 1rem",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Recent Activity
          </h2>

          <p
            style={{
              margin: 0,
              color: "var(--color-text-secondary)",
              fontSize: "0.875rem",
            }}
          >
            No recent activity available.
          </p>
        </div>

        <div
          style={{
            padding: "1.5rem",
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            style={{
              margin: "0 0 1rem",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Quick Overview
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color:
                    "var(--color-text-secondary)",
                }}
              >
                Active Users
              </span>

              <strong>1,180</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color:
                    "var(--color-text-secondary)",
                }}
              >
                Pending Orders
              </span>

              <strong>42</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color:
                    "var(--color-text-secondary)",
                }}
              >
                Low Stock
              </span>

              <strong>18</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;