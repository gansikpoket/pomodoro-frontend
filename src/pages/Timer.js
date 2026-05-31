import { useState, useEffect } from 'react';

function Timer() {
    const [timeLeft, setTimeLeft] = useState(
        parseInt(localStorage.getItem('timeLeft')) || 1500
    );
    const [isRunning, setIsRunning] = useState(
        localStorage.getItem('isRunning') === 'true'
    );
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [newSubject, setNewSubject] = useState("");

    useEffect(() => {
        fetch("https://pomodoro-backend-production-5266.up.railway.app/subjects")
            .then(res => res.json())
            .then(data => setSubjects(data));
    }, []);

    useEffect(() => {
        localStorage.setItem('timeLeft', timeLeft);
        localStorage.setItem('isRunning', isRunning);
    }, [timeLeft, isRunning]);

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsRunning(false);
                    saveSession();
                    alert("🎉집중 세션 완료!!!멋쪄 멋쪄 우와아아아아아앙아아아 뿌이뿌이뿌이ㅠㅠ🎉");
                    return 300;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    const addSubject = () => {
        fetch("https://pomodoro-backend-production-5266.up.railway.app/subjects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newSubject })
        })
            .then(res => res.json())
            .then(data => {
                setSubjects([...subjects, data]);
                setNewSubject("");
            });
    };

    const saveSession = () => {
        if (!selectedSubject) return;
        fetch("https://pomodoro-backend-production-5266.up.railway.app/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subject_id: selectedSubject,
                duration: 25
            })
        });
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div>
            <span className={`tomato-spinner ${isRunning ? "spinning" : ""}`}>🍅</span>
            <div className="page-container">
                <div className="timer-box">
                    <h1 className="timer-display">
                        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </h1>
                    <div className="timer-buttons">
                        <button className="btn-main" onClick={() => setIsRunning(!isRunning)}>
                            {isRunning ? "일시정지" : "시작"}
                        </button>
                        <button className="btn-sub" onClick={() => { setIsRunning(false); setTimeLeft(1500); }}>
                            리셋
                        </button>
                    </div>
                </div>
                <div className="subject-box">
                    <select className="subject-select" onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">과목 선택</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                    <div className="subject-add">
                        <input
                            className="subject-input"
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            placeholder="새 과목 입력"
                        />
                        <button className="btn-add" onClick={addSubject}>추가</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer;