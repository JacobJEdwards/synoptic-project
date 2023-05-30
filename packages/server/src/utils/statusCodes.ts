// Purpose: Contains the status codes used in the application.
const StatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
} as const;

// Type for the status codes - makes the object enum-like.
export type TStatusCodes = typeof StatusCodes[keyof typeof StatusCodes];

export default StatusCodes;
