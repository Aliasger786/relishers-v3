const Services = () => {
  const storeHours = {
    Monday: "9:00 AM - 9:00 PM",
    Tuesday: "9:00 AM - 9:00 PM",
    Wednesday: "9:00 AM - 9:00 PM",
    Thursday: "9:00 AM - 9:00 PM",
    Friday: "9:00 AM - 10:00 PM",
    Saturday: "10:00 AM - 10:00 PM",
    Sunday: "10:00 AM - 8:00 PM",
  };

  const features = [
    "🚀 Fast and reliable food delivery",
    "🍽️ Wide variety of cuisines",
    "📱 Easy-to-use mobile app",
    "💸 Exclusive discounts and offers",
    "📞 24/7 customer support",
  ];

  const containerStyle: React.CSSProperties = {
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "20px",
  };

  const headingStyle: React.CSSProperties = {
    color: "#333",
    textAlign: "center",
    marginBottom: "10px",
  };

  const listStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: "0",
  };

  const listItemStyle: React.CSSProperties = {
    marginBottom: "8px",
    fontSize: "16px",
    color: "#555",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ ...headingStyle, fontSize: "28px" }}>🌟 Our Services 🌟</h1>
      <section style={sectionStyle}>
        <h2 style={{ ...headingStyle, fontSize: "22px" }}>🕒 Store Hours</h2>
        <ul style={listStyle}>
          {Object.entries(storeHours).map(([day, hours]) => (
            <li key={day} style={listItemStyle}>
              <strong>{day}:</strong> {hours}
            </li>
          ))}
        </ul>
      </section>
      <section style={sectionStyle}>
        <h2 style={{ ...headingStyle, fontSize: "22px" }}>✨ Features</h2>
        <ul style={listStyle}>
          {features.map((feature, index) => (
            <li key={index} style={listItemStyle}>
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Services;
