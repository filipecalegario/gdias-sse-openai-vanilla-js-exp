

async function generate() {
  const prompt = document.getElementById("myTextarea").value;

  const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
  const DEPLOY_API_URL = "https://lang-chain-js-express-js-boilerplate.vercel.app/poem"
  const API_KEY = document.getElementById("apiKeyInput").value;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        stream: true
      }),
    });

    // const response = await fetch(DEPLOY_API_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     Topic: prompt,
    //   }),
    // });

    // const response = await fetch("https://gdias-chat-stream-egghead.vercel.app/api/chat-stream", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt: prompt,
    //   }),
    // });

    console.log("response %o", response);

    // Read the response as a stream of data
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    generatedContent.innerText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      // Massage and parse the chunk of data
      const chunk = decoder.decode(value);
      console.log(chunk);
      generatedContent.innerText += chunk;
      // const lines = chunk.split("\\n");
      // const parsedLines = lines
      //   .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
      //   .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
      //   .map((line) => JSON.parse(line)); // Parse the JSON string

      // for (const parsedLine of parsedLines) {
      //   const { choices } = parsedLine;
      //   const { delta } = choices[0];
      //   const { content } = delta;
      //   // Update the UI with the new content
      //   if (content) {
      //     generatedContent.innerText += content;
      //   }
      // }
    }
  } catch (e) {
    console.error(e);
  }

  //document.getElementById("generatedContent").innerHTML = text;
}
