//import useState and useEffect hooks from React
import { useState, useEffect } from "react";

//create an empty object to track cached results
const localCache = {};

//export the useBreedList hook, takes the animal as a parameter
export default function useBreedList(animal) {
  //declare breedList state and setBreedList function
  const [breedList, setBreedList] = useState([]);
  //declare status state and setStatus function
  const [status, setStatus] = useState("unloaded");

  //on mount and when animal prop changes
  useEffect(() => {
    //if no animal is passed
    if (!animal) {
      //set breed list to empty
      setBreedList([]);
      //if the animal is in the cache
    } else if (localCache[animal]) {
      //set the breed list from the cache
      setBreedList(localCache[animal]);
    } else {
      //otherwise fetch the data
      requestBreedList();
    }

    //async request for the breed list
    async function requestBreedList() {
      //set the breed list to empty
      setBreedList([]);
      //set the status to loading
      setStatus("loading");
      //fetch the breed list data
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      //convert the response to json
      const json = await res.json();
      //store the result in the local cache
      localCache[animal] = json.breeds || [];
      //update the breed list from the cache
      setBreedList(localCache[animal]);
      //set the status to loaded
      setStatus("loaded");
    }
  }, [animal]);

  //return the breedList and status
  return [breedList, status];
}
