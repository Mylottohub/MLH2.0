import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/profile.css";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dob, setDob] = useState(null);
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
          setError(error);
          setLoading(false);
        });
    }
  }, [userInfo]);
  const notify = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      toast("Copied!");
    } catch (err) {
      toast("Failed to copy!");
    }
  };

  const handleDateChange = (date) => {
    setDob(date);
  };

  return (
    <React.Fragment>
      <Navbar />
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
            <div className="meg_container mt-5 mx-auto">
              <table align="center" width="60%">
                <tbody>
                  <tr>
                    <td>
                      <h2>Profile</h2>
                      <p>
                        <strong>Refer a friend</strong>
                      </p>
                      <div
                        className="row"
                        onClick={() =>
                          notify(`https://www.mylottohub.com/${userData?.id}`)
                        }
                      >
                        <div className="col-md-8 mb-3">
                          <input
                            id="foo"
                            type="text"
                            value={`https://www.mylottohub.com/${userData?.id}`}
                            className="form-control p-3"
                            readOnly=""
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <button
                            className="btn btn-blue p-3  btn-copy"
                            data-clipboard-action="copy"
                            data-clipboard-target="#foo"
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>

                      <form action="" method="post">
                        <p>
                          <small>
                            <strong className="text-primary mb-3">ID:</strong>{" "}
                            {userData && userData?.id}
                            <br /> <br />
                            <strong className="text-primary">
                              USERNAME:
                            </strong>{" "}
                            {userData && userData?.username}
                            <br /> <br />
                            <strong className="text-primary">
                              PHONE:
                            </strong>{" "}
                            {userData && userData?.phone}
                            <br /> <br />
                            <strong className="text-primary">
                              EMAIL:
                            </strong>{" "}
                            {userData && userData?.email}
                            <br /> <br />
                            <strong className="text-primary">BALANCE:</strong> ₦
                            {userData && userData?.wallet}
                            <br /> <br />
                            <strong className="text-primary">
                              DATE REGISTERED:
                            </strong>{" "}
                            {userData && userData?.created_at}
                            <br />
                            <br />
                          </small>
                        </p>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control p-3"
                            placeholder="Name"
                            value={`${userData && userData?.name}`}
                            readOnly=""
                            disabled
                          />
                        </div>
                        <br />
                        <div className="form-group">
                          <select className="form-control p-3" name="state">
                            <option value="">Select state</option>
                            <option value="Abia">Abia</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Adamawa">Adamawa</option>
                            <option value="Akwa Ibom">Akwa Ibom</option>
                            <option value="Anambra">Anambra</option>
                            <option value="Bauchi">Bauchi</option>
                            <option value="Bayelsa">Bayelsa</option>
                            <option value="Benue">Benue</option>
                            <option value="Borno">Borno</option>
                            <option value="Cross River">Cross River</option>
                            <option value="Delta">Delta</option>
                            <option value="Ebonyi">Ebonyi</option>
                            <option value="Edo">Edo</option>
                            <option value="Ekiti">Ekiti</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Gombe">Gombe</option>
                            <option value="Imo">Imo</option>
                            <option value="Jigawa">Jigawa</option>
                            <option value="Kaduna">Kaduna</option>
                            <option value="Kano">Kano</option>
                            <option value="Kastina">Kastina</option>
                            <option value="Kebbi">Kebbi</option>
                            <option value="Kogi">Kogi</option>
                            <option value="Kwara">Kwara</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Nassarawa">Nassarawa</option>
                            <option value="Niger">Niger</option>
                            <option value="Ogun">Ogun</option>
                            <option value="Ondo">Ondo</option>
                            <option value="Osun">Osun</option>
                            <option value="Oyo">Oyo</option>
                            <option value="Plateau">Plateau</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Sokoto">Sokoto</option>
                            <option value="Taraba">Taraba</option>
                            <option value="Yobe">Yobe</option>
                            <option value="Zamfara">Zamfara</option>
                          </select>
                        </div>
                        <br />
                        <div className="form-group">
                          <strong className="app__gender mb-3">Gender</strong>
                          <br />
                          <div className="radio mt-3">
                            <label>
                              <input type="radio" name="gender" value="male" />{" "}
                              Male
                            </label>
                          </div>
                          <br />
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                              />{" "}
                              Female
                            </label>
                          </div>
                        </div>

                        <div className="form-group mt-4">
                          <strong>Date of Birth</strong>
                          <div className="input-group date form_date mt-4">
                            <DatePicker
                              className="form-control p-3"
                              selected={dob}
                              onChange={handleDateChange}
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              placeholderText="Select Date"
                            />
                          </div>

                          <br />
                        </div>

                        <input
                          type="submit"
                          className="btn btn-blue"
                          name="save"
                          value="Save"
                        />
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default UserProfile;
