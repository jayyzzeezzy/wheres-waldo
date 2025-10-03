import { RiCrosshair2Line } from "react-icons/ri";
import picture from "./assets/wheres-waldo.jpeg";
import { useState } from "react";
import gameData from "./gameData";

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

        const rect = e.currentTarget.getBoundingClientRect();
        console.log("userDimensionX: ", rect.width, "userDimensionY: ", rect.height);

        setCoords({
            x: pageX,
            y: pageY
        });

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const coordsX = coords.x - gameData.extraMargins.marginX;
        const coordsY = coords.y - gameData.extraMargins.marginY;
        console.log("submitX: ", coordsX, "sumbitY: ", coordsY);

        setIsCrosshairActive(false);

        // write the fetch function below
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
                <form 
                    className="targetSelection"
                    onMouseLeave={handleMouseLeave}
                    method="POST"
                    onSubmit={handleSubmit}
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
                </form>
                
            }
            
        </>
    )
}

export default Game;
