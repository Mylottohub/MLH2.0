import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <div>
      <div className="notFound">
        <img className="img-fluid imageNotFound" src="./404.jpg" />
        <p style={{ textAlign: "center" }}>
          <Link className="text-dark" to="/">
            Go to Home{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
