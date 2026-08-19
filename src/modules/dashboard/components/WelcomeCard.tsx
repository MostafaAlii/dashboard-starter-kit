interface WelcomeCardProps {
  name?: string;
  description?: string;
}

const WelcomeCard = ({
  name = "Admin",
  description = "Here is an overview of your system today.",
}: WelcomeCardProps) => {
  return (
    <div
      style={{
        padding: "2rem",
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        marginBottom: "1.5rem",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--color-text)",
        }}
      >
        Welcome back, {name}! 👋
      </h1>

      <p
        style={{
          margin: "0.5rem 0 0",
          color: "var(--color-text-secondary)",
          fontSize: "0.875rem",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default WelcomeCard;