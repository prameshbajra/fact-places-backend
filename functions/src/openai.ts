import OpenAI from "openai";
import { inspect } from "util";
import { TPlace } from "./model";
import { defineString } from "firebase-functions/params";

const OPENAIAPIKEY = defineString("OPENAIAPIKEY");
const openai = new OpenAI({
    apiKey: OPENAIAPIKEY.value(),
});
const placesOfInterest = async (location: TPlace) => {
    try {
        const displayName = location.display_name;
        console.log("Display name : ", displayName);
        const functions = [
            {
                "name": "get_places_of_interest",
                "description": "Get the list of places that are of significance to the location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "place": {
                            "type": "string",
                            "description": "The place of interest",
                        },
                        "description": {
                            "type": "string",
                            "description": "A detailed description of the location's historical significatice and fun facts.",
                        },
                    },
                    "required": ["place", "description"],
                },
            },
        ];
        const completion = await openai.chat.completions.create({
            messages: [{
                "role": "user",
                "content": `
                I am in this location: ${displayName}. 
                I want you to give me a place near this location which has very high historical significance and also has some fun facts.
                ` }],
            functions: functions,
            function_call: "auto",
            model: "gpt-3.5-turbo",
        });
        console.log("INSPECT");
        console.log(inspect(completion, { depth: null, colors: true }));
    } catch (error) {
        console.error("Error", error);
    }
    return location;
};

export { placesOfInterest };
