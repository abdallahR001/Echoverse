import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    title: 'You Enter. Blindly.',
    body:
      'No setup. No character sheet. No backstory. You press play and the Verse drops you somewhere. A rooftop. A basement. A train. You figure it out.',
  },
  {
    num: '02',
    title: 'The World Breathes.',
    body:
      "Every scene is written live by AI — sounds, smells, tension, and the weight of what's unsaid. The world reacts to your presence before you even speak.",
  },
  {
    num: '03',
    title: 'You Choose. It Echoes.',
    body:
      'Respond freely or pick an option. Every choice shifts the story. A lie you told in chapter one comes back. A face you ignored returns with a knife.',
  },
  {
    num: '04',
    title: 'The Verse Remembers.',
    body:
      "Worlds you've visited aren't forgotten. Characters persist across realities. Something you did last session already changed a world you haven't found yet.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>The Mechanics</span>
          <h2 className={styles.title}>How the Verse Works</h2>
          <p className={styles.subtitle}>
            Not a game. Not a chatbot. Something between a dream and a consequence.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}