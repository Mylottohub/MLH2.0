import { Button } from "react-bootstrap";
import { images } from "../../constant";

const Deposit = () => {
  return (
    <div>
      <div>
        <div style={{ marginTop: "-30px" }}>
          <div className="container">
            <span>
              <strong>Deposit</strong>
            </span>
            <br />
            <small className="mt-3">
              How much do you want to deposit to your wallet?
            </small>

            <form>
              <div className="mb-3 mt-4">
                <input
                  type="tel"
                  className="form-control p-3 mb-2"
                  placeholder="Enter Amount"
                  name="token"
                  required
                />
              </div>

              <div className="mb-3">
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle form-select p-3 mb-2"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                    data-toggle="dropdown"
                  >
                    Choose Payment Options
                  </a>
                  <ul className="dropdown-menu w-100">
                    <li data-value="1" className="w-100">
                      <a className="dropdown-item p-2 w-100">
                        <div className="d-flex">
                          <img src={images.rave} /> Flutterwave{" "}
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
                            />
                          </div>
                        </div>
                      </a>
                    </li>

                    <li data-value="1" className="w-100">
                      <a className="dropdown-item p-2 w-100">
                        <div className="d-flex">
                          <img src={images.paystack} /> Paystack{" "}
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 
              <button type="submit" className="btn btn-primary w-100 p-3">
                Register
              </button> */}
              <Button
                type="submit"
                className="w-100 p-3"
                style={{ background: "#27AAE1" }}
              >
                {/* {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  " Verify"
                )} */}
                Proceed
              </Button>
            </form>
          </div>

          {/* <button
            className="btn text-white mt-4"
            style={{ background: "#0AB39C", float: "right" }}
          >
            Clock in
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
