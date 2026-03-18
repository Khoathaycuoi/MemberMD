import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import "./App.css";

export default function App() {
  const [members, setMembers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Project Manager",
    "QA Tester",
    "DevOps Engineer",
  ];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu từ máy chủ");
        }

        const data = await response.json();

        const transformedData = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          position: positions[index % positions.length],
          status: Math.random() > 0.5 ? "Active" : "Inactive",
          points: Math.floor(Math.random() * 100) + 50,
        }));

        setMembers(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const activeCount = members.filter((m) => m.status === "Active").length;
  const inactiveCount = members.filter((m) => m.status === "Inactive").length;
  const totalPoints = members.reduce((sum, m) => sum + m.points, 0);

  const handleAwardPoints = (id) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, points: member.points + 5 } : member,
      ),
    );
  };

  const getFilteredMembers = () => {
    if (filterStatus === "All") return members;
    return members.filter((m) => m.status === filterStatus);
  };

  const filteredMembers = getFilteredMembers();

  if (isLoading) {
    return (
      <div
        className="dashboard-container"
        style={{ textAlign: "center", padding: "50px" }}
      >
        <h2>Đang tải dữ liệu từ API...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="dashboard-container"
        style={{ textAlign: "center", color: "red", padding: "50px" }}
      >
        <h2>Đã xảy ra lỗi: {error}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <strong>Đang hiển thị:</strong> {filteredMembers.length} /{" "}
        {members.length} thành viên
      </div>

      <div className="stat-boxes">
        <div className="stat-box box-active">
          <h4>Đang hoạt động</h4>
          <p>{activeCount}</p>
        </div>
        <div className="stat-box box-inactive">
          <h4>Không hoạt động</h4>
          <p>{inactiveCount}</p>
        </div>
        <div className="stat-box box-total">
          <h4>Tổng điểm</h4>
          <p>{totalPoints}</p>
        </div>
      </div>

      <div className="filter-controls">
        <button
          className={filterStatus === "All" ? "active-filter" : ""}
          onClick={() => setFilterStatus("All")}
        >
          Tất cả
        </button>
        <button
          className={filterStatus === "Active" ? "active-filter" : ""}
          onClick={() => setFilterStatus("Active")}
        >
          Đang hoạt động
        </button>
        <button
          className={filterStatus === "Inactive" ? "active-filter" : ""}
          onClick={() => setFilterStatus("Inactive")}
        >
          Không hoạt động
        </button>
      </div>

      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}
      >
        Danh sách thành viên:
      </h2>

      <div className="members-grid">
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            id={member.id}
            name={member.name}
            position={member.position}
            status={member.status}
            points={member.points}
            onAwardPoints={handleAwardPoints}
          />
        ))}
      </div>
    </div>
  );
}
