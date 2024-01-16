import React from "react";
import "../assets/css/how.css";

const HowToPlay = () => {
  return (
    <React.Fragment>
      <div className="mt-5 app__tutorial">
        <iframe
          width="100%"
          height="355"
          src="https://www.youtube.com/embed/sk9Inv1AaaQ?rel=0"
          title="Apps Africa FINAL"
          frameBorder="0"
          allowfullscreen
        ></iframe>
        <br />
        <br />
        <table className="table table-express">
          <tbody>
            <tr>
              <th>HOW TO WITHDRAW</th>
            </tr>
          </tbody>
        </table>
        <br />
        <p>All draws have the same simple format</p>
        <br />
        <p>
          we put <strong>90 balls</strong> (numbered 1-90)
        </p>
        <br />
        <p>5 are then selected at random</p>
        <br />
        <p>
          The <strong>first 5 balls</strong> to be drawn from the machine are
          called the <strong>winning numbers</strong>, while the{" "}
          <strong>last 5 balls</strong> to be drawn from the machine are called
          the <strong>machine numbers</strong>.
        </p>
        <br />
        <br />
        <p>
          <span className="lead fw-bolder">
            <strong>HOW TO PLAY NAP/DIRECT</strong>
          </span>
        </p>
        <p>
          Customer selects their numbers and add a stake amount and wait till
          results are drawn. &nbsp;To get the winning numbers, 5 balls are drawn
          from 90 balls.
        </p>
        <br />
        <br />
        <table className="table table-express mobile__hidden-sm hidden-xs">
          <tbody>
            <tr style={{ backgroundColor: "#f9fafa!important" }}>
              <th>GAME TYPE</th>
              <th>NUMBER OF BALLS TO SELECT</th>
              <th>WINNINGS CALCULATIONS</th>
            </tr>
            <tr>
              <td>2 Direct</td>
              <td>Select 2 balls from 90</td>
              <td>240 x stake</td>
            </tr>
            <tr>
              <td>3 Direct</td>
              <td>Select 3 balls from 90</td>
              <td>2100 x stake</td>
            </tr>
            <tr>
              <td>4 Direct</td>
              <td>Select 4 balls from 90</td>
              <td>6000 x stake</td>
            </tr>
            <tr>
              <td>5 Direct</td>
              <td>Select 5 balls from 90</td>
              <td>44000 x stake</td>
            </tr>
          </tbody>
        </table>
        <div className="hidden-lg hidden-xl hidden-md">
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Game Type:</strong>
                </td>
                <td>2 Direct</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of balls to select:</strong>
                </td>
                <td>Select 2 balls from 90</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculations:</strong>
                </td>
                <td>240 x stake</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Game Type:</strong>
                </td>
                <td>3 Direct</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of balls to select:</strong>
                </td>
                <td>Select 3 balls from 90</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculations:</strong>
                </td>
                <td>2100 x stake</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Game Type:</strong>
                </td>
                <td>4 Direct</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of balls to select:</strong>
                </td>
                <td>Select 4 balls from 90</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculations:</strong>
                </td>
                <td>6000 x stake</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Game Type:</strong>
                </td>
                <td>5 Direct</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of balls to select:</strong>
                </td>
                <td>Select 5 balls from 90</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculations:</strong>
                </td>
                <td>44000 x stake</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <table className="table table-express mobile__hidden-sm hidden-xs">
          <tbody>
            <tr>
              <th>HOW TO PLAY PERM</th>
            </tr>
          </tbody>
        </table>
        <br />
        <p>
          The word “<strong>perm</strong>” is an abbreviation for permutation.
        </p>
        <br />
        <p>
          For this type of game, a customer can pick between 3-10 balls, the
          more numbers drawn the more prizes to be won.
        </p>
        <br />
        <p>
          A customer wants to play PERM2, he selects numbers 10, 15, 24 which
          means they have three possible winning combinations when the draw is
          made, with each combination called a line.
        </p>
        <br />
        <p>
          <strong>Line 1</strong> = 10 and 15
        </p>
        <br />
        <p>
          <strong>Line 2</strong> = 10 and 24
        </p>
        <br />
        <p>
          <strong>Line 3 </strong>= 15 and 24
        </p>
        <br />
        <p>
          If customer wants to play N100 per line, the overall cost of the
          ticket N300 (N100 x 3)
        </p>
        <br />
        <br />
        <table
          width="100%"
          cellPadding="20"
          className="hidden-xs mobile__hidden-sm"
        >
          <tbody>
            <tr style={{ backgroundColor: "#f9fafa!important" }}>
              <td>DRAWN RESULTS</td>
              <td>WINNING COMBINATION</td>
              <td>WINNINGS CALCULATION</td>
            </tr>
            <tr>
              <td>64, 20, 10, 19, 11</td>
              <td>NO WINNINGS</td>
              <td>NO WINNINGS</td>
            </tr>
            <tr>
              <td>64, 20, 10,24, 17</td>
              <td>1 WIN LINE (10 &amp;24)</td>
              <td>240 x STAKE (N24,000)</td>
            </tr>
            <tr>
              <td>10,15,20,24,12</td>
              <td>3 WIN LINES (10 &amp; 15,15 &amp; 24,24 &amp; 10)</td>
              <td>(N240 x (N100 x3) =N72,000)</td>
            </tr>
          </tbody>
        </table>
        <div className="hidden-lg hidden-xl hidden-md">
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Drawn Results:</strong>
                </td>
                <td>64, 20, 10, 19, 11</td>
              </tr>
              <tr>
                <td>
                  <strong>Winning Combination:</strong>
                </td>
                <td>NO WINNINGS</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>NO WINNINGS</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Drawn Results:</strong>
                </td>
                <td>64, 20, 10,24, 17</td>
              </tr>
              <tr>
                <td>
                  <strong>Winning Combination:</strong>
                </td>
                <td>1 WIN LINE (10 &amp;24)</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>240 x STAKE (N24,000)</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Drawn Results:</strong>
                </td>
                <td>10,15,20,24,12</td>
              </tr>
              <tr>
                <td>
                  <strong>Winning Combination:</strong>
                </td>
                <td>3 WIN LINES (10 &amp; 15,15 &amp; 24,24 &amp; 10)</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>(N240 x (N100 x3) =N72,000)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <table width="100%" cellPadding="20">
          <tbody>
            <tr>
              <th>NO OF LINES POSSIBLE LINES FOR PERM 2</th>
            </tr>
          </tbody>
        </table>
        <br />
        <table
          width="100%"
          cellPadding="20"
          className="mobile__hidden-sm hidden-xs"
        >
          <tbody>
            <tr style={{ backgroundColor: "#f9fafa!important" }}>
              <td>NUMBER OF BALLS SELECTED</td>
              <td>NUMBER OF LINES</td>
            </tr>
            <tr>
              <td>3</td>
              <td>3 LINES</td>
            </tr>
            <tr>
              <td>4</td>
              <td>6 LINES</td>
            </tr>
            <tr>
              <td>5</td>
              <td>10 LINES</td>
            </tr>
            <tr>
              <td>6</td>
              <td>15 LINES</td>
            </tr>
            <tr>
              <td>7</td>
              <td>21 LINES</td>
            </tr>
            <tr>
              <td>8</td>
              <td>28 LINES</td>
            </tr>
            <tr>
              <td>9</td>
              <td>36 LINES</td>
            </tr>
            <tr>
              <td>10</td>
              <td>45 LINES</td>
            </tr>
          </tbody>
        </table>
        <div className="hidden-lg hidden-xl hidden-md">
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>3</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>3 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>4</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>6 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>5</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>10 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>6</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>15 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>7</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>21 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>8</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>28 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>9</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>36 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>10</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>45 LINES</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <table width="100%" cellPadding="20">
          <tbody>
            <tr>
              <th>NO OF LINES POSSIBLE LINES FOR PERM 3</th>
            </tr>
          </tbody>
        </table>
        <br />
        <table
          width="100%"
          cellPadding="20"
          className="mobile__hidden-sm hidden-xs"
        >
          <tbody>
            <tr style={{ backgroundColor: "#f9fafa!important" }}>
              <td>NUMBER OF BALLS SELECTED</td>
              <td>NUMBER OF LINES</td>
            </tr>
            <tr>
              <td>4</td>
              <td>4 LINES</td>
            </tr>
            <tr>
              <td>5</td>
              <td>10 LINES</td>
            </tr>
            <tr>
              <td>6</td>
              <td>20 LINES</td>
            </tr>
            <tr>
              <td>7</td>
              <td>35 LINES</td>
            </tr>
            <tr>
              <td>8</td>
              <td>56 LINES</td>
            </tr>
            <tr>
              <td>9</td>
              <td>84 LINES</td>
            </tr>
            <tr>
              <td>10</td>
              <td>120 LINES</td>
            </tr>
          </tbody>
        </table>
        <div className="hidden-lg hidden-xl hidden-md">
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>4</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>4 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>5</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>10 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>6</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>20 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>7</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>35 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>8</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>56 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>9</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>84 LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of balls selected:</strong>
                </td>
                <td>10</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>120 LINES</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <p>
          <span className="lead fw-bolder">
            <strong>HOW TO PLAY ONE BANKER</strong>
          </span>
        </p>
        <br />
        <p>One banker is selecting one single ball out of 90 balls</p>
        <br />
        <p>Possible win = (stake amount x 960)</p>
        <br />
        <br />
        <p>
          <span className="lead fw-bolder">
            <strong>HOW TO PLAY AGAINST</strong>
          </span>
        </p>
        <br />
        <p>
          This play option allows the customer to play a certain set of numbers
          against another set of numbers for example:{" "}
        </p>
        <br />
        <p>Top Numbers: 1,2,3,4,5</p>
        <br />
        <p>Against Numbers: 6,7,8,9,10</p>
        <br />
        <p>Number of lines = 5x5 (25 LINES)</p>
        <br />
        <p>
          The number of lines is multiplied by the stake amount (25 x 100 =
          2500). The numbers are multiplied against each other to get the number
          of lines
        </p>
        <br />
        <br />
        <table
          width="100%"
          cellPadding="20"
          className="mobile__hidden-sm hidden-xs"
        >
          <tbody>
            <tr style={{ backgroundColor: "#f9fafa!important" }}>
              <td>TOP LINE</td>
              <td>BOTTOM LINE</td>
              <td>NUMBER OF LINES</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1LINE</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>2LINES</td>
            </tr>
            <tr>
              <td>1</td>
              <td>3</td>
              <td>3LINES</td>
            </tr>
            <tr>
              <td>2</td>
              <td>3</td>
              <td>6LINES</td>
            </tr>
            <tr>
              <td>3</td>
              <td>2</td>
              <td>6LINES</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2</td>
              <td>4LINES</td>
            </tr>
            <tr>
              <td>1</td>
              <td>4</td>
              <td>4LINES</td>
            </tr>
          </tbody>
        </table>
        <div className="hidden-lg hidden-xl hidden-md">
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Top Line:</strong>
                </td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <strong>Bottom Line:</strong>
                </td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>1LINE</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Top Line:</strong>
                </td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <strong>Bottom Line:</strong>
                </td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>2LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Top Line:</strong>
                </td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <strong>Bottom Line:</strong>
                </td>
                <td>3</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>3LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Top Line:</strong>
                </td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <strong>Bottom Line:</strong>
                </td>
                <td>3</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>6LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Top Line:</strong>
                </td>
                <td>3</td>
              </tr>
              <tr>
                <td>
                  <strong>Bottom Line:</strong>
                </td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>6LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Top Line:</strong>
                </td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <strong>Bottom Line:</strong>
                </td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>4LINES</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Top Line:</strong>
                </td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <strong>Bottom Line:</strong>
                </td>
                <td>4</td>
              </tr>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>4LINES</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <p>
          <strong>TOP NUMBERS:</strong> 1,2,3,4,5
        </p>
        <br />
        <p>
          <strong>BOTTOM NUMBERS:</strong> 6,7,8,9,10
        </p>
        <br />
        <p>
          <strong>WINNING NUMBERS:</strong> 3,4,5,9,10
        </p>
        <br />
        <p>
          <strong>TOTAL WINNING AMOUNT:</strong> 3/2=6 LINES
        </p>
        <br />
        <p>
          <strong>WINNING CALCULATION</strong> = (6LINES x 240 X N100)
        </p>
        <br />
        <br />
        <div className="mobile__hidden-sm">
          <table width="100%" cellPadding="20" className="hidden-xs">
            <tbody>
              <tr style={{ backgroundColor: "#f9fafa!important" }}>
                <td>NUMBER OF LINES</td>
                <td>WINNINGS CALCULATION</td>
                <td>POSSIBLE WINNINGS</td>
              </tr>
              <tr>
                <td>1</td>
                <td>1 LINE x 240 x N100</td>
                <td>N24,000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>2 LINES x240 x N100</td>
                <td>N48,000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>3 LINES x240 x N100</td>
                <td>N72,000</td>
              </tr>
              <tr>
                <td>4</td>
                <td>4 LINES x240 x N100</td>
                <td>N96,000</td>
              </tr>
              <tr>
                <td>6</td>
                <td>6 LINES x240 x N100</td>
                <td>N144,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="hidden-lg hidden-xl hidden-md">
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>1</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>1 LINE x 240 x N100</td>
              </tr>
              <tr>
                <td>
                  <strong>Possible Winnings:</strong>
                </td>
                <td>N24,000</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>2 LINES x240 x N100</td>
              </tr>
              <tr>
                <td>
                  <strong>Possible Winnings:</strong>
                </td>
                <td>N48,000</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>3</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>3 LINES x240 x N100</td>
              </tr>
              <tr>
                <td>
                  <strong>Possible Winnings:</strong>
                </td>
                <td>N72,000</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>4</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>4 LINES x240 x N100</td>
              </tr>
              <tr>
                <td>
                  <strong>Possible Winnings:</strong>
                </td>
                <td>N96,000</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table cellPadding="5" className="meg_mobile_table">
            <tbody>
              <tr>
                <td>
                  <strong>Number of lines:</strong>
                </td>
                <td>6</td>
              </tr>
              <tr>
                <td>
                  <strong>Winnings Calculation:</strong>
                </td>
                <td>6 LINES x240 x N100</td>
              </tr>
              <tr>
                <td>
                  <strong>Possible Winnings:</strong>
                </td>
                <td>N144,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HowToPlay;
