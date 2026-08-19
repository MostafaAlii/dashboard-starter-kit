import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: StatCardProps) => {
  return (
    <div
      style={{
        padding: "1.5rem",
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {title}
        </span>

        {Icon && (
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "grid",
              placeItems: "center",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              flexShrink: 0,
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      {/* Value */}

      <div
        style={{
          fontSize: "1.75rem",
          lineHeight: 1.2,
          fontWeight: 700,
          color: "var(--color-text)",
        }}
      >
        {value}
      </div>

      {/* Footer */}

      {(description || trend) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.75rem",
            fontSize: "0.75rem",
          }}
        >
          {trend && (
            <span
              style={{
                color: trend.positive
                  ? "var(--color-success)"
                  : "var(--color-danger)",
                fontWeight: 600,
              }}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          )}

          {description && (
            <span
              style={{
                color: "var(--color-text-muted)",
              }}
            >
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;