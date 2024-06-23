export function asset(path) {
    if (import.meta.env.VITE_ASSET_URL) {
        return import.meta.env.VITE_ASSET_URL + path;
    }
    return path;
}
