import Dashboard from "./components/Dashboard";
import "./globals.css";

function App() {
  return (
    <div className="bg-background">
      {/* Header Section */}
      <header className="flex justify-between bg-secondary">
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
      <h1 className="w-auto m-auto p-8 text-center text-2xl">Your widgets</h1>
      {/* Widget Layout Section */}
      <Dashboard />

      {/* Main Overview Section */}
    </div>
  );
}

export default App;
