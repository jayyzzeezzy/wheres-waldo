import { useLocation } from "react-router";

function LeaderBoard() {
    const location = useLocation();
    const { state } = location;
    const score = state.score;
    const leaderBoard = state.leaderBoard;
    console.log(leaderBoard);

    // format end time
    const addZero = (x, n) => {
        while (x.toString().length < n) {
            x = "0" + x;
            return x;
        }
        return x;
    };

    const formatScore = (obj) => {
        let m = new Date(obj.timeTaken).getMinutes();
        m = addZero(m, 2);
        let s = new Date(obj.timeTaken).getSeconds();
        s = addZero(s, 2);
        let ms = new Date(obj.timeTaken).getMilliseconds();
        ms = addZero(ms, 3);
        return `${m}:${s}:${ms}`;
    };

    return (
        <div 
        style={{
            display:"flex",
            width:"100%",
            justifyContent:"center",
            boxSizing:"border-box"
        }}>
            <div className="container">
                <div className="playerScore">
                    <h2>Your score is</h2>
                    <h3>{formatScore(score)}</h3>
                </div>
                <div className="leaderboard">
                    <h1>Leader Board</h1>
                    <div>
                        <h4>Username</h4>
                        <h4>Score</h4>
                    </div>
                    {leaderBoard && leaderBoard.length > 0 && (
                        leaderBoard.map((score) => {
                            return (
                                <div key={score.id} className="scoreLeader">
                                    <p>{score.username}</p>
                                    <p>{formatScore(score)}</p>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard;