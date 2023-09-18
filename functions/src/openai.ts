import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { z } from "zod";
import { TPlace } from "./model";

const parser = StructuredOutputParser.fromZodSchema(
  z.array(
    z.object({
      id: z.number().describe("Id of the place"),
      title: z.string().describe("Name of the place"),
      facts: z.array(
        z.string().describe("At least 3 sentences that elaborates the fact about the place")).describe(
          "An array of very interesting facts about the place like historical significance, who made it etc"
        ),
    })
  )
);
const formatInstructions = `
Your output must follow the following example: \n
[ 
    { 
        "id": some random id that is a number,
        "title": place of interest,
        "facts": [fact and it's details about the place, another fact and it's details, interesting event and it's details]
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
                \n I am in at this place right now. {location}. I want you to give me the at least 7 specific places around this area which has very high historical significance and has a rich history behind it with lots of fun facts.`,
      inputVariables: ["location"],
      partialVariables: { format_instructions: formatInstructions },
    });
    const model = new OpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo-16k",
    });
    const chain = new LLMChain({ llm: model, prompt: prompt });
    const response = await chain.run(displayName);
    console.log("Response aayo: ", response);
    const parsedResponse = await parser.parse(response);
    return parsedResponse;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export { placesOfInterest };
