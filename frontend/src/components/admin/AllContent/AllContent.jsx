import { useState } from "react";
import { FiFilm, FiEdit2, FiTrash2, FiPlus, FiStar, FiX } from "react-icons/fi";
import "./AllContent.css";

const EMPTY_FORM = {
  title: "",
  meta: "",
  duration: "",
  type: "movie",
  rating: "",
  views: "",
  isFree: true,
};

const formatViews = (v) => {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
  return v?.toString() ?? "0";
};

export default function AllContent({ mediaList, setMediaList }) {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const openModal = (item = null) => {
    setEditItem(item);
    setFormData(
      item
        ? {
            title: item.title,
            meta: item.meta,
            duration: item.duration,
            type: item.type,
            rating: item.rating,
            views: item.views,
            isFree: item.isFree,
          }
        : EMPTY_FORM,
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const handleFormChange = ({ target: { name, value, type, checked } }) =>
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = {
      ...formData,
      rating: parseFloat(formData.rating) || 0,
      views: parseInt(formData.views) || 0,
    };
    if (editItem) {
      setMediaList((prev) =>
        prev.map((m) => (m.id === editItem.id ? { ...m, ...parsed } : m)),
      );
    } else {
      setMediaList((prev) => [
        {
          ...parsed,
          id: `custom-${Date.now()}`,
          thumbnail: null,
          videoUrl: null,
          trailer: null,
          createdAt: new Date().toISOString().split("T")[0],
          releaseDate: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) =>
    setMediaList((prev) => prev.filter((m) => m.id !== id));

  return (
    <>
      <div className="adm-table-section">
        <div className="adm-table-section__header">
          <h2>All Content</h2>
          <button
            className="adm-btn adm-btn--primary"
            onClick={() => openModal()}
          >
            <FiPlus /> Add Content
          </button>
        </div>
        <div className="adm-table-wrapper">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Thumb</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Type</th>
                <th>Rating</th>
                <th>Views</th>
                <th>Access</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="adm-thumb">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} />
                      ) : (
                        <div className="adm-thumb__placeholder">
                          <FiFilm />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="adm-table__title">{item.title}</td>
                  <td className="adm-table__meta">{item.meta}</td>
                  <td>
                    <span className={`adm-badge adm-badge--${item.type}`}>
                      {item.type}
                    </span>
                  </td>
                  <td>
                    <span className="adm-table__rating">
                      <FiStar /> {item.rating}
                    </span>
                  </td>
                  <td>{formatViews(item.views)}</td>
                  <td>
                    <span
                      className={`adm-badge adm-badge--${item.isFree ? "free" : "premium"}`}
                    >
                      {item.isFree ? "Free" : "Premium"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button
                        className="adm-icon-btn adm-icon-btn--edit"
                        onClick={() => openModal(item)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="adm-icon-btn adm-icon-btn--delete"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="adm-modal-overlay" onClick={closeModal}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal__header">
              <h3>{editItem ? "Edit Content" : "Add New Content"}</h3>
              <button className="adm-modal__close" onClick={closeModal}>
                <FiX />
              </button>
            </div>
            <form className="adm-modal__form" onSubmit={handleSubmit}>
              <div className="adm-modal__grid">
                <div className="adm-form-field">
                  <label htmlFor="adm-title">Title</label>
                  <input
                    id="adm-title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="e.g. Inception"
                    required
                  />
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-meta">Genre</label>
                  <input
                    id="adm-meta"
                    name="meta"
                    value={formData.meta}
                    onChange={handleFormChange}
                    placeholder="e.g. Action • Thriller"
                    required
                  />
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-duration">Duration</label>
                  <input
                    id="adm-duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleFormChange}
                    placeholder="e.g. 2h 28m"
                    required
                  />
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-type">Type</label>
                  <select
                    id="adm-type"
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-rating">Rating (0–5)</label>
                  <input
                    id="adm-rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleFormChange}
                    placeholder="4.8"
                    required
                  />
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-views">Views</label>
                  <input
                    id="adm-views"
                    name="views"
                    type="number"
                    min="0"
                    value={formData.views}
                    onChange={handleFormChange}
                    placeholder="1000"
                  />
                </div>
              </div>

              <div className="adm-form-toggle">
                <label className="adm-toggle">
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleFormChange}
                  />
                  <span className="adm-toggle__slider" />
                  <span className="adm-toggle__label">
                    {formData.isFree ? "Free Access" : "Premium Only"}
                  </span>
                </label>
              </div>

              <div className="adm-modal__footer">
                <button
                  type="button"
                  className="adm-btn adm-btn--ghost"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn adm-btn--primary">
                  {editItem ? "Save Changes" : "Add Content"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
