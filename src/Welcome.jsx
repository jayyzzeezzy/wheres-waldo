import game from "./gameData.js";
import { Link } from "react-router";

function Welcome() {
    return (
        <div className="backdrop"
        style={{
            display:"flex", 
            width:"100vw", 
            height:"100vh", 
            justifyContent:"center", 
            alignItems:"center", 
        }}
        >
        <div className="container">
            <div className="heading" style={{ marginBottom:"10px" }}>
                <h1>WHERE IS WALDO?</h1>
            </div>

            <div className="instruction">
                <h2>Instruction: </h2>
                <p>Find these characters as fast as you can.</p>
            </div>

            <div className="characters" 
            style={{ 
                display:"flex",
                justifyContent:"space-evenly",
                marginBottom:"20px",
            }}>
                <div className="waldo">
                    <img 
                        src={game.characters.waldo.url} 
                        alt="waldo" 
                        style={{ maxHeight: "80px" }}
                    />
                    <p>Waldo</p>
                </div>
                <div className="odlaw">
                    <img 
                        src={game.characters.odlaw.url} 
                        alt="odlaw" 
                        style={{ maxHeight: "80px" }}
                    />
                    <p>Odlaw</p>
                </div>
                <div className="wizard">
                    <img 
                        src={game.characters.wizard.url} 
                        alt="wizard" 
                        style={{ maxHeight: "80px" }}
                    />
                    <p>Wizard</p>
                </div>
            </div>

            <div className="startGame" 
            style={{
                display:"flex",
                justifyContent:"center",
            }}
            >
                <Link to="/game" 
                style={{ 
                    textDecoration:"none",
                    padding:"4px 10px",
                    color:"#fff",
                    backgroundColor:"#d9534f",
                    borderRadius:"5px",
                    fontSize:"1.5rem",
                    fontWeight:"bold",
                }}>
                    Play
                </Link>
            </div>

        </div>
        </div>
    )
}

export default Welcome;