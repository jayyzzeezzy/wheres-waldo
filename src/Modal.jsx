import { useState } from "react";

function Modal({ onCancel, onClose, children }) {
    const [username, setUsername] = useState("");

    // Incomplete. Write a fetch request.
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username);
        onClose();
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