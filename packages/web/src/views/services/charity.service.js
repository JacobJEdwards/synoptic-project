export async function getCharities() {
  try {
    const response = await fetch("http://localhost:3000/charities");
    const charities = await response.json();
    return charities;
  } catch (error) {
    console.error(error);
    return [];
  }
}
