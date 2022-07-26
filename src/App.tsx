import './css/App.css';
import Box from "./Box";
import Draggable from "./Draggable";

function App() {
  return (
    <div className="App">
      <Draggable>
        <Box />
      </Draggable>
    </div>
  );
}

export default App;
