import Home from './views/Home.jsx';
import Game from './views/Game.jsx';
import Error from './views/Error.jsx';

const routes = [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/:imageId/:playerId/:difficulty',
    element: <Game/>,
  },
  {
    path: '/*',
    element: <Error/>
  }
];

export default routes;