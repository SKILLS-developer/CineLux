import { FaStar } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MediaCard({
  className = "",
  tagClassName = "media-card-type",
  overlayClassName = "media-card-overlay-inner",
  metaClassName = "media-card-meta-inner",
  ratingClassName = "media-card-rating-badge",
  metaTextClassName = "media-card-meta-info",
  tagText,
  imageSrc,
  imageAlt,
  title,
  rating,
  meta,
  onClick,
}) {
  return (
    <article className={classNames("media-card", className)} onClick={onClick}>
      {tagText ? (
        <span className={classNames("media-card-tag", tagClassName)}>
          {tagText}
        </span>
      ) : null}

      <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />

      <div className={classNames("media-card-overlay", overlayClassName)}>
        <h3 className="media-card-title">{title}</h3>
        <div className={classNames("media-card-meta", metaClassName)}>
          {rating !== undefined && rating !== null ? (
            <span className={classNames("media-card-rating", ratingClassName)}>
              <FaStar className="rating-star" />
              {rating}
            </span>
          ) : null}
          {meta ? (
            <span
              className={classNames("media-card-meta-text", metaTextClassName)}
            >
              {meta}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
