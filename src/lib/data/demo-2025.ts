import type { RecapData } from './schema';

export const demo2025: RecapData = {
  year: 2025,
  integrity: 86,
  tags: ['SvelteKit', 'Tailwind', 'Static', 'Winter UI', 'Orion'],
  summary:
    `This year: a lot of building, a lot of iteration.\n` +
    `You shipped interfaces, refined systems, and learned to keep structure under pressure.\n` +
    `Winter protocol is active: keep the vibe clean, keep the code readable.`,

  stats: { projects: 7, focusSessions: 142 },

  achievements: [
    { title: 'Built a real front-end app', detail: 'A complete UI with state, persistence, and modules.', severity: 'MAJOR' },
    { title: 'Upgraded architecture', detail: 'Components became reusable; UI became consistent.', severity: 'CORE' },
    { title: 'Shipped a winter system UI', detail: 'Boot screen + command palette + static deployment.', severity: 'WINTER' }
  ],

  failures: [
    { title: 'Over-scoped early', detail: 'Had to cut features to protect quality and shipping.', severity: 'MED' },
    { title: 'Mirrorlist incident', detail: 'Pacman mirrors desynced; lesson: keep infra sane.', severity: 'LOW' }
  ],

  upgrades: [
    { title: 'SvelteKit mastery', detail: 'Routes, layouts, prerender, static builds.' },
    { title: 'UI polish', detail: 'Consistent spacing, surfaces, motion, effects.' },
    { title: 'Data discipline', detail: 'Schema + storage + export/import workflow.' }
  ],

  nextCycle: [
    { title: 'Ship a full product', detail: 'One project you can maintain for months, not days.' },
    { title: 'Add optional sync', detail: 'Serverless endpoint or external storage (later).' },
    { title: 'Level up fullstack', detail: 'Auth, database, and deployment — when ready.' }
  ],

  events: [
    { id: 'E-010', date: '2025-12-20', type: 'system', title: 'Year Recap System started', detail: 'Skeleton created. Tailwind online. Orion shell planned.', tags: ['start', 'ui'] },
    { id: 'E-009', date: '2025-11-02', type: 'work', title: 'UI component refactor', detail: 'Unified card surfaces, spacing tokens, and typography.', tags: ['refactor', 'design'] },
    { id: 'E-008', date: '2025-09-14', type: 'work', title: 'New build pipeline', detail: 'Static deploy workflow prepared for pages hosting.', tags: ['build', 'deploy'] },
    { id: 'E-007', date: '2025-07-22', type: 'life', title: 'Reset week', detail: 'Less output, more recovery. Came back with clarity.', tags: ['reset'] },
    { id: 'E-006', date: '2025-05-03', type: 'work', title: 'Shipped a frontend demo', detail: 'Dashboard modules + local persistence.', tags: ['ship'] },
    { id: 'E-005', date: '2025-03-18', type: 'system', title: 'Stack decision: SvelteKit', detail: 'Chosen for speed, structure, and static builds.', tags: ['stack'] },
    { id: 'E-004', date: '2025-01-09', type: 'life', title: 'New cycle intent', detail: 'Picked a theme: build quality, not quantity.', tags: ['plan'] }
  ]
};
