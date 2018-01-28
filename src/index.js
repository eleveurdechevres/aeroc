import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// React Router :
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
//
// BrowserRouter : browser history
// HashRouter : hash history
// MemoryRouter : memory history

// <Route path='/about' component={About} />
// <Route path='/contact' component={Contact} />

// ReactDOM.render(
//     <BrowserRouter>
//         <div>
//             <Route path='/' component={App} />
//         </div>
//     </BrowserRouter>,
//     document.getElementById('app-container')
//   );