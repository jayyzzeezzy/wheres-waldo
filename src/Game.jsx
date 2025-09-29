import { RiCrosshair2Line } from "react-icons/ri";
import picture from "./assets/wheres-waldo.jpeg";
import { useState } from "react";

function Game() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isCrosshairActive, setIsCrosshairActive] = useState(false);

    const handleMouseLeave = () => {
        setIsCrosshairActive(false);
    }

    const handleClick = (e) => {
        setIsCrosshairActive(true);

        const { pageX, pageY } = e;
        console.log("X: ", pageX, "Y: ", pageY);

        setCoords({
            x: pageX,
            y: pageY
        });

    }



    return (
        <>
            <h1>Can you find Waldo?</h1>
            <div style={{ position: "relative" }}>
                <img 
                    src={picture} 
                    alt="where's waldo map" 
                    style={{ width: "100%", boxSizing: "border-box" }}
                    onClick={handleClick}
                />
            </div>

            {isCrosshairActive && 
                <div 
                    className="targetSelection"
                    onMouseLeave={handleMouseLeave}
                >
                    <RiCrosshair2Line 
                        size="40px"
                        style={{ 
                            left: coords.x, 
                            top: coords.y, 
                            position: "absolute",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                    <ul 
                        style={{
                            position: "absolute",
                            left: coords.x,
                            top: coords.y,
                            transform: "translate(0, 15px)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <button>Waldo</button>
                        <button>Odlaw</button>
                        <button>Wizard</button>
                    </ul>
                </div>
                
            }
            
        </>
    )
}

export default Game;
