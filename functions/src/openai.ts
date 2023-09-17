import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { z } from "zod";
import { TPlace } from "./model";

const parser = StructuredOutputParser.fromZodSchema(
  z.array(
    z.object({
      place: z.string().describe("Name of the place"),
      description: z
        .string()
        .describe(
          "A paragraph with at least 10 sentences that describes multiple fun facts about the place like the historical significance, who made it etc"
        ),
    })
  )
);
const formatInstructions = `
Your output must follow the following example: \n
[ 
    { 
        "place": place of interest,
        "description": A paragraph with at least 10 sentences that describes multiple fun facts about the place like the historical significance, who made it etc
    },
    ...
]
`;

const placesOfInterest = async (location: TPlace) => {
  try {
    const displayName = location.display_name;
    const prompt = new PromptTemplate({
      template: `Answer the users question as best as possible. \n
                {format_instructions}
                \n I am in at this place right now. {location}. I want you to give me the at least 5 specific places around this area which has very high historical significance and has a rich history behind it.`,
      inputVariables: ["location"],
      partialVariables: { format_instructions: formatInstructions },
    });
    const model = new OpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo-16k",
    });
    const chain = new LLMChain({ llm: model, prompt: prompt });
    const response = await chain.run(displayName);
    const parsedResponse = await parser.parse(response);
    return parsedResponse;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export { placesOfInterest };
