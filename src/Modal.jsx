import { useState } from "react";
import { useNavigate } from "react-router";

function Modal({ onCancel, onClose, children }) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username);

        try {
            const response = await fetch(
                    `http://localhost:3000/leader`, 
                {
                    mode: "cors",
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ username }),
                },
            );            
            const data = await response.json();
            const score = data.score;
            const leaderBoard = data.leaderBoard;
            navigate("/leaderboard", { state: { score, leaderBoard  } });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="modalContainer"
        onClick={(e) => {
            if (e.target.className==="modalContainer") {
                onClose();
            }
        }}
        style={{ 
            position:"fixed", 
            left:"0", 
            top:"0", 
            width:"100%", 
            height:"100%", 
            display:"flex", 
            justifyContent:"center", 
            alignItems:"center", 
            backgroundColor:"rgba(0, 0, 0, 0.5)" 
        }}>
            <form method="POST" 
            onSubmit={handleSubmit}
            style={{
                backgroundColor:"white",
                borderRadius:"5px",
                padding:"1.4rem"
            }}>
                <div className="modalHeader"
                style={{
                    display:"flex",
                    justifyContent:"flex-end",
                    fontSize:"1.6rem",
                }}>
                    <p className="close" 
                    style={{ cursor:"pointer"}} 
                    onClick={() => onClose()}
                    >
                        &times;
                    </p>
                </div>
                <div className="modalInput"
                style={{
                    marginBottom:"1.5rem",
                }}>
                    {children}
                    <label htmlFor="username">Please enter a name: </label>
                    <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="modalBtn"
                style={{
                    display:"flex",
                    justifyContent:"space-evenly",
                }}>
                    <input type="submit" value="Submit"/>
                    <button type="button" onClick={() => onCancel()}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Modal;