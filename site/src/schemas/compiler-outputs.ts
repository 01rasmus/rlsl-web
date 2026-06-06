import * as z from "zod";

export type Errors = z.infer<typeof errors_schema>;
export const errors_schema = z.object({
    errors: z.array(
        z.object({
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
        })
    )
});