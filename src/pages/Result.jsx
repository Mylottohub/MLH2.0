import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import "../assets/css/result.css";
import { useState } from "react";
import HTTP from "../utils/httpClient";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Result = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResults] = useState([]);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const configHeaders = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchData = () => {
    setIsLoading(true);
    HTTP.get(`/mylotto_get_results`, { ...configHeaders })
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // console.log(result[0]?.id);

  useEffect(() => {
    fetchData();
  }, [userInfo.token]);

  // Animation variants
  const pageVariants = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };
  const pageTransition = { type: "spring", stiffness: 180, damping: 20 };
  const rowVariants = { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 } };
  const logoVariants = { initial: { opacity: 0, scale: 0.96, y: 6 }, animate: { opacity: 1, scale: 1, y: 0 } };
  const numVariants = { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 } };

  return (
    <motion.div initial={pageVariants.initial} animate={pageVariants.animate} transition={pageTransition}>
      <Navbar />
      <Slider />

      <div className="about-area ptb-120">
        <div className="container">
          <div className="meg_container mt-5">
            <span className="hidden-xs hidden-sm mb-5 fw-bolder text-dark">
              <h3>
                <strong style={{ fontSize: "25px" }}>Latest Results</strong>
              </h3>
            </span>
            <AnimatePresence initial={false}>
              {isLoading ? (
                <motion.div key="loader" className="spinner-container d-flex align-items-center justify-content-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Custom loader: pulsing dots */}
                  <motion.div style={{ display: "flex", gap: 8 }}>
                    {[0,1,2].map((i) => (
                      <motion.span key={i} style={{ width: 12, height: 12, borderRadius: 999, background: "#406777", display: "inline-block" }} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}/>
                    ))}
                  </motion.div>
                </motion.div>
              ) : result.length === 0 ? (
                <motion.tr key="empty" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                  <td
                    colSpan="8"
                    className="spinner-container d-flex align-items-center justify-content-center"
                  >
                    <motion.span initial={{ scale: 0.96 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 16 }}></motion.span>
                  </td>
                </motion.tr>
              ) : (
                <>
                  {result
                    .sort(
                      (a, b) =>
                        new Date(b?.results[0]?.date) -
                        new Date(a?.results[0]?.date)
                    )
                    .map((record, index) => {
                      const latestResult = record?.results[0];
                      const operatorId = record?.id;

                      return (
                        <>
                          {/* Desktop Row */}
                          <motion.div key={`d-${index}`} className="d-none d-sm-block mt-5" initial={rowVariants.initial} whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(0,0,0,0.06)" }} animate={rowVariants.animate} transition={{ ...pageTransition, delay: index * 0.04 }}>
                            <div className="row app__all-result">
                              <div className="col-3 col-lg-2">
                                <motion.img
                                  src={record?.logo}
                                  className="img-fluid img-rounded mt-5"
                                  alt={`${record.name}`}
                                  variants={logoVariants}
                                  initial="initial"
                                  animate="animate"
                                  transition={pageTransition}
                                />
                              </div>
                              <div className="col-9 col-lg-10 div_lgrey fw-bolder text-dark">
                                <strong>
                                  {operatorId === 62
                                    ? latestResult?.game_name
                                    : latestResult?.game}
                                </strong>

                                <br />
                                <small>
                                  <strong className="fw-bolder text-dark">
                                    Draw Time:
                                  </strong>
                                  {latestResult?.date && (
                                    <motion.span className="fw-bolder text-dark" key={latestResult?.date} initial={{ opacity: 0.85 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                                      {moment
                                        .utc(
                                          latestResult.date,
                                          "YYYY-MM-DD HH:mm:ss"
                                        )
                                        .local()
                                        .format("MMM DD, YYYY h:mm:ss a")}
                                    </motion.span>
                                  )}
                                </small>
                                <br />
                                <br />
                                <br />

                                {operatorId === 62 ? (
                                  <motion.table className="winning-table table fw-bolder text-dark" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                                    <thead>
                                      <tr>
                                        <th>Prize</th>
                                        <th>Total Winners</th>
                                        <th>Min Prize Per Forecast</th>
                                        <th>Code</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <motion.tr initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                                        <td>First Prize</td>
                                        <td>1 Winner</td>
                                        <td>₦5,000,000</td>
                                        <td>{latestResult?.first_prize}</td>
                                      </motion.tr>
                                      <motion.tr initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.03 }}>
                                        <td>Second Prize</td>
                                        <td>1 Winner</td>
                                        <td>₦2,000,000</td>
                                        <td>{latestResult?.second_prize}</td>
                                      </motion.tr>
                                      <motion.tr initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.06 }}>
                                        <td>Third Prize</td>
                                        <td>1 Winner</td>
                                        <td>₦1,000,000</td>
                                        <td>{latestResult?.third_prize}</td>
                                      </motion.tr>
                                      <motion.tr initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.09 }}>
                                        <td>Fourth Prize</td>
                                        <td>3 Winners</td>
                                        <td>₦500,000</td>
                                        <td>{latestResult?.fourth_prize_1}</td>
                                      </motion.tr>
                                      <motion.tr initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.12 }}>
                                        <td>Fifth Prize</td>
                                        <td>10 Winners</td>
                                        <td>₦200,000</td>
                                        <td>{latestResult?.fifth_prize_1}</td>
                                      </motion.tr>
                                      <motion.tr initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.15 }}>
                                        <td>Sixth Prize</td>
                                        <td>15 Winners</td>
                                        <td>₦100,000</td>
                                        <td>{latestResult?.sixth_prize_1}</td>
                                      </motion.tr>
                                    </tbody>
                                  </motion.table>
                                ) : (
                                  latestResult?.winning_number
                                    ?.split("-")
                                    .map((digit, j) => (
                                      <td key={j}>
                                        <motion.div className="numboxwhite" variants={numVariants} initial="initial" animate="animate" transition={{ duration: 0.18, delay: j * 0.04, type: "spring", stiffness: 180, damping: 16 }}>
                                          {digit}
                                        </motion.div>
                                      </td>
                                    ))
                                )}

                                <div className="pull-right mt-4 mb-3">
                                  <motion.a
                                    onClick={() =>
                                      navigate(`/view-more/${operatorId}`)
                                    }
                                    className="text-decoration-none"
                                    whileTap={{ scale: 0.96 }}
                                  >
                                    <small style={{ cursor: "pointer" }}>
                                      <strong>View More&gt;&gt;</strong>
                                    </small>
                                  </motion.a>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Mobile Block */}
                          <motion.div key={`m-${index}`} className="d-block d-sm-none mb-5 mt-5" initial={rowVariants.initial} animate={rowVariants.animate} transition={{ ...pageTransition, delay: index * 0.04 }}>
                            <div className="row">
                              <div className="col-xs-12">
                                <div className="div_lgrey">
                                  <table cellPadding="3">
                                    <tbody>
                                      <tr>
                                        <td width="30%">
                                          <motion.img
                                            src={record?.logo}
                                            className="img-fluid img-rounded"
                                            alt={`${record.name}`}
                                            variants={logoVariants}
                                            initial="initial"
                                            animate="animate"
                                            transition={pageTransition}
                                          />
                                        </td>
                                        <td>
                                          {operatorId === 62
                                            ? latestResult?.game_name
                                            : latestResult?.game}
                                          <br />
                                          <small>
                                            {latestResult?.date && (
                                              <motion.span key={`date-${index}`} initial={{ opacity: 0.85 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                                                {moment
                                                  .utc(
                                                    latestResult.date,
                                                    "YYYY-MM-DD HH:mm:ss"
                                                  )
                                                  .local()
                                                  .format(
                                                    "MMM DD, YYYY h:mm:ss a"
                                                  )}
                                              </motion.span>
                                            )}
                                          </small>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <br />

                                  {operatorId === 62 ? (
                                    <table className="winning-table table fw-bolder text-dark">
                                      <thead>
                                        <tr>
                                          <th>Prize</th>
                                          <th>Total Winners</th>
                                          <th>Min Prize Per Forecast</th>
                                          <th>Code</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>First Prize</td>
                                          <td>1 Winner</td>
                                          <td>₦{(5000000).toLocaleString()}</td>
                                          <td>{latestResult?.first_prize}</td>
                                        </tr>
                                        <tr>
                                          <td>Second Prize</td>
                                          <td>1 Winner</td>
                                          <td>₦{(2000000).toLocaleString()}</td>
                                          <td>{latestResult?.second_prize}</td>
                                        </tr>
                                        <tr>
                                          <td>Third Prize</td>
                                          <td>1 Winner</td>
                                          <td>₦{(1000000).toLocaleString()}</td>
                                          <td>{latestResult?.third_prize}</td>
                                        </tr>
                                        <tr>
                                          <td>Fourth Prize</td>
                                          <td>3 Winners</td>
                                          <td>₦{(500000).toLocaleString()}</td>
                                          <td>{latestResult?.fourth_prize_1}</td>
                                        </tr>
                                        <tr>
                                          <td>Fifth Prize</td>
                                          <td>10 Winners</td>
                                          <td>₦{(200000).toLocaleString()}</td>
                                          <td>{latestResult?.fifth_prize_1}</td>
                                        </tr>
                                        <tr>
                                          <td>Sixth Prize</td>
                                          <td>15 Winners</td>
                                          <td>₦{(100000).toLocaleString()}</td>
                                          <td>{latestResult?.sixth_prize_1}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  ) : (
                                    latestResult?.winning_number
                                      ?.split("-")
                                      .map((digit, j) => (
                                        <td key={j}>
                                          <motion.div className="numboxwhite" variants={numVariants} initial="initial" animate="animate" transition={{ duration: 0.16, delay: j * 0.03, type: "spring", stiffness: 180, damping: 16 }}>
                                            {digit}
                                          </motion.div>
                                        </td>
                                      ))
                                  )}

                                  <br />
                                  <div className="pull-right">
                                    <motion.a
                                      onClick={() =>
                                        navigate(`/view-more/${operatorId}`)
                                      }
                                      className="text-decoration-none"
                                      whileTap={{ scale: 0.96 }}
                                    >
                                      <small style={{ cursor: "pointer" }}>
                                        View More&gt;&gt;
                                      </small>
                                    </motion.a>
                                  </div>
                                  <div className="clearfix"></div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      );
                    })}
                </>
              )}
            </AnimatePresence>

            <div className="clearfix"></div>
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Result;
