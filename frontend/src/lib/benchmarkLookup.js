import benchmark from "../data/benchmark.json";

/**
 * Get benchmark info for a given category and score.
 * @param {string} area - The category/domain name (should match keys in benchmark.json)
 * @param {number} score - The user's score for that category
 * @returns {{label: string, meaning: string, action: string} | null}
 */
export function getBenchmarkInfo(area, score) {
    const entry = benchmark.find((b) => b.Area === area);
    if (!entry) return null;
    for (const range of entry.ranges) {
        const minOk = range.min == null || score >= range.min;
        const maxOk = range.max == null || score < range.max;
        if (minOk && maxOk) {
            return {
                label: range.label,
                meaning: range.meaning,
                action: range.action,
            };
        }
    }
    return null;
}
