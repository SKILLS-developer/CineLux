import { useState } from "react";
import { FiFilm, FiEdit2, FiTrash2, FiPlus, FiStar, FiX } from "react-icons/fi";
import "./AllContent.css";
import API from "../../../api.js";

const EMPTY_FORM = {
  title: "",
  genre: "",
  runtimeMinutes: "",
  mediaType: "movie",
  averageRating: "",
  totalViews: "",
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
            title: item.title ?? "",
            genre: item.genre ?? "",
            runtimeMinutes: item.runtimeMinutes ?? "",
            mediaType: item.mediaType ?? "movie",
            averageRating: item.averageRating ?? "",
            totalViews: item.totalViews ?? "",
            isFree: item.isFree ?? true,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = {
      ...formData,
      averageRating: parseFloat(formData.averageRating) || 0,
      totalViews: parseInt(formData.totalViews) || 0,
      runtimeMinutes: parseInt(formData.runtimeMinutes) || null,
    };
    if (editItem) {
      try {
        await API.put(`/media/update/${editItem.mediaId}`, parsed);
        setMediaList((prev) =>
          prev.map((m) =>
            m.mediaId === editItem.mediaId ? { ...m, ...parsed } : m,
          ),
        );
      } catch (error) {
        console.error("Error updating media:", error);
        alert("Failed to update content. Please try again.");
      }
    } else {
      try {
        const response = await API.post("/media/add", parsed);
        setMediaList((prev) => [response.data, ...prev]);
      } catch (error) {
        console.error("Error adding media:", error);
        alert("Failed to add content. Please try again.");
      }
    }
    closeModal();
  };

  const handleDelete = async (mediaId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await API.delete(`/media/delete/${mediaId}`);
      setMediaList((prev) => prev.filter((m) => m.mediaId !== mediaId));
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

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
                <tr key={item.mediaId}>
                  <td>
                    <div className="adm-thumb">
                      {item.posterUrl ? (
                        <img src={item.posterUrl} alt={item.title} />
                      ) : (
                        <div className="adm-thumb__placeholder">
                          <FiFilm />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="adm-table__title">{item.title}</td>
                  <td className="adm-table__meta">{item.genre}</td>
                  <td>
                    <span className={`adm-badge adm-badge--${item.mediaType}`}>
                      {item.mediaType}
                    </span>
                  </td>
                  <td>
                    <span className="adm-table__rating">
                      <FiStar /> {item.averageRating}
                    </span>
                  </td>
                  <td>{formatViews(item.totalViews)}</td>
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
                        onClick={() => handleDelete(item.mediaId)}
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
                  <label htmlFor="adm-genre">Genre</label>
                  <input
                    id="adm-genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleFormChange}
                    placeholder="e.g. Action • Thriller"
                    required
                  />
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-runtimeMinutes">Runtime (minutes)</label>
                  <input
                    id="adm-runtimeMinutes"
                    name="runtimeMinutes"
                    type="number"
                    min="0"
                    value={formData.runtimeMinutes}
                    onChange={handleFormChange}
                    placeholder="e.g. 148"
                  />
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-mediaType">Type</label>
                  <select
                    id="adm-mediaType"
                    name="mediaType"
                    value={formData.mediaType}
                    onChange={handleFormChange}
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-averageRating">Rating (0–10)</label>
                  <input
                    id="adm-averageRating"
                    name="averageRating"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.averageRating}
                    onChange={handleFormChange}
                    placeholder="8.5"
                    required
                  />
                </div>
                <div className="adm-form-field">
                  <label htmlFor="adm-totalViews">Views</label>
                  <input
                    id="adm-totalViews"
                    name="totalViews"
                    type="number"
                    min="0"
                    value={formData.totalViews}
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
