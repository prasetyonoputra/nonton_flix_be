import { Prisma } from "@prisma/client";

interface NormalizedError {
    statusCode: number;
    message: string;
    error?: any;
}

export const normalizeError = (err: any): NormalizedError => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return {
                    statusCode: 409,
                    message: "Duplicate data",
                    error: {
                        fields: err.meta?.target,
                    },
                };

            case "P2025":
                return {
                    statusCode: 404,
                    message: "Data not found",
                };

            case "P2003":
                return {
                    statusCode: 400,
                    message: "Invalid reference data",
                    error: {
                        field: err.meta?.field_name,
                    },
                };

            default:
                return {
                    statusCode: 400,
                    message: "Database error",
                    error: {
                        code: err.code,
                    },
                };
        }
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return {
            statusCode: 400,
            message: "Invalid request data",
            error: err.message,
        };
    }

    if (err?.statusCode && err?.message) {
        return {
            statusCode: err.statusCode,
            message: err.message,
            error: err.error,
        };
    }

    return {
        statusCode: 500,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : undefined,
    };
};
