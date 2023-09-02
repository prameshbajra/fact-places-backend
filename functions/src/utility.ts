import axios, { AxiosError } from "axios";
import { TError, TPlace } from "./model";

const getLocationData = async (lat: number, lon: number): Promise<TPlace | TError> => {
    // explicitly checks for undefined because 0 is a valid coordinate ...
    if (lat === undefined || lon === undefined) {
        return {
            statusCode: 400,
            message: "Latitude and Longitude are required parameters.",
        };
    }
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`);
        return response.data;
    } catch (error) {
        if (typeof error === "object" && error !== null && "response" in error) {
            const axiosError = error as AxiosError;
            return handleError(axiosError);
        }
        return {
            message: "An unexpected error occurred.",
            statusCode: 0,
        };
    }
};

const handleError = (axiosError: AxiosError) => {
    if (axiosError.response) {
        switch (axiosError.response.status) {
            case 400:
                return {
                    message: "Invalid request parameters. Please check the coordinates.",
                    statusCode: 400,
                };
            case 429:
                return {
                    message: "Rate limit exceeded. Please wait and try again later.",
                    statusCode: 429,
                };
            case 500:
            default:
                return {
                    message: "Server error. Please try again later.",
                    statusCode: axiosError.response.status,
                };
        }
    } else if (axiosError.request) {
        return {
            message: "No response from the server. Please check your network connection or try again later.",
            statusCode: 0,
        };
    } else {
        return {
            message: axiosError.message || "An unknown error occurred.",
            statusCode: 0,
        };
    }
};

export { getLocationData };
