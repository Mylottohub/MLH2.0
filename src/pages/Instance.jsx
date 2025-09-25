// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import Slider from "../components/Slider";
// import { useGetInstantGame } from "../react-query";

// const Instance = () => {
//   const { userInstantGame, isLoadingInstantGame } = useGetInstantGame();

//   return (
//     <div>
//       <Navbar />
//       <Slider />
//       <div className="container mt-5">
//         <span className="hidden-xs hidden-sm">
//           <h4>
//             <strong>Casino Games</strong>
//           </h4>
//         </span>
//         <br />
//         <div className="row">
//           {isLoadingInstantGame ? (
//             <div className="text-center">Loading games...</div>
//           ) : userInstantGame?.length > 0 ? (
//             userInstantGame.map((game) => (
//               <div className="col-6 col-lg-3 mb-4" key={game.id}>
//                 <div
//                   style={{
//                     cursor: "pointer",
//                     backgroundColor: "#FFF",
//                     borderRadius: "5px",
//                   }}
//                   onClick={() => window.open(game.link, "_blank")}
//                 >
//                   <img
//                     src={game?.pix}
//                     alt={game?.name}
//                     className="img-fluid"
//                     style={{
//                       borderTopRightRadius: "5px",
//                       borderTopLeftRadius: "5px",
//                     }}
//                   />
//                   <div style={{ padding: "10px", lineHeight: "28px" }}>
//                     <p align="center">
//                       <a className="btn btn-blue btn-sm btn-block w-100">
//                         Play Now
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center">No instant games found.</div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Instance;

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import "../assets/css/coming-soon.css"; 

const Instance = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <div className="container mt-5 text-center">
        <h4 className="mb-4">
          <strong>Casino Games</strong>
        </h4>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "50px 20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <div className="dice-roll">🎲</div>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              color: "#ff9800",
              marginBottom: "10px",
              marginTop: "15px",
            }}
          >
            Coming Soon
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#555" }}>
            Get ready for an exciting selection of casino games!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Instance;

