import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "../Results";
import useBreedList from "../useBreedList";
import fetchSearch from "../fetchSearch";
import AdoptedPetContext from "../AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  // eslint-disable-next-line no-unused-vars
  const [adoptedPet, _] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  // useEffect(() => {
  //   requestPets();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();

  //   setPets(json.pets);
  // }

  return (
    <div className="search-params">
      {/* {results.isLoading ? "Loading..." : "Adopt Me!"} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
            
          }
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            <p>{adoptedPet.name}</p>
          </div>
        ) : null
        }

        <label htmlFor="location">
          Location
          <input
            name="location"
            id="location"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
