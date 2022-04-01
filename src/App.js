import './App.css';
import React,{Suspense,lazy} from 'react';
const ImgData = React.lazy(()=>import("./Components/Data/index"))

function App() {
  return (
    <div className="App">
    {/* Implement Lazy Loading */}
    <Suspense fallback={
    <div>Loading...</div>
    }>
    <ImgData/>
    </Suspense>
    </div>
  );
}

export default App;
