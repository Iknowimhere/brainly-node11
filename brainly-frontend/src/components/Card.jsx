import { convertToEmbedLink } from "../utils/youtube";

const Card = ({ type, link, title, id }) => {
  console.log(link);

  return (
    <div key={id} className="bg-white rounded shadow p-6 flex flex-col">
      <span className="text-lg font-semibold mb-2">{title}</span>
      <div className="h-64 w-64 bg-amber-100">
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
          <blockquote class="twitter-tweet">
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
