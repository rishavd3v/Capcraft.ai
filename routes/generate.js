const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function generateCaption(path,mimeType) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = "Generate 5 social media caption for this image. Include seo optimized hashtags and keywords. Format the output like this: Caption 1, Caption 2, Caption 3 ... seperate caption with '&' keyword";

  const imageParts = [
    fileToGenerativePart(path, mimeType),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = result.response;
  const text = response.text(); 
  console.log(text);
  return text;
}

module.exports = generateCaption;