const AccessDeniedModal = ({ show }) => {
  if (!show) return null;

  return (
    <div 
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.6)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h3>Access Denied</h3>
        <p>Service only available in Nigeria.</p>
      </div>
    </div>
  );
};

export default AccessDeniedModal;
