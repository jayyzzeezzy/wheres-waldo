import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Welcome from "./Welcome.jsx";
import Game from "./Game.jsx";
import LeaderBoard from "./LeaderBoard.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Welcome /> },
            { path: "game", element: <Game /> },
            { path: "leaderboard", element: <LeaderBoard /> },
        ],
    },
];

export default routes;
