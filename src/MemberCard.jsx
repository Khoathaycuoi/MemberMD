import "./App.css";

export default function MemberCard({
  id,
  name,
  position,
  status,
  points,
  onAwardPoints,
}) {
  const isActive = status === "Active";

  return (
    <div
      className={`member-card ${isActive ? "card-active" : "card-inactive"}`}
    >
      <div className="card-header">
        <h3>{name}</h3>
        <span
          className={`badge ${isActive ? "badge-active" : "badge-inactive"}`}
        >
          {status}
        </span>
      </div>

      <p className="position">{position}</p>

      <div className="points-box">
        <span className="points-number">{points}</span> điểm
      </div>

      <button className="award-btn" onClick={() => onAwardPoints(id)}>
        Tặng 5 điểm thưởng
      </button>
    </div>
  );
}
