import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import moment from "moment";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.data) {
      const apiUrl = `https://sandbox.mylottohub.com/v1/get-user/${userInfo.data.id}`;

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application json",
          Accept: "application/json",
        },
      };

      axios
        .get(apiUrl, config)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [userInfo]);

  //   const handleDateChange = (date) => {
  //     setDob(date);
  //   };

  return (
    <div>
      <div style={{ marginTop: "-30px" }}>
        <div className="container">
          {/* <span>
            <strong>User Profile</strong>
            <br /> <br />
            <p>
              <b>ID:</b> 14160
            </p>
          </span> */}

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
                  <b>PHONE:</b> {userData && userData?.phone}
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
