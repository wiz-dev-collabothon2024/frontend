import Widget from "./components/Widget";
import "./globals.css";

function App() {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="flex justify-between bg-teal-600 mb-4">
        <div className="logo">COMMERZBANK</div>
        <nav>
          <ul className=" ">
            <li>Privatkunden</li>
            <li>Unternehmenskunden</li>
            <li>Firmenkunden</li>
          </ul>
        </nav>
        <div className="top-right">
          <span>Kontakt</span>
          <span>photoTAN</span>
        </div>
      </header>
      <h1 className="w-auto m-auto text-center text-2xl">Your widgets</h1>
      {/* Widget Layout Section */}
      <div className="grid grid-cols-5 grid-flow-row gap-1 p-4 w-1/2 m-auto">
        <Widget className=" p-4" title="Widget" content="Some content">
          Item 1
        </Widget>
        <Widget className=" p-4" title="Widget" content="Some content">
          Item 2
        </Widget>
        <Widget className=" p-4" title="Widget" content="Some content">
          Item 3
        </Widget>
        <Widget className=" p-4" title="Widget" content="Some content">
          Item 4
        </Widget>
        <Widget className=" p-4" title="Widget" content="Some content">
          Item 5
        </Widget>
        <Widget className=" p-4" title="Widget" content="Some content">
          Item 6
        </Widget>
      </div>

      {/* Main Overview Section */}
    </div>
  );
}

export default App;
