import React, { useState, useEffect } from "react";
import styles from "./Login.module.css"; // Importing CSS module
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

// List of shape types
const shapeTypes = [
  "circle",
  "circle",
  "circle",
  "triangle",
  "square",
  "line",
  "line",
  "curve",
  "polygon",
];

// Generate random shapes
const generateShapes = () => {
  const shapes = [];
  const numShapes = Math.floor(Math.random() * 11) + 10; // Random number of shapes

  for (let i = 0; i < numShapes; i++) {
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const size = Math.random() * 100 + 50; // Random size
    const rotation = Math.random() * 360; // Random rotation angle

    // Ensure shape is within the viewport
    const xOffset = Math.random() * 100; // Random x position
    const yOffset = Math.random() * 100; // Random y position

    // Random animation
    let floatAnimation = "";
    if (Math.random() < 0.5) {
      floatAnimation =
        Math.random() < 0.5
          ? styles.floatTopCounterclockwise
          : styles.floatBottomCounterclockwise;
    } else {
      floatAnimation =
        Math.random() < 0.5
          ? styles.floatLeftCounterclockwise
          : styles.floatRightCounterclockwise;
    }

    // Random color
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.7)`;

    const style = {
      top: `${yOffset}vh`,
      left: `${xOffset}vw`,
      width: shapeType === "line" ? "3px" : `${size}px`,
      height: shapeType === "line" ? "100px" : `${size}px`,
      backgroundColor: shapeType !== "line" ? color : undefined,
      borderBottomColor: shapeType === "triangle" ? color : undefined,
      transform: `rotate(${rotation}deg)`, // Ensure shape has random rotation
      animation: `${floatAnimation} ${
        Math.random() * 60 + 30
      }s ease-in-out infinite`,
    };

    shapes.push(
      <div
        key={i}
        className={`${styles.shape} ${styles[shapeType]} ${
          Math.random() > 0.5
            ? styles.rotateClockwise
            : styles.rotateCounterclockwise
        }`}
        style={style}
      ></div>
    );
  }
  return shapes;
};

const Login: React.FC = () => {
  const { login, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shapes, setShapes] = useState<JSX.Element[]>(generateShapes());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShapes(generateShapes());
    }, 60000); // Regenerate shapes every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  const { t } = useTranslation();
  return (
    <div className={styles.loginContainer}>
      {shapes} {/* Render shapes */}
      <form onSubmit={handleSubmit} className={`card p-4 ${styles.loginForm}`}>
        <h2 className="text-center mb-4">{t("login.Title")}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            {t("login.Username")}
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            {t("login.Password")}
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {t("login.Login")}
        </button>
      </form>
    </div>
  );
};

export default Login;
