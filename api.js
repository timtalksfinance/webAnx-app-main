const url = "https://webanx.onrender.com";

async function generateContentByGPT(prompt, currentModel) {
  try {
    const response = await fetch(url, {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        currentModel,
      }),
    });
    const responseJson = await response.json();
    const data = responseJson.message;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { generateContentByGPT };
