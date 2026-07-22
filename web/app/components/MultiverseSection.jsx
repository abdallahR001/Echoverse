import styles from './MultiverseSection.module.css';

const worlds = [
  { tag: 'SCI-FI', title: 'Abandoned Space Station', desc: 'You wake up. The oxygen is at 12%. Someone deleted the logs.', color: '#7c3aed' },
  { tag: 'THRILLER', title: 'The Café on Kepler St.', desc: 'Normal coffee. Normal music. Everyone is watching the door.', color: '#9333ea' },
  { tag: 'WAR', title: 'Back of a Moving Truck', desc: 'Three strangers. One gun. The city is burning behind you.', color: '#6b21a8' },
  { tag: 'HORROR', title: 'Your Old Apartment', desc: 'Everything is exactly as you left it. But you moved out in 2019.', color: '#4c1d95' },
  { tag: 'MYSTERY', title: 'The Heist', desc: "You're inside. The alarm is off. Your partner isn't answering.", color: '#7e22ce' },
  { tag: 'SURREAL', title: 'The Interview', desc: 'The job is real. The office is real. The questions are wrong.', color: '#8b5cf6' },
];

export default function MultiverseSection() {
  return (
    <section className={styles.section} id="multiverse">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>The Multiverse</span>
          <h2 className={styles.title}>No Two Sessions Are the Same</h2>
          <p className={styles.subtitle}>
            A glimpse into the kinds of worlds Echoverse can generate. 
            Yours will be different. It always is.
          </p>
        </div>

        <div className={styles.grid}>
          {worlds.map((w, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardTag} style={{ color: w.color, borderColor: `${w.color}40` }}>
                  {w.tag}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{w.title}</h3>
              <p className={styles.cardDesc}>{w.desc}</p>
              <div className={styles.cardLine} style={{ background: w.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}