import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";

function LeaderBoard() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [leaderBoard, setLeaderBoard] = useState(null);
    const [score, setScore] = useState(null);
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            setLoading(true);

            if (state) {
                setScore(state.score);
                setLeaderBoard(state.leaderBoard);
                setLoading(false);
            } else {
                try {
                    const response = await fetch(
                        `http://localhost:3000/leader`,
                        {
                            mode: "cors",
                            method: "GET",
                        },
                    );

                    if (response.status === 404) {
                        setError(response.statusCode, response.message);
                        throw new Error(response.statusCode, "Leaderboard not found");
                    }

                    const data = await response.json();
                    // console.log(data);
                    setLeaderBoard(data.leaderBoard);

                } catch (error) {
                    throw new Error(error.statusCode, error.message);
                } finally {
                    setLoading(false);
                }
            }

        }

        fetchLeaderBoard();
    }, [state]);

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

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div 
        style={{
            display:"flex",
            width:"100%",
            justifyContent:"center",
            boxSizing:"border-box"
        }}>
            <div className="container">
                {score && (
                    <div className="playerScore" style={{ textAlign:"center" }}>
                        <h2>Your score is</h2>
                        <h3 style={{ marginBottom:"10px" }}>{formatScore(score)}</h3>
                    </div>
                )}

                <div className="homeBtn" style={{ display:"flex", justifyContent:"center", marginTop: "10px" }}>
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