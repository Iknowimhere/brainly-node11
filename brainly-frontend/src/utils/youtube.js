export function convertToEmbedLink(youtubeUrl) {
    try {
        const url = new URL(youtubeUrl);
        let videoId = "";

        if (url.hostname === "youtu.be") {
            // Shortened URL (e.g., https://youtu.be/8rABwKRsec4)
            videoId = url.pathname.slice(1);
        } else if (url.hostname.includes("youtube.com")) {
            // Standard YouTube URL (e.g., https://www.youtube.com/watch?v=8rABwKRsec4)
            videoId = url.searchParams.get("v");
        }

        if (!videoId) {
            throw new Error("Invalid YouTube URL");
        }

        return `https://www.youtube.com/embed/${videoId}`;
    } catch (e) {
        return `Error: ${e.message}`;
    }
}