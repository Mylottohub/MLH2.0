import { Spinner } from "react-bootstrap";
import moment from "moment";
import { useGetProfileUser } from "../../react-query";

const UserProfile = () => {
  const { userProfileResponse, isLoadingUserProfile } = useGetProfileUser([]);

  return (
    <div>
      <div style={{ marginTop: "-30px" }}>
        <div className="container">
          {isLoadingUserProfile ? (
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
                  <b>ID:</b> {userProfileResponse && userProfileResponse?.id}
                </p>
                <p>
                  <b>USERNAME:</b>{" "}
                  {userProfileResponse && userProfileResponse?.username}
                </p>
                <p>
                  <b>PHONE:</b>{" "}
                  {userProfileResponse && userProfileResponse?.tell}
                </p>
                <p>
                  <b>EMAIL:</b>{" "}
                  {userProfileResponse && userProfileResponse?.email}
                </p>
                <p>
                  <b>BALANCE:</b> ₦
                  {userProfileResponse && userProfileResponse?.wallet}
                </p>
                <p>
                  <b>DATE REGISTERED:</b>{" "}
                  {moment
                    .utc(
                      userProfileResponse && userProfileResponse?.created_at,
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
