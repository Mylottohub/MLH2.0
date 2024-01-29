import Navbar from "../components/Navbar";
// import useTimeTable from "../react-query/api-hooks/useTimetable";

const Forecast = () => {
  //   const { operatorTimetable, isLoadingTimetable } = useTimeTable();
  //   console.log(operatorTimetable?.data);
  return (
    <div>
      <Navbar />
      <div className="meg_container mt-5">
        <table cellPadding="5" width="90%" align="center">
          <tbody>
            <tr>
              <td>
                <div className="div_lgrey">
                  <form action="" method="post">
                    <div className="form-group mb-4">
                      <select
                        name="operator"
                        className="form-control"
                        required=""
                      >
                        <option value="">Select Operator</option>
                        <option value="26">5/90 Games</option>
                        <option value="28">Wesco</option>
                        <option value="43">Green lotto</option>
                        <option value="27">Baba Ijebu</option>
                        <option value="45">Lottomania</option>
                        <option value="57">Set Lotto</option>
                        <option value="42">Golden Chance</option>
                      </select>
                    </div>

                    <div className="form-group mb-4">
                      <select
                        name="game"
                        className="form-control"
                        required=""
                        id="game_div"
                      >
                        <option value="">Select Game</option>
                      </select>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-blue btn-block w-100"
                      name="submit"
                      value="Submit"
                    />
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Forecast;
