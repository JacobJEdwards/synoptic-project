export const withErrorHandling = (fn: Function) => {
    return async (...args: any[]) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.log(error);
            return {
                response: {
                    message: "Internal Server Error",
                },
            };
        }
    };
};
