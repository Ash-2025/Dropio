import { space } from "postcss/lib/list"


export default function DocViewer({ url, styles, extension }) {
    const render = () => {
        switch (extension) {
            case 'pdf':
            case 'txt':
            case 'json':
                return (
                    <iframe
                        src={url}
                        className="w-full h-full bg-purple-300"
                    >
                    </iframe>
                )
            case 'png':
            case 'jpeg':
            case 'jpg':
                return (
                    <img src={url} alt="" className="w-full h-full" />
                )
            case 'mp4':
            case 'webm':
            case 'ogg':
                return (
                    <video src={url} controls className="w-full flex-grow p-14">
                    </video>
                )
            case 'mp3':
            case 'wav':
            case 'ogg': // audio formats
                return (
                    <audio src={url} controls className="w-full">
                        Your browser does not support the audio tag.
                    </audio>
                );
            default:
                return (
                    <span className="mt-5 h-auto">
                        
                        😕
                        <br />
                        Docx, Doc, xlsx, ppt are not supported
                    </span>
                )
        }
    }
    return (
        <>
            <div className={styles}>
                {render()}
            </div>
        </>
    )
}