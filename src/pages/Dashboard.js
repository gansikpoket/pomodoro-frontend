import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch("https://pomodoro-backend-production-5266.up.railway.app/stats")
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    if (!stats) return <div className="loading">🍜 불 지피는 중...</div>;

    const weekdayData = Object.entries(stats.by_weekday).map(([day, minutes]) => ({
        day, minutes
    }));

    return (
        <div className="page-container">
            <h1 className="page-title">Dashboard</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <p className="stat-label">🔥 연속 기록</p>
                    <p className="stat-value">{stats.streak}일</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">⏰ 전체 집중 시간</p>
                    <p className="stat-value">{stats.total_hours}시간</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">📅 이번 주 세션</p>
                    <p className="stat-value">{stats.sessions_this_week}개</p>
                </div>
            </div>
            <h2 className="chart-title">🥘 과목별 집중 시간</h2>
            <BarChart width={400} height={300} data={stats.by_subject}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#c0392b" />
            </BarChart>
            <h2 className="chart-title">🗓 주간 패턴</h2>
            <BarChart width={400} height={300} data={weekdayData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#e67e22" />
            </BarChart>
        </div>
    )
}

export default Dashboard;