import { sanityFetch } from "@/sanity/lib/fetch";
import { videosQuery } from "@/sanity/lib/queries";

interface Video {
    _id: string;
    title: string | null;
    youtubeUrl: string | null;
}

function getYouTubeVideoId(url: string): string | null {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (!match || !match[7] || match[7].length !== 11) {
        return null;
    }
    return match[7];
}

export default async function VideosPage() {
    const videos = await sanityFetch({ query: videosQuery });

    return (
        <section className="container mx-auto p-5">
            <div className="mb-12 border-b border-neutral-800 pb-8">
                <h1 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight mb-4 uppercase">
                    VIDEOS
                </h1>
                <p className="text-lg text-neutral-400 max-w-2xl">
                    OUR VIDEO GALLERY
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
                {videos.length > 0 ? (
                    videos.map((video: Video) => {
                        const videoId = video.youtubeUrl ? getYouTubeVideoId(video.youtubeUrl) : null;

                        return (
                            <article
                                key={video._id}
                                className="group flex flex-col bg-black hover:bg-neutral-900 transition-colors duration-200"
                            >
                                {videoId ? (
                                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={video.title || "YouTube video"}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full bg-neutral-900 flex items-center justify-center" style={{ paddingTop: "56.25%" }}>
                                        <span className="absolute inset-0 flex items-center justify-center text-neutral-500 font-mono text-sm">
                                            Invalid video URL
                                        </span>
                                    </div>
                                )}

                                {video.title && (
                                    <div className="p-4 border-t border-neutral-900">
                                        <h2 className="text-sm font-mono text-neutral-300 uppercase tracking-wide">
                                            {video.title}
                                        </h2>
                                    </div>
                                )}
                            </article>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-20 text-neutral-500 font-mono bg-black">
                        <p>No videos found</p>
                    </div>
                )}
            </div>
        </section>
    );
}
