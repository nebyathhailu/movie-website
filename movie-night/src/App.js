import { Fragment } from 'react';
import './App.css';
import { MoviePage } from './MoviePage';
import { WatchlistProvider } from './context/WatchlistContext';

function App() {
 return(
    <WatchlistProvider>
        <MoviePage/>
    </WatchlistProvider>

)
  
}

export default App;

// ReactDOM.createRoot(document.getAnimations.getElementById("root")).render(
//     <WatchlistProvider>
//         <App/>
//     </WatchlistProvider>
//   )
// 
