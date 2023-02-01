async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];

  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!apiRes.ok) {
    throw new Error("Failed to fetch search");
  }

  return apiRes.json();
}

export default fetchSearch;
