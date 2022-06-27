/**
 * Creates an array of chunk objects representing both higlightable and non
 * highlightable pieces of text that match each search word.
 *
 * @return Array of "chunk" objects
 */
declare function findAll({ autoEscape, caseSensitive, findChunks, sanitize, searchWords, textToHighlight, }: {
    autoEscape?: boolean;
    caseSensitive?: boolean;
    findChunks?: typeof defaultFindChunks;
    sanitize?: typeof defaultSanitize;
    searchWords: string[];
    textToHighlight?: string | null;
}): Chunk[];
/**
 * Takes an array of "chunk" objects and combines chunks that overlap into
 * single chunks.
 *
 * @return Array of "chunk" objects
 */
declare function combineChunks({ chunks }: {
    chunks: Chunk[];
}): Chunk[];
/**
 * Examine text for any matches. If we find matches, add them to the returned
 * array as a "chunk" object.
 *
 * @return Array of "chunk" objects
 */
declare function defaultFindChunks({ autoEscape, caseSensitive, sanitize, searchWords, textToHighlight, }: {
    autoEscape?: boolean;
    caseSensitive?: boolean;
    sanitize?: typeof defaultSanitize;
    searchWords: string[];
    textToHighlight?: string | null;
}): Chunk[];
/**
 * Given a set of chunks to highlight, create an additional set of chunks
 * to represent the bits of text between the highlighted text.
 *
 * @return Array of "chunk" objects
 */
declare function fillInChunks({ chunksToHighlight, totalLength, }: {
    chunksToHighlight: Chunk[];
    totalLength: number;
}): Chunk[];
declare function defaultSanitize(string: string): string;
export declare const HighlightWords: {
    combineChunks: typeof combineChunks;
    fillInChunks: typeof fillInChunks;
    findAll: typeof findAll;
    findChunks: typeof defaultFindChunks;
};
export interface Chunk {
    highlight: boolean;
    start: number;
    end: number;
}
export {};
