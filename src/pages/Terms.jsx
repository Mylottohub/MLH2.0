import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Terms = () => {
  return (
    <div>
      <Navbar />

      <div className="container mt-5 mb-5 app__terms">
        <span className="app__terms">
          <h4>
            <strong>Terms and Conditions</strong>
          </h4>
          <small>
            Read the terms of use governing the afairs of MyLottoHub
          </small>
          <br />
          <br />
        </span>
        <p className="app__terms_p">
          Last Modified: <strong>December 01, 2023 </strong>
        </p>
        <p className="text-center fw-bolder">
          PLEASE READ THE BINDING ARBITRATION CLAUSE IN SECTION 18. IT AFFECTS
          HOW DISPUTES ARE RESOLVED.
        </p>
        <p>
          These terms and conditions ("Terms of Service") govern your use of the
          Application (as defined below) as provided by Mylottohub.
          ("Mylottohub," the "Company," "We" or "Us"). These Terms of Service
          are a binding legal agreement between you and Mylottohub. Mylottohub
          may change these Terms of Service at any time without notice to you by
          posting the revised Terms of Service with the date they were revised.
        </p>
        <p>
          MyLottohub is a lottery aggregation platform that provides a
          one-stop-shop for all Nigerian Lottery games. This enables patrons of
          the various lottery games to Play, view results and forecast future
          winning numbers from the comfort of their devices. When placing a
          lotto ticket through Mylottohub, you are placing an order for a
          lottery ticket directly with the Lottery operator. As a service
          provider and acting on your behalf, Mylottohub will fulfill that order
          through a licensed Operator in the jurisdiction where the order was
          placed. Mylottohub is the Operator's authorized agent for accepting
          payment from Users (as defined below).
        </p>
        <p>
          IMPORTANT LEGAL NOTICE: PLEASE READ THESE TERMS OF SERVICE CAREFULLY
          AS THEY AFFECT YOUR LEGAL RIGHTS AND OBLIGATIONS. MYLOTTOHUB IS NOT AN
          OPERATOR AND IS NOT AFFILIATED, OR ENDORSED BY ANY STATE LOTTERY OR
          GOVERNMENT AGENCY. IF YOU DO NOT AGREE TO THESE TERMS OF SERVICE IN
          THEIR ENTIRETY, DO NOT ACCESS OR USE THE SERVICE.
        </p>
        <p className="fw-bolder">1. Defined Terms</p>
        <p>For the purpose of these Terms of Service:</p>
        <ol>
          1. "Account Funding" means funding your account via one of the
          accepted forms of payment for the purposes of ordering a lottery
          ticket.
        </ol>
        <ol>
          2. "Application" and/or "mylottohub" mean all of the services offered
          on the Mylottohub application and websites, including, without
          limitation, all technology, processes and materials used to provide
          such services;
        </ol>
        <ol>
          3. "Available Deposit balance" means any Mylottohub credit in an
          Account (as defined below) which have not been used to order Tickets
          through this Application or withdrawn to a bank account;
        </ol>
        <ol>
          4. "Available Withdrawal balance" means any Mylottohub winning in an
          Account (as defined below) which have not been used to order tickets
          or withdrawn to a bank account
        </ol>
        <ol>
          5. "Designated lotto Draws" means the specific Lottery drawing that
          you are placing a Ticket to enter using the Application or
          Mylottohub.com;
        </ol>
        <ol>
          6. "Draw Entry" means any set of numbers that constitute a single draw
          entry on a Ticket;
        </ol>
        <ol>
          7. "Mylottohub", "we" and "us" means Mylottohub, including its agents,
          contractors, and any parties involved in creating, producing, or
          delivering this Application or website;
        </ol>
        <ol>
          8. "Mylottohub winning wallet" means any funds in a User's Account
          that has been won by a user after placing a bet on a draw. Mylottohub
          winnings are added to a user account when a User wins an amount from
          any of mylottohub associated lottery operators.
        </ol>
        <ol>
          9. Mylottohub Deposits may be added to a User's account by Mylottohub
          after a user has funded his/her accounts via any of its listed/
          approved 3rd party banking/fintech funding channels to enable the user
          place tickets for a lottery draw or for compensation purposes as well;
        </ol>
        <ol>
          10. "Lottery/lotto" means an official lottery game (e.g.); Baba Ijebu
          (Premier lotto, Golden chance lotto, Green lotto, SET lotto,
          Lottomania etc.
        </ol>
        <ol>
          11. "Non-Winning Ticket" means any Ticket with prizes equal to N0
          (zero naira) after prize values are announced;
        </ol>
        <ol>
          12. "Non-Withdrawable Deposit" means any Mylottohub deposit that are
          not available for withdrawal to a bank account. Mylottohub deposit
          that are added as a result of Users funding their account will be
          non-withdrawable, and so are included in the definition of
          non-Withdrawable deposit. Non-Withdrawable deposit may also be given
          to Users for promotional reasons or for special cases;
        </ol>
        <ol>
          13. "Withdrawable Winnings" means any Mylottohub winnings that are
          available for withdrawal to a bank account. Any Mylottohub winnings
          that are applied to a User's Account as a result of winning lottery
          prizes are Mylottohub winnings;
        </ol>
        <ol>
          14. "Personal Information" means information about a natural person
          that is readily identifiable to that specific individual. Personal
          Information includes, among other information, an individual's name,
          address, telephone number, date of birth, email, user ID, and any
          other information used to identify you on this Application. But a
          domain name or Internet protocol address is not considered Personal
          Information, as used herein;
        </ol>
        <ol>15. "Play" means a single game entry;</ol>
        <ol>
          {" "}
          16. "Lottery Ticket" means any Ticket contributed to a Lottery Pool;
        </ol>
        <ol>17. "Randomize" means any pseudo-randomly-generated Play;</ol>
        <ol>
          18. "Regulator" means the organization that regulates the lottery in a
          given jurisdiction (e.g., The Nigerian Lottery Regulatory Commission);
        </ol>
        <ol>
          19. "Ticket" means any lottery ticket entered into a Designated
          Drawing;
        </ol>
        <ol>
          {" "}
          20. "User" means any person that opens and maintains an Account on
          Mylottohub;{" "}
        </ol>
        <ol>21. "Winning Ticket" means any Ticket that wins a prize;</ol>
        <ol>
          {" "}
          22. "You" and "Your" means each person, entity or entities who visits
          this Application for any purpose.
        </ol>
        <p className="fw-bolder">2. User Agreement</p>
        <p>
          By accessing the Mylottohub, creating an account via the
          Application/website (an "Account"), or clicking to accept or agree to
          these Terms of Service when this option is made available to you, you
          hereby (a) acknowledge that you have read and agree to be bound to and
          abide by these Terms of Service; (b) represent and warrant that you
          are eligible to access the Mylottohub website/Application and are
          authorized and able to accept these Terms of Service; and (c)
          acknowledge that you have read Mylottohub's Privacy Policy, available
          at{" "}
          <a target="_blank" rel="noreferrer" href="https://mylottohub.com">
            {" "}
            https://mylottohub.com
          </a>{" "}
          and agree that Mylottohub may collect, process, store, and disclose
          your information consistent with its policy. If you do not wish to be
          bound by these Terms of Service, you must not access or use the
          Application/website. By declining to accept these Terms of Service,
          you will be unable to create an Account or access or use the
          Application. We reserve the right to change these Terms of Service at
          any time without prior notice to you. If we make what we determine to
          be material changes to these Terms of Service, we will notify you by
          prominently posting a notice or by sending a notice to the e-mail
          address on file. It is your obligation to provide us with notice of
          any change to your e-mail address by sending us notice immediately to{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com
          </a>
          Your continued use of the website/Application following such material
          changes constitutes your affirmative consent to the changes. If you do
          not agree to the changes, your sole remedy is to cease using the
          Application and provide written notice of same{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com
          </a>
          We will automatically deactivate your Account and return any funds
          remaining in your Account, as detailed in these Terms of Service,
          unless you instruct us otherwise. You are expected to check this page
          each time you access the Mylottohub website/Application so you are
          aware of any changes, as they are binding on you.
        </p>
        <p className="fw-bolder">3. Eligibility</p>
        <p>
          In order to create an Account, buy Tickets and/or claim prizes on
          Mylottohub, you must, at the time of registration:
        </p>
        <ol>
          1. be at least 18 years of age; <br />
          <br /> 2. be physically located in a state in the Federal Republic of
          Nigeria and in a "Jurisdiction" in which Mylottohub is unrestricted by
          law;
          <br />
          <br /> 3. not be a person barred from using the Mylottohub, or a
          similar lottery service, or barred from ordering or purchasing lottery
          tickets under the laws of any Jurisdiction or the Federal Republic of
          Nigeria;
          <br />
          <br /> 4. at all times abide by these Terms of Service as set forth
          herein;
          <br />
          <br /> 5. provide accurate and complete personal information where
          requested, and update Mylottohub if your information changes,
          including email address, phone number or bank account information;
          <br />
          <br /> 6. ensure that the name on your bank account(s) matches the
          name on each of your played tickets; and
          <br />
          <br /> 7. comply with any other applicable laws, regulations, or legal
          requirements.
        </ol>
        <p>
          If you do not meet all of these requirements, you must not access or
          use the Application. Mylottohub reserves the right to verify your age
          and/or identity and eligibility at any time. Any failure to cooperate
          with Mylottohub in this respect may result in the suspension and/or
          termination of your Account. Eligibility determinations are made by
          Mylottohub, in its sole discretion.
        </p>
        <p>
          BY ACCESSING OR USING THE APPLICATION/WEBSITE, YOU REPRESENT AND
          WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY AND CAPACITY TO ENTER INTO
          THIS AGREEMENT, TO ABIDE BY ALL OF THESE TERMS OF SERVICE, THAT YOU
          ARE NOT PROHIBITED OR RESTRICTED FROM ACCESSING OR USING THE
          APPLICATION, AND THAT YOU MEET ALL OF THE ELIGIBILITY REQUIREMENTS SET
          FORTH ABOVE. THE COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES,
          IMPLICIT OR EXPLICIT, AS TO YOUR LEGAL RIGHT TO ACCESS OR USE THE
          APPLICATION AND NO PERSON AFFILIATED, OR CLAIMING AFFILIATION, WITH
          MYLOTTOHUB SHALL HAVE AUTHORITY TO MAKE ANY SUCH REPRESENTATIONS OR
          WARRANTIES. MYLOTTOHUB DOES NOT INTEND FOR THE APPLICATION TO BE USED
          BY PERSONS PRESENT IN JURISDICTIONS IN WHICH PARTICIPATION IS
          PROHIBITED OR RESTRICTED. YOU AGREE THAT THE AVAILABILITY OF THE
          APPLICATION DOES NOT CONSTITUTE AN OFFER, SOLICITATION OR INVITATION
          BY MYLOTTOHUB FOR THE USE OF THE APPLICATION IN ANY JURISDICTION IN
          WHICH SUCH ACTIVITIES ARE PROHIBITED OR RESTRICTED. MYLOTTOHUB
          RESERVES THE RIGHT TO DENY ACCESS TO THE APPLICATION TO ANYONE AT ITS
          SOLE DISCRETION.
        </p>
        <p className="fw-bolder">4. User Accounts</p>
        <ol>
          1. <span className="fw-bolder">Registration for an Account.</span> To
          register for an Account, download the Application or visit the
          mylottohub website and complete the online registration process. You
          will be required to submit personal information including your phone
          number and email address. You will then be prompted to verify your
          email address. By accepting these Terms of Service, you agree to
          receive email or SMS messages at the email address or the mobile
          telephone number you provide to Mylottohub. Please note that at
          registration and while you maintain an Account, we will ask you to
          verify your email address or by our customer care agents calling you
          at the number you provided. You consent to these calls by accepting
          these Terms of Service. If you do not respond to our requested
          communication or we cannot reach you via the email address or phone
          number you have provided (for instance in the event your mobile phone
          company has suspended your account or email address), then we may
          suspend your Account until we are able to reach you via the number or
          email you provided at registration. If you need to update your phone
          number or email, please log-in through your Account and update your
          mobile number or send an email to
          <a
            style={{ marginLeft: "5px" }}
            href="mailto:customercare@mylottohub.com"
          >
            customercare@mylottohub.com
          </a>
          .<br />
          <br /> 2. <span className="fw-bolder">Age Verification.</span> Before
          you can place a ticket, your age must be verified. You will be
          required to provide the details requested including but not limited to
          your name, date of birth, and we will also collect your bank details
          as we know that the banks only approve customers above the age of 18
          to operate a bank account. You may also be asked to provide a picture
          of a government ID. Mylottohub accepts current (non-expired) state
          driver's licenses or international passport, NIN number of other means
          of identification issues by the government of the Federal republic of
          Nigeria. By creating an Account and providing your contact information
          and phone number on this Application, you agree to provide accurate
          and current information about yourself, and to maintain and promptly
          update your profile information in the event it changes (such as your
          address or e-mail address) after Account creation. You may modify your
          profile information by logging into your Account and making such
          changes. For further assistance, please contact customer service at
          <a
            style={{ marginLeft: "5px" }}
            href="mailto:customercare@mylottohub.com"
          >
            customercare@mylottohub.com
          </a>
          <br />
          <br /> 3. Any information collected by the Mylottohub will be held
          subject to Privacy and "just-in-time" notices, if any, provided at the
          point of information collection or use. By creating an Account on this
          Application, you also agree to allow Mylottohub to contact you via
          email, auto-dialed calls or texts or through any other means necessary
          to verify and update your profile and order information, or collect
          additional information related to your Account. <br />
          <br /> 4. <span className="fw-bolder">Marketing</span>. You
          acknowledge and agree that Mylottohub may send you emails containing
          information about lottery products, such as games and promotions, as
          well as notifications pertaining to your Account activity. You may
          opt-out of promotional emails by following the opt-out instructions in
          the emails. However, we will still contact you regarding
          administrative matters concerning your Account. If you provide any
          information that is inaccurate or not current, or Mylottohub has
          reasonable grounds to suspect that such information is inaccurate or
          not current, or you cannot be reached for any reason, Mylottohub
          reserves the right to suspend or cancel your Account, withhold your
          Account balance, revoke your right to any Tickets or corresponding
          winnings, and refuse any and all current or future use of it’s
          website/Application (or any portion thereof). <br />
          <br /> 5. <span className="fw-bolder">
            Security of Your Account.
          </span>{" "}
          Access to, and use of your Account is strictly limited to you as the
          registered User of your Account. You are required to immediately
          notify Mylottohub at
          <a
            style={{ marginLeft: "5px" }}
            href="mailto:customercare@mylottohub.com"
          >
            customercare@mylottohub.com
          </a>{" "}
          if you discover fraudulent or unauthorized play, funds transfers or
          suspect that someone else is using your account login credentials
          without your permission.
          <br />
          <br /> 6.{" "}
          <span className="fw-bolder">
            One (1) Account/No Transfer of an Account.
          </span>{" "}
          Only one (1) Account is allowed per person. You are strictly
          prohibited from opening or operating a shared account, and Mylottohub
          may suspend or terminate your use of the Application if in our sole
          discretion, we deem you to be sharing an Account, or providing false
          Account information. In the event Mylottohub determines that you have
          registered more than one (1) Account, you acknowledge and agree that,
          in addition to any other rights Mylottohub may have, Mylottohub has
          the right to suspend or terminate your Account immediately, withhold
          your Account balance, revoke your right to any Tickets or
          corresponding prizes, and refuse any and all current or future use of
          the Application (or any portion thereof). If you need to update the
          name on an Account (such as a name change due to marriage), please
          contact us at{" "}
          <a
            style={{ marginLeft: "5px" }}
            href="mailto:customercare@mylottohub.com"
          >
            customercare@mylottohub.com
          </a>{" "}
          . Please note that you will be asked to provide verifying information
          and that all documentation must be complete and accurate.
          <br />
          <br /> 7.{" "}
          <span className="fw-bolder">
            {" "}
            Your Account is not transferable.
          </span>{" "}
          You may not transfer or share your account with any other party. Each
          individual must open its own Account. The name on any Ticket order
          must match the name on your Bank aaccount registered on the platform.
          In the event of any dispute, the Account holder (i.e. the person or
          entity who opened the Account and provided payment information) is
          deemed the owner of the Ticket. Under no circumstances shall you allow
          or permit any other person or third party, including, without
          limitation, any person under the age of eighteen (18) (or twenty-one
          (21) where required in the applicable Jurisdiction) or who are barred
          from ordering or purchasing Tickets under the laws of the applicable
          Jurisdiction or, to use the Application or to use or re-use your
          Account, including but not limited to, in such a way that may breach
          the standards or laws in any Jurisdiction where you are located and/or
          are a resident, or where such other person is located and/or is a
          resident. You accept full responsibility for any unauthorized use of
          the Application/website or of your Account and for any use of your
          payment instrument by any other person or third party in connection
          with your Account. Any person found to have violated this section may
          be reported to the relevant authorities and Mylottohub has the right
          to suspend or terminate your Account immediately, withhold your
          Account balance, revoke your right to any Tickets or corresponding
          prizes, and refuse any and all current or future use of the
          Application (or any portion thereof). Mylottohub will not be liable
          for any loss that you may incur as a result of someone else using your
          Account.
          <br />
          <br /> 8.{" "}
          <span className="fw-bolder">
            Equipment Obligation to Use Application.
          </span>{" "}
          You must provide all equipment and software necessary to download and
          use the Application, including, but not limited to, a mobile device
          that is suitable to connect with and use the Application. You are
          responsible for any fees, including, but not limited to, Internet
          connection or data usage fees, including, without limitation, SMS/MMS
          text usage fees, that you incur when accessing the Application. <br />
          <br />
          9. <span className="fw-bolder">Account Termination</span>. Your
          Account may be suspended or terminated and won amounts may be returned
          to the operator, if applicable, for:
          <br />
          1. Fraud or suspected fraud of any type; <br /> 2. Violation or
          suspected violation of these Terms of Service, our Privacy Policy, or
          any applicable regulations, state or federal laws; or <br /> 3. Any
          other reason as set forth in the Terms of Service, including as the
          Terms of Service may be amended from time to time.
        </ol>
        <p>
          In the event of Account suspension, Mylottohub may, in its sole
          discretion, restrict all Account functionality, including but not
          limited to play, winnings claim, Account Funding and withdrawals.
          Registered Users of Accounts for which suspension escalates to Account
          termination may be subject to forfeiture of winnings awarded for
          Winning Tickets back to the Regulator, and will be permanently
          restricted from using mylottohub website/Application in any capacity.
          Mylottohub may also restrict any person or entity found to be using or
          attempting to be using the website/Application fraudulently, or with
          intent to commit fraud, disrupt the Application, or create harm to
          mylottohub, its Users, or any third party, including for research or
          any other purpose outside of the stated purposes mylottohub.
        </p>

        <p>
          Users can also unsubscribe from Mylottohub. To unsubscribe from
          Mylottohub and de-activate your Account, you will need to contact{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com.
          </a>{" "}
          If you unsubscribe, winnings will be transferred to the User in a
          reasonable manner at the discretion of Mylottohub and the Account will
          be deactivated. You will need to delete the Application or write a
          request asking to complete the process by blocking your account from
          placing bets on the Mylottohub platform. Mylottohub is under no
          obligation to permanently delete any data except as otherwise may be
          set forth in our Terms and conditions. USERS CANNOT DEACTIVATE THEIR
          ACCOUNT IF THEY HAVE ANY PENDING OR IN-PROCESS FUND REQUESTS OR IF
          THEIR ACCOUNT IS ALREADY LOCKED.
        </p>
        <p className="fw-bolder">
          5. Account Funding, Placing Bets and Withdrawals
        </p>

        <p>
          <span className="fw-bolder"> 1. Withdrawable Winnings</span> <br />
          When there is a Winning Ticket with a prize value not less than or
          equal to One thousand Naira (N1,000) the User will be credited with
          Withdrawable winning amount request and this request will be
          transferred to a User's eligible bank account. <br />
          <br />
          <span className="fw-bolder"> 2. Non-withdrawable Deposits </span>{" "}
          <br /> Bank deposits made to Mylottohub are Non-Withdrawable and
          Non-refundable Deposits, which are Mylottohub deposits that may be
          spent on new Ticket purchase using the website/Application, but which
          may not be transferred to a User's eligible bank account. Any deposit
          given to a User for any reason other than for a Winning Ticket will be
          non-Withdrawable. This includes Account Funding, referrals,
          promotions, contests, compensation, and refunds.
          <br />
          <br /> 3. <span className="fw-bolder"> Promo Codes/Bonuses</span>{" "}
          <br /> Mylottohub may from time to time offer bonuses or promo codes
          to be used alone or in conjunction for playing Tickets/ placing bets
          on the Application. Promo codes/Bonuses are valid for a limited time
          only and Bonuses apply only to the qualifying operator offering the
          Bonus. Bonus play /Promo code offers will not be valid until applied
          to a qualifying operator and promo code/Bonuses will not apply until
          play is complete, or all conditions for promotions are met. Each Bonus
          is limited to one one ticket and may be accumulated but only limited
          to play on the Operator issuing the Bonus and not be combined with any
          other operator/promotions. Mylottohub, in its sole discretion,
          reserves the right to accept, refuse, limit, modify or cancel any
          promotion /Bonus at any time for any reason without prior notice to
          you. Promo codes and Bonus are void where prohibited by law and only
          good while supplies last. <br />
          <br />
          4. <span className="fw-bolder"> Referral Program</span>
          <br /> Mylottohub can implement referral programs from time to time,
          where Users can refer new Users in exchange for Non-Withdrawable
          Deposits. Any User that is referred must be a real and unique person
          who consents to such referral and uniquely opens their account and
          cannot have previously used the website/Application. Any such new User
          must meet the eligibility requirements set forth in these Terms of
          Service and must not have had an Account suspended or terminated by
          Mylottohub. Any attempt by a User to use the referral program for
          fraud or other misuse is subject to suspension or termination and
          shall not have any right to receive Non-Withdrawable Deposit for such
          referrals.
          <br />
          <br /> 5.<span className="fw-bolder"> Play of Tickets</span> If a User
          plays a new Tickets, Mylottohub will first play from Non-Withdrawable
          Deposit wallet to the cost of the ticket played. Also, users can
          transfer from their withdrawable winnings/wallet to their
          Non-withdrawable Deposit and then this can be used for play.
          <br />
          <br />
          <span className="fw-bolder"> 6. Refunds and Cancellations</span>{" "}
          <br /> All sales of played Tickets through the Application are final
          and are ineligible for refund or cancellation at any time. Mylottohub
          is expressly not responsible for any refunds on any played tickets
          placed from your Account, including but not limited to any Plays you
          may claim were placed inadvertently or by mistake/accident. Please
          review your Played Tickets before you place them. If we are unable to
          verify or authenticate any information you provide during any
          registration, ordering, purchase, sale, authentication, delivery,
          payment or remittance process, or any other process, or if we are no
          longer able to verify or authorize your debit cards or bank account
          information, your Tickets may be cancelled, we may refuse to honour
          all pending and future Ticket plays made with the bank account and/or
          via any Account associated with the debit card or bank account, and
          your account is subject to suspension and/or cancellation. We may also
          prohibit you from using the Website/Application for a period of time.
          Users of Accounts for which suspension escalates to account
          cancellation may be subject to forfeiture of Winnings awarded for
          Winning Tickets to the appropriate Operator and may be permanently
          prohibited from using this Mylottohub in any capacity. All remaining
          unplayed Mylottohub deposits will be forfeited to Mylottohub upon
          account cancellation. You shall have no recourse and Mylottohub shall
          have no liability as a result of any such cancellation. In the event
          of any Account suspension or cancellation, all provisions of these
          Terms of Service relating to User warranties, confidentiality
          obligations, proprietary rights, and limitation of liability shall
          remain effective despite such suspension or cancellation. For specific
          suspension or cancellation questions, please email to{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com.
          </a>{" "}
          Withdrawable Winnings may be withdrawn from an Account at any time.
          Withdrawable Winnings can be withdrawn to a bank account instantly. If
          you do not receive your funds within 1hour of your withdrawal request,
          please submit a claim to{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com
          </a>{" "}
          for additional assistance <br />
          <br />
          7.
          <span className="fw-bold">
            {" "}
            Chargebacks/Insufficient Fund Charges{" "}
          </span>
          <br />
          You are responsible for any and all bank and legal fees incurred by
          you or Mylottohub associated with your disputed charges and
          chargebacks or insufficient funds for orders or attempted orders made
          on the Application. Additionally, Mylottohub will not charge you a fee
          in the event Mylottohub incurs any such bank or legal fees. You will
          be notified by e-mail of any chargebacks or fees.
          <br />
          <br /> <span className="fw-bold">8. Bank Information</span> <br />
          It is important that your bank account information be accurate and
          complete at all times. If you change banks, please promptly write to
          update your banking information by sending Mylottohub a mail for
          account details changes. In the event Mylottohub detects any potential
          fraud associated with your Account, including your bank account,
          Mylottohub may suspend or terminate your Account. Mylottohub reserves
          the right to cancel any Tickets ordered through an Account deemed to
          be associated with a fraudulent payment (such as a stolen debit card),
          including by forfeiture of any winnings you would have received that
          were ordered with a fraudulent payment or Account. Notwithstanding
          anything to the contrary herein, you may only fund your Account with a
          funding source that is owned by you.
          <br />
          <br />
          <span className="fw-bold">9. Funding with a Bank Account</span> In
          order to use the payment functionality of pay with bank, you must
          transfer funds to the virtual account number generated by monnify for
          you as this account number is an account number generated to help fund
          your account. "This service is provided by Monnify and you are
          responsible for the accuracy and completeness of that data. Mylottohub
          will provide customer support for your Monnify deposits. If you have
          issue with your deposits reach out to the customer care at{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com
          </a>{" "}
          . Mylottohub uses Monnify to gather User data from financial
          institutions. By using the Application, you grant Mylottohub the
          right, power, and authority to act on your behalf to access and
          transmit your personal and financial information from the relevant
          financial institution. You agree to your personal and financial
          information being transferred, stored, and processed by monnify in
          accordance with the monnify policy. Each time you use monnify to fund
          your Account with a single transaction, you agree to the following: "I
          authorize Mylottohub to debit the customer’s bank account, the amount
          indicated and credit the customer’s Mylottohub account with the same
          value. I will not dispute Monnify debiting my account, so long as the
          transaction corresponds to the terms in this online form and my
          agreement with Mylottohub." You must ensure that your name and
          customer details on any Ticket purchase you place through Mylottohub
          always matches your bank account name used to make the deposit. The
          authorized bank account holder will be deemed the Ticket holder in the
          event of any dispute. <br />
          <span>10. Funding with a Debit Card </span> <br />
          The bank services for debit card transactions are provided by Paystack
          or flutterwave. By funding your Account using a debit card, you agree
          to their privacy policy and terms of use. You must ensure that your
          name on any Ticket order you place through Mylottohub always matches
          your debit account name. The authorized debit account holder will be
          deemed the Ticket holder in the event of any dispute. <br />
          <br />
          <span className="fw-bold">11. Funding with Tingtel</span>
          <br /> If you use Tingtel to fund your account, by airtime using
          tingtel you agree to the applicable product’s Terms and Conditions and
          Privacy Policy, as may be updated from time to time. You authorize
          Mylottohub to share your identity and Account data with Tingtel, as
          applicable, for the purposes of supporting such account, and you are
          responsible for the accuracy and completeness of that data. You must
          ensure that your user ID on Mylottohub always matches your Tingtel
          account name, as applicable. The authorized account holder will be
          deemed the Ticket holder in the event of any dispute.
          <br />
          <br />
          <span className="fw-bold">
            {" "}
            12. Withdrawing Your winnings to Your Bank Account
          </span>
          <br /> Withdrawal/ winnings cash-out is an option for withdrawing your
          won amount irrespective of the Operator games played on the Mylottohub
          platform. Withdrawing your Winnings will allow you to withdraw your
          winnings to your bank account. If you use Withdraw to transfer your
          Mylottohub winnings from your player account to your bank account, you
          agree to our Withdrawal Terms and Conditions and Privacy Policy, as
          may be updated from time to time. You authorize Mylottohub to share
          your identity and Account data with its Associated Banking/ Fintech
          partners for the purposes of supporting such a withdrawal, and you are
          responsible for the accuracy and completeness of that data.
        </p>
        <p className="fw-bold"> 6. Mylottohub Services </p>

        <p>
          {" "}
          Upon registering with Mylottohub, you will be able to utilize the
          Application or website to order official lottoTickets over the
          internet; sign-up, log into your Account; view past Tickets and
          upcoming Tickets; manage your Account; and access other information
          related to the officially licensed Lotteries. Mylottohub is an online
          lotto agent that aggregates all Nigerian Lottery operator games for
          play on its platform.
        </p>
        <p className="fw-bold"> 7. Online Agent Model and Ticket Orders</p>
        <ol>
          1. Mylottohub acts as the technology service provider as well as
          online agent working on the User's behalf. Mylottohub is not a Lotto
          Operator. Mylottohub is a software developer that provides
          downloadable mobile applications to Users. Via the Application, Users
          can buy new Lotto Tickets from the Lotto Operators, determine whether
          their Tickets qualify for winnings, view their winnings, and use their
          Mylottohub Deposits to order new lotto tickets. Mylottohub has an
          agreement with the licensed operator granting Mylottohub the right to
          act as the operator's agent for payment of debts owed to the Operators
          by players playing the Lottery through purchases of Tickets offered by
          the operator. <br /> <br />
          2. When ordering a Ticket through Mylottohub, you are placing an order
          for a Ticket and not purchasing a Ticket directly. As a service
          provider and acting on your behalf, Mylottohub will fulfill that order
          through a licensed operator in the Jurisdiction where the order was
          placed. Mylottohub is the operator's authorized agent for accepting
          payment from Users.
          <br /> <br /> 3. In connection with a Ticket order/purchase,
          Mylottohub receives funds from the User and transmits those funds to
          the Operator. Mylottohub earns commission from tickets ordered through
          its platform. Mylottohub never charges a fee on placing an order or on
          any winnings or distributions.
          <br /> <br />
          4. Mylottohub will order your Ticket(s) from a licensed Lottery
          operator in time for the Designated Drawing and will upload details of
          your ticket to your Account. We abide by all regulations to ensure
          that your request will be processed in time. A Ticket, in order to be
          a validly issued Ticket, shall be generated by a Licensed lottery
          operator authorized by the National Lotteries Regulatory Commission.
          If there is anything incorrect with your Tickets, please email us
          immediately at
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com
          </a>{" "}
          .<br /> <br /> 5. We will do our best to resolve your issue. Our mode
          of resolution is in Mylottohub's sole discretion. We will only refund
          the cost of the ticket in the event the error is caused by Mylottohub.
          <br /> <br /> 6. If for any reason, Mylottohub is unable to purchase
          the Ticket you have ordered before the Operator cut-off time for the
          Designated Draw, you will receive a full refund of your stake. IN ALL
          CIRCUMSTANCES, MYLOTTOHUB IS NOT RESPONSIBLE FOR PAYING OUT PRIZES IN
          THE RARE CASE THAT THE TICKET WAS NEVER PURCHASED.
          <br /> <br /> 7. The order of Tickets and right to any prizes/winnings
          on Mylottohub is strictly limited to registered Users who are at least
          18 years of age (or 21 where required in the applicable Jurisdiction).
          <br /> <br /> 8. The authorized Account holder will be deemed the
          Ticket holder. You must ensure that the name on your Ticket order and
          Bank Account matches the name on your Mylottohub Account. 9.
          Mylottohub imposes a daily funding and Ticket purchase limit per
          Account holder and may in its sole discretion change the daily funding
          or purchase limit on an individual basis. Users may also adjust their
          daily funding or purchase limit within the App or by contacting
          Customer care.
        </ol>
        <p className="fw-bold">8. Avoid Lottery Scams</p>
        <p>
          This is a warning to all Players about scammers who are sending false
          announcements regarding lottery prizes. As part of the scam, an
          individual is contacted by phone, email, text message, or a letter
          from a scammer who is claiming that the recipient has won a prize with
          a lottery operator. Unless you hear from Mylottohub directly, this is
          a fraudulent claim and there is no such prize. Never respond to these
          communications and never provide information or send money to a
          scammer.
          <br />
          <span
            className="text-uppercase"
            style={{ textDecoration: "underline" }}
          >
            Warning Signs
          </span>
          <ol>
            • Although Mylottohub has your contact information and knows that
            you have won, the Operator does NOT know who the winners are until
            they come forward with a winning ticket. The Lottery operator does
            not notify you, you will be notifying the Operator. • Mylottohub
            does not require the payment of any money in order to claim a
            winning.
            <br />
            • No one should ever send any money to pay any ‘processing fee’ or
            any other requested fee in order to claim winnings. <br />
            • Never make deposit into any other account asides the Virtual
            Online services account displayed on your screen for funding your
            account.
            <br />
            • to cover processing or claiming fees. This is fraudulent and your
            account will not be credited.
            <br />
            • Never provide any personal or financial information to a scammer,
            especially Debit card numbers, bank account numbers, <br />• Report
            the Scam to{" "}
            <a href="mailto:customercare@mylottohub.com">
              customercare@mylottohub.com
            </a>{" "}
            .
          </ol>
          l. Exclusions/Self-Exclusions. No Arrangements for Prohibited
          Persons/Excluded Persons. You acknowledge that Mylottohub is a
          Nigerian Company. As such, Mylottohub:
          <ol>
            • Mylottohub reserves the right to prohibit certain "prohibited
            persons" that are government officials from using the app. <br /> •
            Mylottohub reserves the right to prohibit any "excluded persons"
            that are listed on an applicable "exclusion list" from using the
            app. <br /> • Persons who have executed and submitted to Mylottohub
            an appropriate request for voluntary self-exclusion from using the
            Application, or purchasing or ordering Tickets or other services, in
            accordance with Mylottohub's voluntary self-exclusion thereunder
            ("Voluntary Self-Exclusion") may not use the Application. Mylottohub
            is not liable for any access by or services provided to a
            self-excluded person's accessing the Application/Website or creating
            an Account. <br />• As set forth and unless otherwise indicated in
            these Terms of Service, other persons are excluded from using
            Mylottohub or creating an Account. Those persons include:{" "}
            <ol>
              1. Those under the age of 18 (or 21 where required in the
              applicable Jurisdiction); <br />
              2. Mylottohub employees, officers and directors.
              <br /> 3. Those who are not located in a Jurisdiction where
              Mylottohub can legally order Tickets.
              <br /> 4. Those who do not meet the eligibility and verification
              requirements, including identification requirements. 5. Those
              excluded by the applicable Regulator.
            </ol>
            • Mylottohub, in its sole discretion, may exclude any person or
            entity from using its application or opening an Account.
          </ol>
          Other Parties. As set forth and unless otherwise indicated in these
          Terms of Service, other persons are excluded from using the
          Application or creating an Account. Those persons include those under
          the age of 18 (or 21 where required in the applicable Jurisdiction);
          employees, officers, and directors of Mylottohub and any of its or
          their parent companies, subsidiaries, affiliates as well as direct
          technology vendors, content providers, component suppliers (both
          hardware and software) directly related to the Application, and each
          of their respective immediate family (defined as parents, spouse,
          partner, and children) residing in the same household (but as noted
          above, such persons may, however, access the Application, and will
          from time-to-time do so for the purpose of testing the Application,
          including, without limitation, evaluating User experience, and other
          reasonable and fair uses at the sole discretion of Mylottohub); those
          who are not located in a Jurisdiction where Mylottohub can legally
          order Tickets or digital currency services on a User's behalf; those
          who do not meet the eligibility and verification requirements,
          including identification requirements; and those excluded by the
          applicable Regulator. Mylottohub may exclude any person or entity from
          using its application/website or opening an Account in its sole
          discretion.
        </p>
        <p className="fw-bolder">9. Winning Tickets and Prize Claiming</p>
        <p>
          When a registered user has a winnings claim, Mylottohub transmits
          winnings to the User. You consent to Mylottohub storing any Ticket on
          your behalf. Once the draw and the winning results are out, Mylottohub
          will notify you in the Application/website and email you to let you
          know if your Ticket is a Winning Ticket. If it is a Winning Ticket and
          the prize value is less than or equal to the In-Store Redemption
          Threshold, Mylottohub will automatically credit your Account / winning
          wallet for the full prize value, as further described in Section (1)
          below. If a Winning Ticket has a prize value worth more than the
          In-Store Redemption Threshold, Mylottohub will arrange the delivery of
          the won prize to the User, as further described in Section (2) below.
          Winning claims made through Mylottohub are subject to the prize payout
          rules and regulations set forth by the Regulator. Mylottohub may
          provide the Regulator with any User Personal Information as requested
          by the Regulator, including to process prize claims. Such information
          may include, but is not limited to, the full name, address and phone
          number listed in your Account.
        </p>
        <p>
          1.{" "}
          <b>
            {" "}
            Winning Tickets with prizes totalling less than or equal to the
            In-store Redemption Threshold.
          </b>{" "}
          By using the Application, you authorize Mylottohub to store and claim
          Winning Tickets with prize totals that are less than or equal to the
          In-Store Redemption Threshold in the Jurisdiction of purchase on your
          behalf via an authorized lottery Operator as soon as drawing results
          are posted.{" "}
          <b>
            {" "}
            Neither Mylottohub nor the authorized Operators from which
            Mylottohub collects these prizes will withhold any applicable taxes
            on your behalf.
          </b>{" "}
          Mylottohub will deposit the full prize value into your Mylottohub
          account in the form of Withdrawable funds. These Withdrawable Funds
          may be transferred to an eligible current or savings account in
          accordance with these Terms of Service. Users may also keep the
          Withdrawable Winnings and use them towards future Ticket Purchase.
          <b>
            {" "}
            You are ultimately responsible for paying any tax liability
            associated with claims made through this Application/website for
            Winning Tickets with prizes that are less than or equal to the
            In-Store Redemption Threshold in the state of purchase.
          </b>{" "}
          The In-Store Redemption Threshold varies per Operator. Payouts for
          these prizes will be facilitated via Monnify and will require the User
          to cooperate with all necessary Know Your Customer ("KYC") regulatory
          requirements.
        </p>
        <p>
          {" "}
          <b>2. Prohibition on Claiming Winning Tickets.</b> You are prohibited
          from claiming, or attempting to claim, any Winning Tickets in any
          manner that is inconsistent with Mylottohub terms. In the event you
          claim, or attempt to claim, any Winning Ticket in a manner that is
          inconsistent with this Section, you agree that Mylottohub will have no
          liability to you with respect to such Winning Ticket, including,
          without limitation, the obligation to deposit any Withdrawable
          winnings into your Account associated with Mylottohub. Additionally,
          in the event that you and Mylottohub both claim the prize for any
          Winning Ticket, Mylottohub has the right to immediately remove any
          associated Withdrawable Credits from your Account and suspend or
          terminate your Account. You shall indemnify, defend and hold harmless
          Mylottohub for any claims, losses, expenses and all other liabilities
          Mylottohub incurs as a result of your failure to comply with these
          Terms of Service.
        </p>
        <p>
          {" "}
          <b>3. Winning Ticket is a Bearer Instrument.</b> Note that your ticket
          is a bearer instrument within the meaning of all applicable law, such
          that the holder of the ticket is presumed to be the owner of the
          ticket with all applicable rights in the ticket and its proceeds.
          Therefore, if you obtain details of your winning ticket in your
          account no one else has possession to such details, Mylottohub
          attempts to mitigate this risk by placing the winning ticket in the
          customer’s transaction within the customer’s transaction history.
          Mylottohub cannot be held responsible for any lost tickets or other
          tickets that, for whatever reason, are not in the winning customer’s
          possession or play history.
        </p>
        <p className="fw-bold">10. Pro-forecaster Subscription</p>
        <p>
          Subscription to pro-forecasters is a service offered by Mylottohub to
          help users subscribe to Pro-forecaster who help them forecast/predict
          possible outcome to future drawings. Any User may participate in
          Autoplay subscriptions, subject to the following terms and
          requirements:
          <ol>
            {" "}
            1. Forecast subscriptions may only be available for certain
            Lotteries. Check the Application to see which Lotteries are
            available for Forecast subscriptions.
            <br /> 2. There is no assurance or guarantee of Winning a draw from
            forecasted numbers. Mylottohub is not responsible for any outcome
            related to a Pro-forecaster subscription. <br /> 3. Some Forecast
            numbers are generated by AI from Mylottohub pool of results.
          </ol>
        </p>
        <p className="fw-bold"> 11. Randomize</p>
        <p>
          Users may elect to utilize Mylottohub to generate and/or order
          pseudo-random selection. By using Mylottohub, you understand and
          acknowledge that, as is common in random number generators, the
          randomization process is seeded by the timestamp of its initial
          generation request (as recorded by Mylottohub) and, as such, cannot be
          classified a "True Random Number" by definition. You further
          understand that Mylottohub cannot be held responsible for the numbers
          chosen for any of the pseudo-randomly generated derived through this
          system. <br />
          <br />
          1. From time to time, the Company may in its sole discretion develop
          and provide Application updates, which may include upgrades, bug
          fixes, patches and other error corrections and/or new features
          (collectively, including related documentation, "Updates"). Updates
          may also modify or delete in their entirety certain features and
          functionality. You agree that the Company has no obligation to provide
          any Updates or to continue to provide or enable any particular
          features or functionality. Based on your Mobile Device settings, when
          your Mobile Device is connected to the Internet either (i) the
          Application will automatically download and install all available
          Updates or (ii) you may receive notice of or be prompted to download
          and install available Updates. You acknowledge and agree that the
          Application or portions thereof may not properly operate should you
          fail to promptly download and install all Updates. You further agree
          that all Updates will be deemed part of the Application and be subject
          to these Terms of Service. <br />
          <br /> 2. Mobile Device and Service Charges. Certain features of the
          Application require communication with the Company's servers,
          including, without limitation, Application downloads and Updates,
          which may consume and exceed your service provider's data or minute
          allowance limits. You acknowledge and agree that you are solely
          responsible for any charges incurred with your data/mobile service
          provider as a result of the Application, including any overage and
          penalties assessed for exceeding the limits imposed by your service
          provider. You are responsible for the cost of your Mobile Device and
          to ensure that your Mobile Device meets the system requirements of the
          Application, including obtaining periodic updates or upgrades from
          your Mobile Device service provider to continue using the Application.{" "}
          <b>
            THE COMPANY DOES NOT WARRANT OR GUARANTEE THAT THE APPLICATION WILL
            BE COMPATIBLE OR FUNCTION WITH ANY PARTICULAR MOBILE DEVICE, NOR
            DOES THE COMPANY WARRANT OR ACCEPT ANY LIABILITY FOR OPERATION OF
            THE MOBILE DEVICE USED TO ACCESS THE APPLICATION.
          </b>
        </p>
        <p className="fw-bold">12. Intellectual Property Rights</p>
        <ol>
          1. Copyright Information and Non-Commercial Use Limitation. The
          Application and its Content are owned by Mylottohub, its Operators or
          other providers of such material and are protected by the Nigerian
          copyright, trademark, patent, trade secret and other intellectual
          property or proprietary rights laws. <br /> 2. The Company name, the
          Company logo and all related names, logos, product and service names,
          designs and slogans are trademarks of the Company or its affiliates or
          Operators. You must not use such marks without the prior written
          permission of the Company. All other names, logos, product and service
          names, designs and slogans are the trademarks of their respective
          owners.
        </ol>
        <p className="fw-bold">13. Use Prohibitions</p>
        <p>
          You agree to access and use this Application only for lawful reasons.
          You are responsible for knowing and complying with any and all laws,
          statutes, rules and regulations pertaining to your use of this
          Application. You are prohibited from using Mylottohub in a way that:
          <ol>
            1. Is threatening, violent, abusive, hateful, defamatory,
            slanderous, libellous, deceptive, fraudulent, tortious, indecent,
            vulgar, profane, obscene, or that Mylottohub deems in its sole
            discretion to be inappropriate for this Application or that seeks to
            interfere with other User's use or enjoyment of the
            Application/site.
            <br />
            2. Violates any law, regulation, or court order;
            <br />
            3. Accesses, collects or stores Personal Information about others;
            <br />
            4. Violates or infringes upon the rights of anyone else, including,
            for example, another person's Right to privacy;
            <br />
            5. Impersonates any person, business, entity, or IP address (e.g.,
            IP spoofing);
            <br />
            6. Involves uploading, posting, emailing, transmitting or otherwise
            making available any materials that you do not have a right to make
            available under any law;
            <br />
            7. Is commercial in nature, including, without limitation and for
            example, advertising, promotional or marketing materials, or spam,
            phishing or other unsolicited messages, or for your own research
            and/or development;
            <br />
            8. Gains or tries to gain unauthorized access to this Application,
            its computers and networks, or its user data, or that otherwise
            modifies or interferes with the use or operation of this
            Application;
            <br />
            9. Imposes an unreasonable or disproportionately large load on
            Mylottohub's infrastructure, including but not limited to automating
            scripts for Account creation, transmitting spam or using unsolicited
            mass emailing techniques;
            <br />
            10. Alters, damages, or deletes any content posted on this
            Application;
            <br />
            11. Contains or introduces computer viruses or other disruptive,
            damaging or harmful files or programs;
            <br />
            12. Otherwise violates these Terms of Service or any other
            guidelines or policies posted on this Application, including the
            Privacy Policy, which are incorporated by this reference into these
            Terms of Service; or
            <br />
            13. Uses the referral system to refer fake people or people that
            have otherwise not consented to or that are otherwise not aware of
            such referral.
          </ol>
          <p>
            Mylottohub will cooperate fully with any law enforcement officials
            and/or governmental agencies if requested or required in the
            investigation of any Users who violate these Terms of Service and
            may disclose your information to such law enforcement officials
            and/or agencies if required by law.
          </p>
        </p>
        <p className="fw-bold">
          14. Comments and Other User Submissions/Use of Information
        </p>
        <p>
          While Mylottohub does not claim ownership of any comments or
          suggestions that you may submit to Mylottohub, by submitting a comment
          or suggestion or any other material to this Application, you hereby
          authorize and grant Mylottohub the non-exclusive right and license to
          use, display, reproduce, modify and distribute the comment, suggestion
          or material in whole or in part, anywhere in perpetuity in any and all
          media outlets, whether alone or together, or as part of any material
          of any kind or nature. Without limiting any of the foregoing,
          Mylottohub will have the non-exclusive right and license to use, copy,
          edit, display, perform, distribute, modify and re-format the comment,
          suggestion or material in any manner that Mylottohub may determine.
          You waive any claims to compensation for any such right or license. By
          submitting a comment, suggestion or material, you represent and
          warrant to Mylottohub that you have all necessary rights in and to all
          comments, suggestions or materials you provide and all information
          they contain, and that such comments, suggestions or materials do not
          infringe upon any proprietary or other rights of third parties or
          contain any libellous, tortious, or otherwise unlawful information.
          You should note that by using the Application, you grant Mylottohub
          the non-exclusive right and license to use your full name and details
          of the game(s) you won (including the winner amount and any reason you
          have stated to Mylottohub for why you chose your numbers) in the event
          Mylottohub chooses to publish (through the Application/website or
          otherwise) this information concerning your win(s) for promotional or
          other purposes. Further, Mylottohub may use your image, your full
          name, and details of the game(s) you played or won to promote
          Mylottohub on social media and in other media, on the
          Application/website or in any other medium, on the Internet or
          otherwise. Your use of the Application/website constitutes permission
          (except where prohibited by law) to use your name, city, state,
          likeness, image, comments and/or voice for purposes of advertising,
          promotion, and publicity in any and all media now or hereafter known,
          throughout the world in perpetuity, without additional compensation,
          notification, permission, or approval, except as required by
          applicable law.
        </p>
        <p className="fw-bold">15. Disclaimers and Limitations of Liability</p>
        <p>
          1. Disclaimer of Liability. Mylottohub is not liable for any direct,
          indirect, incidental, consequential, or punitive damages (including,
          without limitation, those resulting from lost profits, lost data, or
          business interruption) arising out of your access to, use of, or
          inability to use, this Application/website or any material from this
          Application, including but not limited to damages caused by any
          failure of performance, interruption, error, omission, deletion,
          defect, delay in operation or transmission, computer virus, security,
          communication line failure, theft, destruction or unauthorized access
          to, alteration of, or use of record, whether for breach of contract,
          tortious behaviour, negligence or under any other cause of action.{" "}
          <br /> <br />
          2. Disclaimer of Warranty. Without limiting the foregoing, this
          Application and the material provided on this Application are provided
          "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
          NON-INFRINGEMENT. ANY CLAIMS FOR DAMAGES WILL BE LIMITED TO THE PRICE
          OF EACH INTERNET TICKET ORDER VIA THIS APPLICATION/WEBSITE. <br />
          <br /> 3. Disclaimer of Accuracy of Data. Mylottohub makes no
          warranties or representations as to the accuracy, completeness or
          timeliness of the materials, or content provided on this Application
          and assumes no liability or responsibility for any errors or omissions
          on this Application. No warranty, expressed or implied, is made
          regarding accuracy, adequacy, completeness, legality, reliability or
          usefulness of any materials or content. This disclaimer applies to
          both isolated and aggregate uses of the materials or content. If you
          find any errors or omissions, we encourage you to report them to{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com
          </a>{" "}
          . Mylottohub makes every effort possible to ensure that the winning
          numbers and prize amounts posted on this Application/Website and
          highlighted on individual Tickets are accurate and available within a
          reasonable amount of time after winning numbers are drawn for each
          lottery drawing. However, in the event of an error, the winning
          numbers and prize amounts in the official records of the Operator will
          stand as the final determination of prize monies owed to an Account.
          <br /> <br />
          <b>
            By using this Application/website you hereby waive any claim against
            Mylottohub for, or in connection with, the receipt of erroneous
            information. Mylottohub takes numerous steps to ensure that the
            Plays requested on Ticket orders exactly match the Plays included on
            the tickets Mylottohub electronically purchases from licensed
            lottery operators on your behalf. However, in the event of an error,
            the Plays included on the electronic ticket purchased in relation to
            your Ticket order will stand as the final determination of prize
            monies owed to your Account. By using this Application/Website you
            acknowledge that in the event of an error (caused by any means,
            including Mylottohub's error), Mylottohub is only liable for the
            purchase price of the Ticket and not the expected or projected
            amount to be won.
          </b>{" "}
          <br /> <br />
          4. Disclaimer of Endorsement. Mylottohub may from time to time
          distribute content supplied by third parties. Any opinions, advice,
          statements, services, offers, or other information or content
          expressed or made available by third parties, including information
          providers, Users, or others, are those of the respective author(s) or
          distributor(s) and do not necessarily state or reflect the opinion of
          Mylottohub and shall not be used for advertising or product
          endorsement purposes. Reference herein to any specific commercial
          products, process, or service by trade name, trademark, manufacturer,
          or otherwise, does not constitute or imply its endorsement,
          recommendation, or favouring by Mylottohub.
        </p>
        <p className="fw-bold">16. Dispute Resolution and Indemnity</p>
        <ol>
          1. Time Limit for Bringing Claims. YOU AGREE THAT REGARDLESS OF ANY
          LAW TO THE CONTRARY, ANY CLAIM OR CAUSE OF ACTION ARISING OUT OF OR
          RELATED TO THE TERMS OF SERVICE, THE APPLICATON OR ANY OF THE SERVICES
          PROVIDED BY MYLOTTOHUB OR THROUGH THE APPLICATION MUST BE SUBMITTED TO
          ARBITRATION WITHIN ONE (1) YEAR OR SUCH CLAIM SHALL BE FOREVER BARRED.
          THAT ONE-YEAR STATUTE OF LIMITATIONS SHALL BEGIN TO RUN ON THE DATE OF
          THE ALLEGED EVENT GIVING RISE TO THE CLAIM OR CAUSE OF ACTION, UNLESS
          OTHERWISE PROVIDED UNDER APPLICABLE LAW.
          <br /> 2. Resolving Disputes: PLEASE READ THE FOLLOWING SECTIONS
          CAREFULLY – THEY MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING
          YOUR RIGHT TO FILE A LAWSUIT IN COURT.
          <br /> 3. Let's Try to Work Things Out. We want to address your
          concerns without litigation. Before filing a claim against Mylottohub,
          you agree to try to resolve the dispute informally by contacting{" "}
          <a href="mailto:customercare@mylottohub.com">
            customercare@mylottohub.com
          </a>{" "}
          . Mylottohub. We'll try to resolve the dispute informally by
          contacting you via email. If a dispute is not resolved within 45 days
          of submission, you or Mylottohub may bring a formal arbitration
          proceeding as described below.
          <br /> 4. We Both Agree to Arbitrate. You and Mylottohub agree to
          resolve through final and binding arbitration any claims relating to
          these Terms of Service, the Application, and any Tickets, prizes or
          other services offered on or through the Application, except as set
          forth under Exceptions to Agreement to Arbitrate below. The
          arbitration shall be held in the jurisdiction in which mylottohub is
          domiciled. <br />
          5. Opt-out of Agreement to Arbitrate. You can decline this agreement
          to arbitrate by sending a letter to Mylottohub that must be postmarked
          within 30 days of your first acceptance of these Terms of Service. The
          letter must specify your first and last names, Account ID, mailing
          address, and explain that you are opting out of this arbitration
          provision. The letter should be sent to Info@mylottohub.com <br />
          6. Arbitration and Attorney's Fees. Mylottohub will pay all
          arbitration fees for claims less than N1,000,000 unless the arbitrator
          finds the arbitration to be frivolous. You are responsible for all
          other additional costs that you may incur in the arbitration
          including, but not limited to attorney's fees and expert witness costs
          unless Mylottohub is otherwise specifically required to pay such fees
          under applicable law.
          <br /> 7. Mylottohub and you agree that dispositive motions, including
          without limitation, motions to dismiss and motions for summary
          judgment, will be allowed in the arbitration. The arbitrator must
          follow these Terms of Service and can award the same damages and
          relief as a court, including injunctive or other equitable relief and
          attorneys' fees. Notwithstanding the foregoing, Mylottohub and you
          agree not to seek any attorneys' fees and expert witness costs unless
          the arbitrator finds that a claim or defense was frivolous or asserted
          for an improper purpose. Mylottohub and you understand that, absent
          this mandatory arbitration provision, Mylottohub and you would have
          the right to sue in court and have a jury trial. Mylottohub and you
          further understand that, in some instances, the costs of arbitration
          could exceed the costs of litigation and the right to discovery may be
          more limited in arbitration than in court. If Mylottohub is the
          prevailing party in the arbitration, applicable law may allow the
          arbitrator to award attorneys' fees and costs to Mylottohub.
          <br /> 8. No Class Actions. PLEASE READ THE FOLLOWING SECTIONS
          CAREFULLY – IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS. <br />
          9. You may only resolve disputes with us on an individual basis and
          may not bring a claim as a plaintiff or a class member in a class,
          consolidated, or representative action. You agree that class
          arbitrations, class actions, private attorney general actions, and
          consolidation with other arbitrations are not allowed.
          <br /> 10. BY AGREEING TO THIS ARBITRATION AGREEMENT, YOU ARE GIVING
          UP YOUR RIGHT TO GO TO COURT, INCLUDING YOUR RIGHT TO A JURY TRIAL AND
          TO PARTICIPATE IN A CLASS ACTION. YOU UNDERSTAND THAT BY AGREEING TO
          THIS ARBITRATION AGREEMENT AND CLASS ACTION WAIVER, YOU MAY ONLY BRING
          CLAIMS AGAINST MYLOTTOHUB AND ANY RELEASED PARTIES IN AN INDIVIDUAL
          CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS
          ACTION OR REPRESENTATIVE PROCEEDING. IF YOU DO NOT AGREE TO
          ARBITRATION, YOU SHOULD OPT OUT OF THIS ARBITRATION PROVISION PER THE
          TERMS OF SERVICE. OTHERWISE, YOU ARE NOT AUTHORIZED TO USE THE
          APPLICATION IN ANY WAY.
          <br />
          11. Indemnification. You agree to defend, indemnify and hold harmless
          Mylottohub from and against any claims, liabilities, damages,
          judgments, awards, losses, costs, expenses or fees (including
          reasonable attorneys' fees) arising out of or relating to your
          violation of these Terms of Service or your use of the Application,
          including, but not limited to, any use of the Application's Content
          and products other than as expressly authorized in these Terms of
          Service or your use of any information obtained from the Application.
          If you are obligated to provide indemnification hereunder, the Company
          may, in its sole and absolute discretion, control the disposition of
          any claim at your sole cost and expense. Without limitation of the
          foregoing, you will not settle, compromise or in any other manner
          dispose of any claim without the Company's written consent. If you are
          obligated to provide indemnification hereunder, the Company may
          withhold any payment it is otherwise required to make to you to offset
          your indemnity obligations.
        </ol>
        <p className="fw-bolder">
          17. General Terms
          <ol>
            1. Internet Privacy and Security. Due to the design of the Internet,
            Mylottohub cannot guarantee that communications between you and
            Mylottohub will be free from unauthorized access by third parties or
            will be secure. By agreeing to these Terms of Service, you expressly
            agree that your use of this Application is at your sole risk, and
            you agree that Mylottohub shall not be liable if a security breach
            occurs, or if this Application malfunctions, except as required by
            law.
            <br /> <br />
            2. Tax Obligation. You acknowledge that you are responsible to
            report your income and pay any taxes due to the appropriate federal,
            authorities in the Federal Republic of Nigeria. You further
            acknowledge that an applicable Lottery organization may retain a
            portion of your winnings and forward it to the appropriate taxing
            authority on your behalf.
            <br /> <br />
            3. Reliance on Information Posted and Third Party Links. The
            information presented on or through the Application is made
            available solely for general information purposes. The Company does
            not warrant the accuracy, completeness or usefulness of this
            information. Any reliance you place on such information is strictly
            at your own risk. The Company disclaims all liability and
            responsibility arising from any reliance placed on such materials by
            you or any other user of the Application, or by anyone who may be
            informed of any of its contents. This Application may contain links
            to third party applications. These links are provided solely as a
            convenience to you. If you click on any of these links, you will
            leave this Application. Mylottohub does not control, and is not
            responsible for, any third party applications or their content.
            Therefore, Mylottohub does not endorse or make any representations
            about third party applications, or any information, products, or
            materials found there. If you access any of the third party
            applications linked to this Application, you do so entirely at your
            own risk.
            <br /> <br />
            4. Waiver and Severability. No waiver of by the Company of any term
            or condition set forth in these Terms of Service shall be deemed a
            further or continuing waiver of such term or condition or a waiver
            of any other term or condition, and any failure of the Company to
            assert a right or provision under these Terms of Service shall not
            constitute a waiver of such right or provision. If any provision of
            these Terms of Service is held by a court or other tribunal of
            competent jurisdiction to be invalid, illegal or unenforceable for
            any reason, such provision shall be eliminated or limited to the
            minimum extent such that the remaining provisions of the Terms of
            Service will continue in full force and effect.
            <br /> <br />
            5. The Company may assign its rights and obligations under this
            Agreement, in whole or in part, to any person or entity at any time
            without notice to you and without your consent. Upon such
            assignment, the Company may be relieved of any further obligation
            hereunder. You may not assign or delegate any rights or obligations
            under these Terms of Service without the Company's prior written
            consent, and any unauthorized assignment and delegation by you is
            void and ineffective.
            <br /> <br />
            6. Relationship of Parties. You acknowledge and agree that no joint
            venture, partnership, or employment relationship exists between you
            and the Company as a result of these Terms of Service or your use of
            the Application. You agree not to hold yourself out as
            representative, agent, operator, distributor, or employee of the
            Company and the Company shall not be liable for any of your
            representations, acts, or omissions. You also acknowledge and agree
            that, except as otherwise expressly provided in these Terms of
            Service, there shall be no third-party beneficiaries.
          </ol>
        </p>
        <p className="fw-bolder">
          18. Potential Disruption of the Application/Website
        </p>
        <p>
          Access to this Application may from time to time be unavailable,
          delayed, limited or slowed due to, but not limited to, the following:
          <ol>
            1. Scheduled daily maintenance; <br />
            2. Emergency (unscheduled) maintenance;
            <br /> <br /> 3. Hardware failure, including but not limited to,
            failures of computers (including your own computer), servers,
            networks, connections, and other electronic and mechanical
            equipment;
            <br /> <br /> 4. Software failure, including but not limited to,
            bugs, errors, viruses, configuration problems, incompatibility of
            systems, utilities or applications, the operation of firewalls or
            screening programs, unreadable codes, or irregularities within
            particular documents or other content;
            <br /> <br />
            5. Overload of system capacities;
            <br /> <br /> 6. Unforeseen circumstances or causes outside its
            reasonable control, including, without limitation, extreme weather
            and other acts of God, natural catastrophes, pandemics, governmental
            actions, war, terrorism, riots, embargoes, acts of civil or military
            authorities, fire, floods, accidents, network infrastructure
            failures, computer viruses, strikes, or shortages of transportation
            facilities, transportation stoppages or slowdowns, and stoppage or
            slowdown of power supplies or other utility or service (including
            the Internet or other networks) (each, a "Force Majeure Event").{" "}
            <br /> <br />
            7. Other similar disruptions. Mylottohub may discontinue, suspend or
            Update the Application at any time without notice. Mylottohub shall
            not be liable for any failure to perform or disruption of the
            Application due to such discontinuance, suspension or Update.
            <br /> <br /> 8. Mylottohub has the right not to honour any winning
            claims that is suspected to be fraudulently attained via tampering
            its system through digital hack or other means of manipulation of
            its systems security already put in place.
            <br /> <br /> 9. For tickets suspected to be fraudulent, a period of
            7 days will be used to investigate such ticket. After which
            payment/winning request can either be accepted or declined. <br />
            10. All Tickets placed/played on Mylottohub after international
            games are closed by the operators due to time difference will be
            rendered invalid and will be voided.
            <br /> <br /> 11. Winnings from voided tickets due to bets placed
            after closing time will not be honoured by Mylottohub. <br /> <br />
            12. International games can be deemed closed by the operator at the
            operator’s will. <br /> <br />
            13. By agreeing to these Terms and Conditions the Customer accepts
            that they will be sent marketing communications from Mylottohub, its
            parent company Virtual Online Services Ltd or any of its
            subsidiaries. <br /> <br />
            14. Such marketing communications will be in the form of website pop
            ups, targeted email campaigns, SMS and outbound calls.
            <br /> <br />
            15. All confirmed winning tickets on Mylottohub will be paid within
            24 hrs.
          </ol>
        </p>
        <p className="fw-bolder">19. Responsible Play</p>
        <p>
          Mylottohub is committed to ensuring the lottery does not turn from a
          game of fun into a financial issue. Mylottohub warns that for some
          users, gambling of any kind can be a problem and therefore, we offer
          the following tools and resources to encourage healthy playing
          behaviour.
          <ol>
            1. Currently Mylottohub is contracted to provide this service for
            Premier (Baba Ijebu), Winners Golden Chance, Green Lotto, Lotto
            mania, SET lotto, Wesco lotto and many more. Mylottohub reserves the
            right to list and delist operators from its platform at its own
            discretion and in accordance with agreed terms with each Licensed
            operator.
            <br />
            <br /> 2. All confirmed winning tickets on Mylottohub will be paid
            within 24 hrs.
            <br />
            <br /> 3. Mylottohub has the right not to honour any winning claims
            that is suspected to be fraudulently attained via tampering its
            system through digital hack or other means of manipulation of its
            systems security already put in place.
            <br />
            <br /> 4. For tickets suspected to be fraudulent, a period of 7 days
            will be used to investigate such ticket. After which payment/winning
            request can either be accepted or declined.
            <br />
            <br /> 5. All Tickets placed/played on Mylottohub after
            international games are closed by the operators due to time
            difference will be rendered invalid and will be voided.
            <br />
            <br /> 6. Winnings from voided tickets due to bets placed after
            closing time will not be honoured by Mylottohub.
            <br />
            <br /> 7. International games can be deemed closed by the operator
            at the operator’s will.
            <br />
            <br /> 8. By agreeing to these Terms and Conditions the Customer
            accepts that they will be sent marketing communications from
            Mylottohub, its parent company Virtual Online Services Ltd or any of
            its subsidiaries.
            <br />
            <br /> 9. Such marketing communications will be in the form of
            website pop ups, targeted email campaigns, SMS and outbound calls.
          </ol>
        </p>
        <p className="fw-bolder">20. Entire Agreement</p>
        <p>
          20. Entire Agreement These Terms of Service, our Privacy Policy, the
          Prize Sharing Agreement, and any applicable Limited Power of Attorney
          constitute the sole and entire agreement between you and the Company
          with respect to the Application/website and supersede all prior and
          contemporaneous understandings, agreements, representations and
          warranties, both written and oral, with respect to the Application.
          Nothing in the Terms of Service, express or implied, shall be deemed
          to confer any rights or remedies upon, nor obligate any of the parties
          hereto, to any person or entity other than such parties, unless so
          stated to the contrary
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
