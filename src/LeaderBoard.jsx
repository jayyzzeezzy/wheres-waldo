import { useLocation, Link } from "react-router";

function LeaderBoard() {
    const location = useLocation();
    const { state } = location;
    const score = state.score;
    const leaderBoard = state.leaderBoard;
    // console.log(leaderBoard);

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
                <div className="playerScore" style={{ textAlign:"center", marginBottom:"20px" }}>
                    <h2>Your score is</h2>
                    <h3 style={{ marginBottom:"10px" }}>{formatScore(score)}</h3>
                    <Link to="/"
                    style={{ 
                    textDecoration:"none",
                    padding:"4px 10px",
                    color:"#fff",
                    backgroundColor:"#1d4ed8",
                    borderRadius:"5px",
                    fontSize:"1rem",
                    fontWeight:"bold",
                    }}>
                        Home
                    </Link>
                </div>
                <div className="leaderboard">
                    <h1>Leader Board</h1>
                    <div style={{ display:"flex", justifyContent:"space-evenly" }}>
                        <h4>Username</h4>
                        <h4>Score</h4>
                    </div>
                    {leaderBoard && leaderBoard.length > 0 && (
                        leaderBoard.map((score, index) => {
                            return (
                                <div key={score.id} className="scoreLeader" style={{ display: "flex", justifyContent:"space-between" }}>
                                    <p>{index + 1}</p>
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