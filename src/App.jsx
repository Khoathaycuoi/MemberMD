import React, { useState } from "react";
import MemberCard from "./MemberCard";
import "./App.css";

const initialMembers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Frontend Developer",
    status: "Active",
    points: 100,
  },
  {
    id: 2,
    name: "Trần Thị B",
    position: "Backend Developer",
    status: "Active",
    points: 85,
  },
  {
    id: 3,
    name: "Lê Văn C",
    position: "UI/UX Designer",
    status: "Active",
    points: 120,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    position: "Project Manager",
    status: "Inactive",
    points: 60,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    position: "QA Tester",
    status: "Active",
    points: 95,
  },
  {
    id: 6,
    name: "Vũ Thị F",
    position: "DevOps Engineer",
    status: "Inactive",
    points: 50,
  },
];

export default function App() {
  const [members, setMembers] = useState(initialMembers);
  const [filterStatus, setFilterStatus] = useState("All");

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

  return (
    <div className="dashboard-container">
      <h1>Quản Lý Thành Viên</h1>

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
          <h4>Tổng điểm tích lũy</h4>
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
