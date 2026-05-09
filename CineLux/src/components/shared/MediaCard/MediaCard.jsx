import { FaStar } from "react-icons/fa";

export default function MediaCard({
  tagText,
  imageSrc,
  imageAlt,
  title,
  rating,
  meta,
  onClick,
}) {
  return (
    <article className="media-card" onClick={onClick}>
      {tagText ? <span className={`media-card-tag `}>{tagText}</span> : null}

      <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />

      <div className="media-card-overlay media-card-overlay-inner">
        <h3 className="media-card-title">{title}</h3>
        <div className="media-card-meta media-card-meta-inner">
          {rating !== undefined && rating !== null ? (
            <span className="media-card-rating media-card-rating-badge">
              <FaStar className="rating-star" />
              {rating}
            </span>
          ) : null}
          {meta ? (
            <span className="media-card-meta-text media-card-meta-info">
              {meta}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
