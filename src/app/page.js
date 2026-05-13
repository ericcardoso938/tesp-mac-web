'use client';

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tesp-mac-web-tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("tesp-mac-web-tasks", JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    const addTask = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setInputValue("");
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    if (!isLoaded) return null;

    return (
        <div className={styles.container}>
            <main className={styles.appWindow}>
                <header>
                    <h1 className={styles.title}>tesp-mac-web</h1>
                    <p className={styles.subtitle}>O teu espaço pessoal de produtividade</p>

                    {/* DADOS DO ALUNO PARA AVALIAÇÃO - Email corrigido! */}
                    <div style={{ textAlign: 'center', marginBottom: '25px', color: '#374151', fontSize: '14px', backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <p style={{ margin: '0 0 4px 0' }}><strong>Nome:</strong> Eric Cardoso</p>
                        <p style={{ margin: '0' }}><strong>Email:</strong> aluno28518@ipt.pt</p>
                    </div>
                </header>

                <form onSubmit={addTask} className={styles.inputGroup}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="O que precisas de fazer hoje?"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className={styles.addButton}>
                        Adicionar
                    </button>
                </form>

                {tasks.length > 0 && (
                    <div className={styles.filters}>
                        <button
                            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilter('all')}
                        >Todas</button>
                        <button
                            className={`${styles.filterBtn} ${filter === 'active' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilter('active')}
                        >Ativas</button>
                        <button
                            className={`${styles.filterBtn} ${filter === 'completed' ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilter('completed')}
                        >Concluídas</button>
                    </div>
                )}

                <ul className={styles.taskList}>
                    {filteredTasks.length === 0 ? (
                        <p className={styles.emptyState}>Nenhuma tarefa por aqui.</p>
                    ) : (
                        filteredTasks.map(task => (
                            <li key={task.id} className={styles.taskItem}>
                                <div className={styles.taskContent}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <span className={`${styles.taskText} ${task.completed ? styles.taskTextCompleted : ''}`}>
                                        {task.text}
                                    </span>
                                </div>
                                <button className={styles.deleteBtn} onClick={() => deleteTask(task.id)}>
                                    Apagar
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </main>
        </div>
    );
}