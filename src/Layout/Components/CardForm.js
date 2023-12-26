import React from "react";

// Common form component shared by Add Card and Edit Card
function CardForm({ card, handleCardChange }) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          placeholder="Front side of card"
          rows="3"
          onChange={handleCardChange}
          value={card.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          placeholder="Back side of card"
          rows="3"
          onChange={handleCardChange}
          value={card.back}
        />
      </div>
    </div>
  );
}

export default CardForm;