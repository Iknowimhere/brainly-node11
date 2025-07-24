import { convertToEmbedLink } from "../utils/youtube";

const Card = ({ type, link, title, id }) => {

  return (
    <div key={id} className="bg-white rounded shadow p-4 sm:p-6 flex flex-col w-full max-w-xs mx-auto">
      <span className="text-base sm:text-lg font-semibold mb-2 break-words">{title}</span>
      <div className="h-40 sm:h-64 w-full bg-amber-100 flex items-center justify-center overflow-hidden">
        {type === "video" && (
          <iframe
            width="560"
            height="315"
            src={convertToEmbedLink(link)}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="w-full h-auto"
          >
            {" "}
          </iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link}></a>
          </blockquote>
        )}
      </div>
      <a href={link} className="text-blue-500 hover:underline">
        Click on this
      </a>
    </div>
  );
};
export default Card;
