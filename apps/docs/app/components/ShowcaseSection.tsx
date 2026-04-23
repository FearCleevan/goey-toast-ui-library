"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ShowcaseSection.module.css";

/* ── Mini toast ────────────────────────────────────────────────────────────── */
type ToastType = "success" | "error" | "warning" | "info";
interface MiniToast {
  id: number;
  type: ToastType;
  title: string;
  desc?: string;
}

function useMiniToast() {
  const [toasts, setToasts] = useState<MiniToast[]>([]);
  const counter = useRef(0);
  const fire = (type: ToastType, title: string, desc?: string) => {
    const id = ++counter.current;
    setToasts((p) => [...p, { id, type, title, desc }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3200);
  };
  return { toasts, fire };
}

const BADGE_CYCLE: Array<{ variant: string; label: string }> = [
  { variant: "success", label: "Active" },
  { variant: "error", label: "Failed" },
  { variant: "warning", label: "Pending" },
  { variant: "info", label: "Review" },
  { variant: "neutral", label: "Draft" },
];

export function ShowcaseSection() {
  const { toasts, fire } = useMiniToast();

  /* Button card */
  const [btnActive, setBtnActive] = useState<string | null>(null);
  const pressBtn = (key: string, type: ToastType, msg: string, desc?: string) => {
    setBtnActive(key);
    fire(type, msg, desc);
    setTimeout(() => setBtnActive(null), 600);
  };

  /* Badge card */
  const [badgeIdx, setBadgeIdx] = useState(0);
  const cycleBadge = () => setBadgeIdx((i) => (i + 1) % BADGE_CYCLE.length);

  /* Input card */
  const [inputVal, setInputVal] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!inputVal.trim()) {
      fire("error", "Field is required", "Please enter some text.");
    } else {
      fire("success", "Submitted!", `You typed: "${inputVal}"`);
      setInputSubmitted(true);
      setInputVal("");
      setTimeout(() => setInputSubmitted(false), 1800);
    }
  };

  /* Switch card */
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const toggleSwitch = (which: "a" | "b") => {
    if (which === "a") {
      setSwitchA((v) => {
        fire("info", v ? "Dark mode off" : "Dark mode on");
        return !v;
      });
    } else {
      setSwitchB((v) => {
        fire("info", v ? "Notifications disabled" : "Notifications enabled");
        return !v;
      });
    }
  };

  /* Checkbox card */
  const [checks, setChecks] = useState([true, false, true]);
  const toggleCheck = (i: number) => {
    setChecks((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      fire(next[i] ? "success" : "warning", CHECK_LABELS[i], next[i] ? "Enabled" : "Disabled");
      return next;
    });
  };

  /* Avatar card */
  const [activeAvatar, setActiveAvatar] = useState<number | null>(null);

  /* Card (stats) click */
  const [statLoading, setStatLoading] = useState(false);
  const [statVal, setStatVal] = useState(24780);
  const clickCard = () => {
    setStatLoading(true);
    setTimeout(() => {
      setStatVal((v) => v + Math.floor(Math.random() * 500 + 100));
      setStatLoading(false);
      fire("success", "Data refreshed!", "Revenue updated.");
    }, 900);
  };

  return (
    <div className={styles.wrap}>
      {/* Global mini toast stack */}
      <div className={styles.toastStack}>
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.miniToast} ${styles[`toast_${t.type}`]}`}>
            <span className={styles.toastIcon}>{TOAST_ICONS[t.type]}</span>
            <div>
              <div className={styles.toastTitle}>{t.title}</div>
              {t.desc && <div className={styles.toastDesc}>{t.desc}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {/* ── Button ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Button</span>
            <code className={styles.cardPkg}>@gooey/core</code>
          </div>
          <div className={styles.cardBody}>
            <button
              className={`${styles.btn} ${styles.btnSolid} ${btnActive === "solid" ? styles.btnPressed : ""}`}
              onClick={() => pressBtn("solid", "success", "Button pressed!", "gooeyToast.success() fired.")}
            >
              Get Started
            </button>
            <button
              className={`${styles.btn} ${styles.btnOutline} ${btnActive === "outline" ? styles.btnPressed : ""}`}
              onClick={() => pressBtn("outline", "info", "Learn More", "gooeyToast.info() fired.")}
            >
              Learn More
            </button>
            <button
              className={`${styles.btn} ${styles.btnGhost} ${btnActive === "ghost" ? styles.btnPressed : ""}`}
              onClick={() => pressBtn("ghost", "warning", "Cancelled", "Action was cancelled.")}
            >
              Cancel
            </button>
          </div>
          <p className={styles.hint}>Click any button ↑</p>
        </div>

        {/* ── Badge ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Badge</span>
            <code className={styles.cardPkg}>@gooey/core</code>
          </div>
          <div className={styles.cardBody} style={{ flexWrap: "wrap" }}>
            {BADGE_CYCLE.map((b, i) => (
              <button
                key={b.variant}
                onClick={cycleBadge}
                className={`${styles.badge} ${styles[`badge_${b.variant}`]} ${i === badgeIdx ? styles.badgeActive : styles.badgeDim}`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <p className={styles.hint}>Click to cycle variants ↑</p>
        </div>

        {/* ── Input ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Input</span>
            <code className={styles.cardPkg}>@gooey/core</code>
          </div>
          <div className={styles.cardBody} style={{ flexDirection: "column", alignItems: "stretch" }}>
            <div className={`${styles.inputWrap} ${inputFocused ? styles.inputFocused : ""} ${inputSubmitted ? styles.inputSuccess : ""}`}>
              <label className={`${styles.inputLabel} ${(inputFocused || inputVal) ? styles.inputLabelUp : ""}`}>
                Your message
              </label>
              <input
                className={styles.input}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value.slice(0, 50))}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={handleInputKey}
                maxLength={50}
                autoComplete="off"
                spellCheck={false}
              />
              <span className={styles.inputCount}>{inputVal.length}/50</span>
            </div>
            <p className={styles.hint} style={{ margin: "8px 0 0" }}>Type and press Enter ↑</p>
          </div>
        </div>

        {/* ── Avatar ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Avatar</span>
            <code className={styles.cardPkg}>@gooey/core</code>
          </div>
          <div className={styles.cardBody}>
            {AVATARS.map((av, i) => (
              <div key={av.initials} className={styles.avatarWrap}>
                <button
                  className={`${styles.avatar} ${styles[`avatar_${av.color}`]}`}
                  onClick={() => setActiveAvatar(activeAvatar === i ? null : i)}
                  title={av.name}
                >
                  {av.initials}
                </button>
                {activeAvatar === i && (
                  <div className={styles.avatarTooltip}>{av.name}</div>
                )}
              </div>
            ))}
          </div>
          <p className={styles.hint}>Click an avatar ↑</p>
        </div>

        {/* ── Card (stats) ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Card</span>
            <code className={styles.cardPkg}>@gooey/core</code>
          </div>
          <div className={styles.cardBody}>
            <button className={styles.statCard} onClick={clickCard} disabled={statLoading}>
              {statLoading ? (
                <div className={styles.skeletonWrap}>
                  <div className={styles.skeletonLine} style={{ width: "60%", height: 12 }} />
                  <div className={styles.skeletonLine} style={{ width: "80%", height: 28 }} />
                  <div className={styles.skeletonLine} style={{ width: "50%", height: 12 }} />
                </div>
              ) : (
                <>
                  <div className={styles.statCardLabel}>Total Revenue</div>
                  <div className={styles.statCardValue}>${statVal.toLocaleString()}</div>
                  <div className={styles.statCardTag}>↑ Click to refresh</div>
                </>
              )}
            </button>
          </div>
          <p className={styles.hint}>Click the card ↑</p>
        </div>

        {/* ── Switch & Checkbox ── */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardName}>Switch &amp; Checkbox</span>
            <code className={styles.cardPkg}>@gooey/core</code>
          </div>
          <div className={styles.cardBody} style={{ flexDirection: "column", gap: 16 }}>
            <div className={styles.row}>
              <button
                className={`${styles.switch} ${switchA ? styles.switchOn : ""}`}
                onClick={() => toggleSwitch("a")}
                role="switch"
                aria-checked={switchA}
              >
                <div className={styles.switchThumb} />
              </button>
              <span className={styles.switchLabel}>Dark mode</span>
            </div>
            <div className={styles.row}>
              <button
                className={`${styles.switch} ${switchB ? styles.switchOn : ""}`}
                onClick={() => toggleSwitch("b")}
                role="switch"
                aria-checked={switchB}
              >
                <div className={styles.switchThumb} />
              </button>
              <span className={styles.switchLabel}>Notifications</span>
            </div>
            <div className={styles.divider} />
            {CHECK_LABELS.map((label, i) => (
              <div key={label} className={styles.row}>
                <button
                  className={`${styles.checkbox} ${checks[i] ? styles.checkboxOn : ""}`}
                  onClick={() => toggleCheck(i)}
                  role="checkbox"
                  aria-checked={checks[i]}
                >
                  {checks[i] && <CheckIcon />}
                </button>
                <span className={styles.switchLabel}>{label}</span>
              </div>
            ))}
          </div>
          <p className={styles.hint}>Toggle any control ↑</p>
        </div>
      </div>
    </div>
  );
}

/* ── Constants ─────────────────────────────────────────────────────────────── */
const CHECK_LABELS = ["Push notifications", "Email digest", "Marketing"];
const TOAST_ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};
const AVATARS = [
  { initials: "JD", name: "Jane Doe", color: "purple" },
  { initials: "AB", name: "Alex Brown", color: "green" },
  { initials: "MK", name: "Maria Kim", color: "orange" },
  { initials: "SL", name: "Sam Lee", color: "pink" },
];

function CheckIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
