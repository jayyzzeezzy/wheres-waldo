import { RiCrosshair2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import gameData from "./gameData";
import Nav from "./Nav";
import Modal from "./Modal";
import { createPortal } from "react-dom";

const picture = gameData.url;

function Game() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [userDimension, setUserDimension] = useState({ width: 0, height: 0 });
    const [isCrosshairActive, setIsCrosshairActive] = useState(false);
    const [isWaldoFound, setIsWaldoFound] = useState(false);
    const [isOdlawFound, setIsOdlawFound] = useState(false);
    const [isWizardFound, setIsWizardFound] = useState(false);
    const [validateFor, setValidateFor] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [gameOver, setGameOver] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [score, setScore] = useState(0);

    const onCancel = () => {
        setIsModalOpen(false);
    }

    const onClose = () => {
        setIsModalOpen(false);
    }

    const handleMouseLeave = () => {
        setIsCrosshairActive(false);
    }

    useEffect(() => {
        const startGame = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/game`,
                    {
                        mode: "cors",
                        method: "GET",
                    },
                );
                const data = await response.json();
                console.log(data);

                if (response.status >= 400) {
                    setError(response.status);
                    throw new Error(response.status, "Server error");
                }
            } catch (error) {
                setError(error, error.message);
            }
        }

        startGame();
    }, []);

    useEffect(() => {
        if (isWaldoFound && isOdlawFound && isWizardFound) {
            setGameOver(true);
            const fetchEndTime = async () => {
                try {
                    const response = await fetch(
                            `http://localhost:3000/gameover`, 
                        {
                            mode: "cors",
                            method: "GET",
                        },
                    );
                    const data = await response.json();
                    console.log("timeTaken: ", data.timeTaken);

                    // format end time
                    const m = new Date(data.timeTaken).getMinutes();
                    const s = new Date(data.timeTaken).getSeconds();
                    const ms = new Date(data.timeTaken).getMilliseconds();
                    setScore(`${m}:${s}:${ms}`);
                    setIsModalOpen(true);
                } catch (error) {
                    console.log(error);
                    setError(error, error.message);
                }
            }

            fetchEndTime();
        }
    }, [isOdlawFound, isWaldoFound, isWizardFound]);

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

            // do this if user guess correctly
            if (data.message === "Correct") {
                alert("That's correct!")
                if (validateFor === "waldo") {
                    setIsWaldoFound(true);
                } else if (validateFor === "odlaw") {
                    setIsOdlawFound(true);
                } else if (validateFor === "wizard")
                    setIsWizardFound(true);
            } else {
                alert("Incorrect. Take another guess :)")
            }

        } catch (error) {
            console.log(error);
            setError(error, error.message);
        }
    }

    if (error) return <p>{error}</p>;

    return (
        <>
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
            
            {isModalOpen && (
                createPortal(
                    <Modal onCancel={onCancel} onClose={onClose}>
                        <h3>You finished in {score} seconds</h3>
                    </Modal>, 
                    document.body
                )
            )}
            
        </>
    )
}

export default Game;
