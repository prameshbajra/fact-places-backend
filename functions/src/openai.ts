import { z } from "zod";
import { TPlace } from "./model";
import { StructuredOutputParser } from "langchain/output_parsers";


const placesOfInterest = async (location: TPlace) => {
    try {
        const displayName = location.display_name;
        console.log("Display name : ", displayName);
        const parser = StructuredOutputParser.fromZodSchema(
            z.array(
                z.object({
                    placeName: z.string(),
                    description: z.string(),
                })
            )
        );
        const formatInstructions = parser.getFormatInstructions();
        console.log("Format Instructions: ", formatInstructions);
    } catch (error) {
        console.error("Error", error);
    }
    return location;
};

export { placesOfInterest };
