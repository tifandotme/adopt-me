import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "../Carousel";
import fetchPet from "../fetchPet";
import Modal from "../Modal";
import AdoptedPetContext from "../AdoptedPetContext";

function Details() {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext); // it passes the whole state, so its read and write
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">↺</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {pet.name}?</h1>
                  <div className="buttons">
                    <button onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}>Yes</button>
                    <button onClick={() => setShowModal(false)}>No, I am a monster</button>
                  </div>
                </div>
              </Modal>
            ) : null
          }
        </h2>
      </div>
    </div>
  );
}

export default Details;
