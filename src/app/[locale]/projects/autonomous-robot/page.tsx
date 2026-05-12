import { getLocale } from "next-intl/server";
import ProjectPage from "@/components/sections/ProjectPage";
import type { ProjectData } from "@/components/sections/ProjectPage";

const data: ProjectData = {
  slug: "autonomous-robot",
  titleEn: "Autonomous Robot — INF1900",
  titleFr: "Robot Autonome — INF1900",
  taglineEn: "Embedded autonomous robot with line tracking and obstacle avoidance",
  taglineFr: "Robot embarqué autonome avec suivi de ligne et évitement d'obstacles",
  year: "2024",
  role: "Team of 2",
  roleFr: "Équipe de 2",
  type: "University project",
  typeFr: "Projet universitaire",
  status: "Completed",
  statusFr: "Terminé",
  github: "https://github.com/anaelle00/INF1900-Final-Project",
  imageSrc: "/images/robot.jpg",
  contextEn: `INF1900 is the flagship integrative project of the first year of software engineering at Polytechnique Montréal. The challenge: program a fully autonomous robot using an ATmega324PA AVR microcontroller in C and C++, with no operating system, no high-level abstractions — just bare metal hardware.

The robot had to navigate a 4×8 ft circuit, follow a black line, dynamically detect and avoid obstacles, respond to button inputs at intersections, and return to its starting position after completing the course.

Everything runs in real-time on a severely resource-constrained device: 2 KB SRAM, 32 KB flash, no dynamic memory allocation.`,
  contextFr: `INF1900 est le projet intégrateur phare de la première année de génie logiciel à Polytechnique Montréal. Le défi : programmer un robot entièrement autonome avec un microcontrôleur ATmega324PA en C et C++, sans système d'exploitation, sans abstraction haut niveau — du bare metal pur.

Le robot devait naviguer sur un circuit de 4×8 pieds, suivre une ligne noire, détecter et éviter des obstacles dynamiquement, répondre à des entrées bouton aux intersections, et revenir à sa position de départ après avoir complété le parcours.

Tout s'exécute en temps réel sur un dispositif extrêmement contraint en ressources : 2 Ko de SRAM, 32 Ko de flash, sans allocation dynamique de mémoire.`,
  myRoleEn: `Co-developed the entire firmware with a teammate: state machine architecture, motor control via PWM, line following with IR sensors, ultrasonic obstacle detection, USART serial communication for debugging, and Makefile-based build toolchain.

Responsible for the FSM design, sensor calibration, and integration tests on physical hardware.`,
  myRoleFr: `Co-développement complet du firmware avec un coéquipier : architecture à machines à états, contrôle moteur via PWM, suivi de ligne avec capteurs IR, détection d'obstacles par ultrasons, communication série USART pour le débogage et chaîne de build basée sur Makefile.

Responsable de la conception des FSM, de la calibration des capteurs et des tests d'intégration sur hardware physique.`,
  stack: [
    { category: "Languages", items: ["C++", "C"] },
    { category: "Hardware", items: ["ATmega324PA", "AVR", "IR sensors", "Ultrasonic sensor", "DC motors"] },
    { category: "Toolchain", items: ["AVR-GCC", "Makefile", "USART"] },
  ],
  challenges: [
    {
      challengeEn: "2 KB SRAM — every byte counts",
      challengeFr: "2 Ko de SRAM — chaque octet compte",
      approachEn: "No dynamic allocation, stack-allocated state, compile-time constants, and aggressive code size optimization",
      approachFr: "Aucune allocation dynamique, état alloué sur la pile, constantes à la compilation et optimisation agressive de la taille du code",
      outcomeEn: "Stable firmware with no stack overflow across all test runs",
      outcomeFr: "Firmware stable sans dépassement de pile sur tous les tests",
    },
    {
      challengeEn: "Reliable obstacle detection in noisy environments",
      challengeFr: "Détection fiable d'obstacles dans des environnements bruités",
      approachEn: "Multi-sample averaging on ultrasonic readings and debounced state transitions in the FSM",
      approachFr: "Moyenne multi-échantillon sur les lectures ultrasoniques et transitions d'état anti-rebond dans la FSM",
      outcomeEn: "Consistent detection at the target distance with no false positives",
      outcomeFr: "Détection consistante à la distance cible sans faux positifs",
    },
    {
      challengeEn: "Autonomous navigation without any OS or scheduler",
      challengeFr: "Navigation autonome sans OS ni ordonnanceur",
      approachEn: "Hierarchical finite state machines separating navigation, obstacle, and line modes with timer-based polling",
      approachFr: "Machines à états finis hiérarchiques séparant les modes navigation, obstacle et ligne avec polling basé sur timer",
      outcomeEn: "Predictable, debuggable behavior that completed the full course reliably",
      outcomeFr: "Comportement prévisible et débuggable qui a complété le parcours complet de manière fiable",
    },
  ],
  gallery: [
    // Add video files here once available: { type: "video", src: "/videos/robot/demo.mp4", caption: "Full course run" }
  ],
};

export default async function AutonomousRobotPage() {
  const locale = await getLocale();
  return <ProjectPage data={data} locale={locale} />;
}
