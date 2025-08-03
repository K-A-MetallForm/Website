import './Leistungen.css';
import { FaIndustry, FaWrench, FaStream, FaTruck } from 'react-icons/fa';
import type { ReactNode } from 'react';

interface Service {
  icon: ReactNode;
  title: string;
  text: string;
  items: string[];
}

const services: Service[] = [
  {
    icon: <FaIndustry />,
    title: 'Stahlkonstruktionen',
    text: 'Individuelle Lösungen aus Stahl für jedes Projekt.',
    items: ['Projekt A', 'Projekt B', 'Projekt C'],
  },
  {
    icon: <FaWrench />,
    title: 'Schweißarbeiten',
    text: 'Präzise Schweißnähte für hohe Belastungen.',
    items: ['Arbeit A', 'Arbeit B', 'Arbeit C'],
  },
  {
    icon: <FaStream />,
    title: 'Treppen & Geländer',
    text: 'Sichere und formschöne Aufstiege.',
    items: ['Treppenprojekt 1', 'Geländerprojekt 2', 'Treppenprojekt 3'],
  },
  {
    icon: <FaTruck />,
    title: 'Fahrzeugbau',
    text: 'Aufbauten und Anpassungen nach Wunsch.',
    items: ['Fahrzeug A', 'Fahrzeug B', 'Fahrzeug C'],
  },
];

const ServiceCard = ({ icon, title, text, items }: Service) => (
  <article className="p-4 border rounded flex flex-col gap-2">
    <div className="text-3xl">{icon}</div>
    <h3 className="text-xl">{title}</h3>
    <p>{text}</p>
    <ul className="list-disc pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </article>
);

export default function LeistungenSection() {
  return (
    <section className="p-8" id="leistungen">
      <h2 className="text-2xl mb-4">Leistungen</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}

