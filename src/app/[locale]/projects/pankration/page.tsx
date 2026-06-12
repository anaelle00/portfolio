import { getLocale } from "next-intl/server";
import ProjectPage from "@/components/sections/ProjectPage";
import type { ProjectData } from "@/components/sections/ProjectPage";

const data: ProjectData = {
  slug: "pankration",
  titleEn: "Pankration",
  titleFr: "Pankration",
  taglineEn: "Real-time multiplayer tactical RPG with map editor, turn-based combat, and AI opponents",
  taglineFr: "RPG tactique multijoueur en temps réel avec éditeur de carte, combat au tour par tour et adversaires IA",
  year: "2026",
  role: "Team of 6",
  roleFr: "Équipe de 6",
  type: "University project",
  typeFr: "Projet universitaire",
  status: "Completed",
  statusFr: "Terminé",
  demo: "http://polytechnique-montr-al.gitlab.io/log2995/20261/equipe-112/LOG2995-112/#/home",
  github: "https://gitlab.com/polytechnique-montr-al/log2995/20261/equipe-112/LOG2995-112",
  imageSrc: "/images/pankration.png",
  contextEn: `Pankration is the capstone project of LOG2995 at Polytechnique Montréal: build a complete real-time multiplayer game from scratch in a single semester with a team of six.

The result is a browser-based tactical RPG where two players face off on a grid, commanding units across a turn-based battlefield. Every move, attack, and turn is synchronized in real time over WebSockets. The game ships with a full in-browser map editor, two distinct game modes (Classic and Capture the Flag), a solo AI mode, and a post-game statistics screen.

The project was built under strict academic constraints: no game engine, no ready-made game framework. Everything from the grid renderer to the Socket.IO room management was written by the team.`,
  contextFr: `Pankration est le projet capstone de LOG2995 à Polytechnique Montréal : construire un jeu multijoueur en temps réel complet, from scratch, en un seul semestre avec une équipe de six.

Le résultat est un RPG tactique dans le navigateur où deux joueurs s'affrontent sur une grille, commandant des unités sur un champ de bataille au tour par tour. Chaque déplacement, attaque et changement de tour est synchronisé en temps réel via WebSockets. Le jeu inclut un éditeur de cartes intégré, deux modes de jeu distincts (Classique et Capture du Drapeau), un mode solo contre IA et un écran de statistiques de fin de partie.

Le projet a été développé sous des contraintes académiques strictes : pas de moteur de jeu, pas de framework dédié. Tout, du rendu de grille à la gestion des rooms Socket.IO, a été écrit par l'équipe.`,
  myRoleEn: `Contributed across the full stack: implemented core game loop logic, Socket.IO room lifecycle (create, join, reconnect, leave), and the real-time state synchronization protocol between clients and server.

Also built part of the map editor, the combat resolution system (attack ranges, damage calculation, unit death), and integrated the end-of-game statistics screen. Collaborated on the AI opponent using a greedy heuristic approach for unit targeting.`,
  myRoleFr: `Contribution sur l'ensemble de la stack : implémentation de la boucle de jeu principale, du cycle de vie des rooms Socket.IO (création, rejoindre, reconnexion, départ) et du protocole de synchronisation d'état en temps réel entre clients et serveur.

J'ai également développé une partie de l'éditeur de cartes, le système de résolution des combats (portées d'attaque, calcul des dégâts, mort des unités) et intégré l'écran de statistiques de fin de partie. Participation à l'adversaire IA avec une approche heuristique gloutonne pour le ciblage des unités.`,
  stack: [
    { category: "Frontend", items: ["Angular", "TypeScript", "RxJS"] },
    { category: "Backend", items: ["Node.js", "NestJS", "Socket.IO"] },
    { category: "Game systems", items: ["Turn-based engine", "Grid renderer", "AI heuristics", "Map editor"] },
  ],
  challenges: [
    {
      challengeEn: "Keeping game state consistent across two clients in real time",
      challengeFr: "Maintenir un état de jeu cohérent entre deux clients en temps réel",
      approachEn: "Single source of truth on the server, broadcasting authoritative snapshots after every action via Socket.IO events. Clients never mutate shared state locally.",
      approachFr: "Source de vérité unique côté serveur, diffusion de snapshots autoritatifs après chaque action via Socket.IO. Les clients ne mutent jamais l'état partagé localement.",
      outcomeEn: "Zero desync across all tested match sessions, including disconnection and reconnection scenarios",
      outcomeFr: "Aucune désynchronisation sur toutes les sessions testées, y compris les scénarios de déconnexion et reconnexion",
    },
    {
      challengeEn: "Map editor that generates valid, playable game maps",
      challengeFr: "Éditeur de cartes produisant des cartes jouables et valides",
      approachEn: "Grid-based tile painter with validation rules (minimum spawn points, CTF flag positions, passability checks) enforced before save",
      approachFr: "Peinture de tuiles sur grille avec règles de validation (points de spawn minimaux, positions de drapeau CTF, vérification de passabilité) appliquées avant la sauvegarde",
      outcomeEn: "Players can create and play custom maps immediately; invalid configurations are caught at edit time",
      outcomeFr: "Les joueurs peuvent créer et jouer des cartes personnalisées immédiatement ; les configurations invalides sont détectées à l'édition",
    },
    {
      challengeEn: "AI opponent that feels challenging without external libraries",
      challengeFr: "Adversaire IA qui semble difficile sans bibliothèques externes",
      approachEn: "Greedy heuristic: each turn the AI scores all possible unit actions (move + attack combinations) and selects the highest-value play based on damage dealt and positional gain",
      approachFr: "Heuristique gloutonne : à chaque tour, l'IA évalue toutes les actions possibles des unités (combinaisons déplacement + attaque) et sélectionne la meilleure action selon les dégâts et le gain positionnel",
      outcomeEn: "AI is hard enough to be interesting for new players, fully deterministic and easy to test",
      outcomeFr: "L'IA est assez difficile pour être intéressante pour les nouveaux joueurs, entièrement déterministe et facile à tester",
    },
  ],
  gallery: [],
};

export default async function PankrationPage() {
  const locale = await getLocale();
  return <ProjectPage data={data} locale={locale} />;
}
