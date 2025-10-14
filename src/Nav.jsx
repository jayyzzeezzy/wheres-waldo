import game from "./gameData";

function Nav({ isWaldoFound, isWizardFound, isOdlawFound }) {
    return(
        <>
            <nav style={{ display:"flex", justifyContent:"center" }}>
                <div 
                    className="character-container"
                    style={{ display: "flex" }}
                >
                <div 
                className="waldo" 
                style={{ display: "flex", alignItems: "center", opacity: isWaldoFound ? "0.3" : "1", marginRight:"6px" }}
                >
                    <img 
                        src={game.characters.waldo.url} 
                        alt="waldo" 
                        style={{ maxHeight: "60px" }}
                    />
                    <p>Waldo</p>
                </div>
                <div 
                className="odlaw" 
                style={{ display: "flex", alignItems: "center", opacity: isOdlawFound ? "0.3" : "1" }}
                >
                    <img 
                        src={game.characters.odlaw.url} 
                        alt="odlaw" 
                        style={{ maxHeight: "60px" }}
                    />
                    <p>Odlaw</p>
                </div>
                <div 
                className="wizard" 
                style={{ display: "flex", alignItems: "center", opacity: isWizardFound ? "0.3" : "1"}}
                >
                    <img 
                        src={game.characters.wizard.url} 
                        alt="wizard" 
                        style={{ maxHeight: "60px" }}
                    />
                    <p>Wizard</p>
                </div>
                </div>
               
                
            </nav>
        </>
    );
}

export default Nav;