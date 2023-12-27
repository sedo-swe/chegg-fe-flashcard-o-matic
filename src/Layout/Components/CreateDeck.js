import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const initialState = {
        name: "",
        description: "",
    };
    const [newDeck, setNewDeck] = useState(initialState);

    // Function updating the change of both deck name and deck description
    function handleChange({ target }) {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value,
        });
    }

    // Function submitting new deck to create
    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck(
            { ...newDeck },
            abortController.signal
        );
        history.push("/");
        return response;
    }

    // When cancel button is clicked, cancel creating deck and move to home screen
    async function handleCancel() {
        history.push("/");
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck</li>
            </ol>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Create Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Deck Name"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.name} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Brief description of the deck"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.description} />
                </div>
                <button className="btn btn-secondary mx-1" onClick={() => handleCancel()}>
                    Cancel
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateDeck;