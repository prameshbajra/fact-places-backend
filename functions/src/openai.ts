import { z } from "zod";
import { TPlace } from "./model";
// import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
// import { PromptTemplate } from "langchain/prompts";


const placesOfInterest = async (location: TPlace) => {
    try {
        const parser = StructuredOutputParser.fromZodSchema(
            z.object({
                summary: z.string().describe("summary of the typescript"),
                tags: z
                    .array(z.string())
                    .describe(
                        "list of entities in the transcript, entities include at"
                    ),
            })
        );
        console.log("Parser", parser);
        // const formatInstructions = parser.getFormatInstructions();
        // const prompt = new PromptTemplate({
        //     template:
        //     `
        //     I am currently at this location - {location}.
        //     And I want you to give me at least 10 places around me that has a high historical significance
        //     with it's detailed description  \n {formatInstructions}
        //     `,
        //     inputVariables: ["location"],
        //     partialVariables: { formatInstructions: "" },
        // });
        // const displayName = location.display_name;
        // console.log("Display name : ", displayName);
        // console.log("Prompt: ", prompt);
        // const model = new OpenAI({ temperature: 0 });
        // const input = await prompt.format({
        //     location: displayName,
        // });
        // console.log("Input: ", input);
        // const response = await model.call(input);
        // console.log("Response: ", response);
    } catch (error) {
        console.error("Error", error);
    }
    return location;
};

export { placesOfInterest };
