const WithdrawModal = () => {
  return (
    <div>
         <div style={{ marginTop: "-30px" }}>
          <div className="container">
            <span>
              <strong>Withdraw Funds</strong>
            </span>
            <br />
            <small className="mt-3">
              Winning Wallet Balance - <strong>₦457,000.00</strong>
            </small>
            <hr />
            <p>
              Please click the buttons below to either withdraw funds to your
              bank account or transfer back to your lotto wallet.
            </p>
            <br />
            <p>
              <a
                className="btn btn-blue2 btn-block btn-lg"
              >
                Cash Out to Bank
              </a>
            </p>

            <p>
              <a
               className="btn btn-trans2_border btn-block btn-lg"
              >
                Transfer to wallet
              </a>
            </p>
           
          </div>

          {/* <button
            className="btn text-white mt-4"
            style={{ background: "#0AB39C", float: "right" }}
          >
            Clock in
          </button> */}
        </div>
    </div>
  )
}

export default WithdrawModal