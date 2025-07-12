import Groq from "groq-sdk";

export const randomNameGenerator = async () => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates random names for gadgets. Assign a unique, randomly generated codename (e.g.,The Nightingale, The Kraken) and other superficial and fictional names. Generate just one name per request. And do not include any explanation or additional text. Just return the name.",
        },
      ],
    });

    const content = response.choices[0].message.content;
    return content?.trim();
  } catch (error) {
    console.error("Error generating random name:", error);
    return null;
  }
};
