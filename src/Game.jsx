import { RiCrosshair2Line } from "react-icons/ri";
import picture from "./assets/wheres-waldo.jpeg";
import { useState } from "react";
import gameData from "./gameData";
import Nav from "./Nav";

function Game() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [userDimension, setUserDimension] = useState({ width: 0, height: 0 });
    const [isCrosshairActive, setIsCrosshairActive] = useState(false);
    const [isWaldoFound, setIsWaldoFound] = useState(false);
    const [isOdlawFound, setIsOdlawFound] = useState(false);
    const [isWizardFound, setIsWizardFound] = useState(false);
    const [validateFor, setValidateFor] = useState(null);
    const [error, setError] = useState(null);
    const [verifying, setVerifying] = useState(false);

    const handleMouseLeave = () => {
        setIsCrosshairActive(false);
    }

    const handleClick = (e) => {
        setIsCrosshairActive(true);

        const { pageX, pageY } = e;
        console.log("X: ", pageX, "Y: ", pageY);

        const rect = e.currentTarget.getBoundingClientRect();
        console.log("userDimensionX: ", rect.width, "userDimensionY: ", rect.height);

        setUserDimension({
            width: rect.width,
            height: rect.height
        })
        console.log("userClientX: ", userDimension.width, "userClientY: ", userDimension.height);

        setCoords({
            x: pageX,
            y: pageY
        });

    }


    const handleSubmit = async (e, validateFor) => {
        e.preventDefault();
        console.log("validateFor: ", validateFor);
        const coordsX = coords.x - gameData.extraMargins.marginX;
        const coordsY = coords.y - gameData.extraMargins.marginY;
        console.log("submitX: ", coordsX, "sumbitY: ", coordsY);

        setIsCrosshairActive(false);
        setVerifying(true);

        try {
            const response = await fetch(
                    `http://localhost:3000/game/${validateFor}`, 
                {
                    mode: "cors",
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({
                        coordsX,
                        coordsY,
                        userClientX: userDimension.width,
                        userClientY: userDimension.height,
                        naturalDimensionX: gameData.naturalDimension.width,
                        naturalDimensionY: gameData.naturalDimension.height,
                    }),
                },
            );
            const data = await response.json();
            console.log(data);
            if (data.message === "Correct") {
                if (validateFor === "waldo") {
                    setIsWaldoFound(true);
                } else if (validateFor === "odlaw") {
                    setIsOdlawFound(true);
                } else if (validateFor === "wizard")
                    setIsWizardFound(true);
            }
        } catch (error) {
            console.log(error);
            setError(error, error.message);
        } finally {
            setVerifying(false);
        }

    }

    if (error) return <p>{error}</p>;

    return (
        <>
            {verifying && <p>Verifying...</p>}

            <Nav isWizardFound={isWizardFound} isWaldoFound={isWaldoFound} isOdlawFound={isOdlawFound} />
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
                    onSubmit={(e) => handleSubmit(e, validateFor)}
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
                        {!isWaldoFound && <input type="submit" value="Waldo" onClick={() => setValidateFor("waldo")}/>}
                        {!isOdlawFound && <input type="submit" value="Odlaw" onClick={() => setValidateFor("odlaw")}/>}
                        {!isWizardFound && <input type="submit" value="Wizard" onClick={() => setValidateFor("wizard")}/>}
                    </ul>
                </form>
                
            }
            
        </>
    )
}

export default Game;
