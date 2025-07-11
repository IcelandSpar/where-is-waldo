import Home from './views/Home.jsx';
import Game from './views/Game.jsx';

const routes = [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/where-is-waldo/:difficulty',
    element: <Game/>,
  }
];

export default routes;