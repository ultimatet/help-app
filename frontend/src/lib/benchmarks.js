import benchmarks from "../data/benchmark.json";

// Returns the benchmark info for a given area and score
export function getBenchmarkInfo(area, score) {
    const entry = benchmarks.find((b) => b.Area === area);
    if (!entry) return null;
    return entry.ranges.find(
        (r) => (r.min === null || score > r.min) && (r.max === null || score <= r.max)
    );
}

export default benchmarks;
