import './Vorteile.css';
import { FaUserTie, FaClock, FaLeaf, FaBalanceScale } from 'react-icons/fa';
import type { ReactNode } from 'react';

interface Benefit {
  icon: ReactNode;
  title: string;
  text: string;
}

const benefits: Benefit[] = [
  {
    icon: <FaUserTie />,
    title: 'Individuelle Beratung',
    text: 'Persönliche Betreuung von Anfang an.',
  },
  {
    icon: <FaClock />,
    title: 'Kurze Lieferzeiten',
    text: 'Effiziente Abläufe für schnelle Ergebnisse.',
  },
  {
    icon: <FaLeaf />,
    title: 'Nachhaltige Materialien',
    text: 'Ressourcenschonender Einsatz von Rohstoffen.',
  },
  {
    icon: <FaBalanceScale />,
    title: 'Faire Preise',
    text: 'Transparente Kalkulation ohne Überraschungen.',
  },
];

const BenefitCard = ({ icon, title, text }: Benefit) => (
  <article className="p-4 border rounded flex flex-col items-start gap-2">
    <div className="text-3xl">{icon}</div>
    <h3 className="text-xl">{title}</h3>
    <p>{text}</p>
  </article>
);

export default function VorteileSection() {
  return (
    <section className="p-8" id="vorteile">
      <h2 className="text-2xl mb-4">Vorteile</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} {...benefit} />
        ))}
      </div>
    </section>
  );
}

