import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} id="explore">
      <div className={styles.bgGradient} />
      <div className={styles.bgNoise} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />
      <div className={styles.bgGrid} />

      <div className={styles.stars}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI-Powered Interactive Experience
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine1}>Every Entry.</span>
          <br />
          <span className={styles.titleLine2}>A New Reality.</span>
        </h1>

        <p className={styles.tagline}>
          You don't choose a story — the story chooses you.
        </p>

        <p className={styles.description}>
          Step into a living, breathing AI-generated multiverse where every session
          drops you into an entirely new world. One moment you're escaping a war zone,
          the next you're sitting in a café where something feels deeply, terrifyingly wrong.
          No maps. No guides. No safety net. Just you — and the echo of choices yet to be made.
        </p>

        <div className={styles.cta}>
          <Link href="/SignUp" className={styles.ctaPrimary}>
            <span>Enter the Verse</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a href="#worlds" className={styles.ctaSecondary}>See the Worlds</a>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>∞</span>
            <span className={styles.statLabel}>Unique Worlds</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>0</span>
            <span className={styles.statLabel}>Fixed Stories</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Your Choices</span>
          </div>
        </div>
      </div>
    </section>
  );
}