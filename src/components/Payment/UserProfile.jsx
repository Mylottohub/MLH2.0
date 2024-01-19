import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import HTTP from "../../utils/httpClient";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await HTTP.get(`/get-user/${userInfo.data.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "-30px" }}>
        <div className="container">
          {loading ? (
            <div className="spinner text-dark text-center mt-5">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </div>
          ) : (
            <>
              <span>
                <strong>User Profile</strong>
                <br /> <br />
                <p>
                  <b>ID:</b> {userData && userData?.id}
                </p>
                <p>
                  <b>USERNAME:</b> {userData && userData?.username}
                </p>
                <p>
                  <b>PHONE:</b> {userData && userData?.tell}
                </p>
                <p>
                  <b>EMAIL:</b> {userData && userData?.email}
                </p>
                <p>
                  <b>BALANCE:</b> ₦{userData && userData?.wallet}
                </p>
                <p>
                  <b>DATE REGISTERED:</b>{" "}
                  {moment
                    .utc(
                      userData && userData?.created_at,
                      "YYYY-MM-DD HH:mm:ss"
                    )
                    .local()
                    .format("Do MMM YYYY | h:mm:ssA")}
                </p>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
