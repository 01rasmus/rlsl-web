export function jsonParseOrDefault(json: string, def: unknown = {}): unknown {
    try {
        return JSON.parse(json);
    } catch {
        return def;
    }
}