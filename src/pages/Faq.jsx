import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import faq from "../constant/data/faq";

const Faq = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="container mt-5">
          <span className="faq-area mb-5">
            <h4>
              <strong>Frequently Asked Questions</strong>
            </h4>
            <small className="mb-5">
              These are questions that has been frequently asked by MyLottoHub
              users and answers from the Admin.
            </small>
            <br />
            <br />
          </span>
          {faq.map((data) => {
            return (
              <div key={data.id} >
                <div className="accordion border-0 mb-5 mt-4" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button p-4"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${data.collapse}`}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        style={{background: '#4067770D'}}
                      >
                        {data.name}
                      </button>
                    </h2>
                    <div
                      id={data.collapse}
                      className={`accordion-collapse collapse ${data.id === 1 ? 'show' : ''}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body border-0">
                       {data.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
