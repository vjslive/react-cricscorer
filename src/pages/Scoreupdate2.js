import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";


const Scoreupdate = () => {
  const [inputFields, setInputFields] = useState([
    {}
  ]);
  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "player") {
      values[index].player = event.target.value;
    } else {
      values[index].score = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ player: '', score: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      <h1>Dynamic Form Fields in React</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <label htmlFor="Player">Player</label>
                <input
				  onChange={event => handleInputChange(index, event)}
                  type="text"
                  className="form-control"
                  id="player"
                  name="player"
                  value={inputField.player}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="Score">Score</label>
                <input
                  type="text"
                  className="form-control"
                  id="score"
                  name="score"
                  value={inputField.score}
                />
              </div>
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
	  <br/>
	  <pre>
 {JSON.stringify(inputFields, null, 2)}
</pre>
    </>
  )
}

export default Scoreupdate;