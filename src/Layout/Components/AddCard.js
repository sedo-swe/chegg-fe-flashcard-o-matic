import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";

import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    const history = useHistory();
    const initialState = {
        front: "",
        back: "",
    };

    const [newCard, setNewCard] = useState(initialState);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => console.error("Something went wrong", error));

        return () => abortController.abort();
    }, [deckId]);

    function handleCardChange({ target }) {
        setNewCard({
            ...newCard,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            { ...newCard },
            abortController.signal
        );
        history.go(0);
        setNewCard(initialState);
        return response;
    }

    async function handleDone() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h2>{deck.name}: Add Card</h2>
                <CardForm card={newCard} handleCardChange={handleCardChange} />
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => handleDone()}>
                    Done
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default AddCard;