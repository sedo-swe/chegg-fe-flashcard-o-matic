import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api/index";

import CardForm from "./CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const initialDeckState = {
        id: "",
        name: "",
        description: "",
    };
    const initialCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
    };

    const [card, setCard] = useState(initialDeckState);
    const [deck, setDeck] = useState(initialCardState);

    // Setting deck and card info to be edited
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => console.log("Something went wrong with readDeck", error));

        readCard(cardId, abortController.signal)
        .then(setCard)
        .catch((error) => console.log("Something went wrong with readCard", error));

        return () => abortController.abort();
    }, [deckId, cardId]);

    // Update new info of card
    function handleCardChange({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    // Submit updated card info
    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        updateCard({ ...card }, abortController.signal)
        .then(() => history.push(`/decks/${deckId}`));
    }

    // Cancel editing and back to the deck
    async function handleCancel() {
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
                <li className="breadcrumb-item active">Edit Card {cardId}</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <CardForm card={card} handleCardChange={handleCardChange} />
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => handleCancel()}>
                    Cancel
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditCard;