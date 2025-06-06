export const fetchAiSummary = async( species) =>{
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    const {
        scientificName,
        commonName,
        kingdom,
        family,
        statusName,
        occurrenceCount,
} = species;

const prompt = `Imagine you're a student and I am your teacher, I am given you on an assignment 'Write a short 10–20 sentence educational summary for high school students about this species:
- Scientific Name: ${scientificName}
- Common Name: ${commonName}
- Kingdom: ${kingdom}
- Family: ${family}
- Status: ${statusName}
- Occurrence Count: ${occurrenceCount}'

provide answer like you will in a normal setting. Also don't add any title, just go straight to your answer.
`;

try {
  // Completion (POST /completions)
  const res = await fetch("https://openrouter.ai/api/v1/completions", {
    method: "POST",
    headers: {
      Authorization:
        `BEARER ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-maverick:free",
      prompt: `${prompt}`,
    }),
  });


  const data = await res.json();
  const replyText = data?.choices?.[0]?.text
  return replyText;
} catch(err) {
        console.error('AI Sumarry error', err);
        return null;
    }
};