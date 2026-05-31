import { useState, useEffect } from 'react';

function Historypage() {
    const [filter, setFilter] = useState("all");
    const [sessions, setSessions] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fetch("https://pomodoro-backend-production-5266.up.railway.app/sessions")
            .then(res => res.json())
            .then(data => setSessions(data));
        fetch("https://pomodoro-backend-production-5266.up.railway.app/subjects")
            .then(res => res.json())
            .then(data => setSubjects(data));
    }, []);

    const deleteSession = (id) => {
        fetch(`https://pomodoro-backend-production-5266.up.railway.app/sessions/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => {
                setSessions(sessions.filter(s => s.id !== id));
            });
    };

    const filteredSessions = filter === "all"
        ? sessions
        : sessions.filter(s => s.subject_id == filter);

    return (
        <div className="page-container">
            <h1 className="page-title">History</h1>
            <select className="subject-select" onChange={(e) => setFilter(e.target.value)}>
                <option value="all">전체</option>
                {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
            </select>
            <div className="session-list">
                {filteredSessions.map(session => (
                    <div key={session.id} className="session-card">
                        <p className="session-subject">🥢 {session.subject_name}</p>
                        <p className="session-duration">⏱ {session.duration}분</p>
                        <p className="session-date">📅 {session.created_at}</p>
                        <button className="btn-delete" onClick={() => deleteSession(session.id)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Historypage;