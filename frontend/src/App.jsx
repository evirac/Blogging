import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ButtonComponent from "./components/ButtonComponent";
import CardComponent from "./components/CardComponent";
import "./sass/App.scss";
import { cardData } from "./data";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="main">
        <div className="title-section">
          <h1 className="title">Blogs</h1>
          <div className="button-group">
            <ButtonComponent>Add New</ButtonComponent>
            <ButtonComponent inverted>Preview</ButtonComponent>
          </div>
        </div>

        <div className="card-container">
          {cardData.map((card, index) => (
            <CardComponent key={index} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
