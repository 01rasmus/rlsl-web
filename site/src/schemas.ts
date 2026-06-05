import * as z from "zod";

export type Error = z.infer<typeof error_schema>;
export const error_schema = z.object({
    code: z.number(),
    message: z.string(),
    severity_code: z.number(),
    severity_string: z.string(),
    file: z.string(),
    range: z.object({
        start: z.object({
            line: z.number(),
            column: z.number(),
            offset: z.number(),
        }),
        end: z.object({
            line: z.number(),
            column: z.number(),
            offset: z.number(),
        }),
    }),
});