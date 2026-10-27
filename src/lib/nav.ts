// Menu and footer links. Labels are the ones the live header and footer already use; the order is the
// content order (SITE_RULES 5.13), and every service and location page in content/ appears once.
import { getLocations, getServices } from './content';

const SERVICE_LABELS: Record<string, string> = {
  'bathroom-tile-installation': 'Bathroom Tile Installation',
  'shower-tile-installation': 'Shower Tile Installation',
  'kitchen-tile-installation': 'Kitchen Tile & Backsplash',
  'floor-tile-installation': 'Floor Tile Installation',
  'patio-lanai-tile': 'Patio & Lanai Tile',
};

export type NavLink = { href: string; label: string };

export async function navLinks(): Promise<{ services: NavLink[]; areas: NavLink[] }> {
  const [services, locations] = await Promise.all([getServices(), getLocations()]);
  return {
    services: services.map((s) => ({ href: `/services/${s.id}`, label: SERVICE_LABELS[s.id] ?? s.data.navLabel ?? s.data.name })),
    areas: locations.map((l) => ({ href: `/locations/${l.id}`, label: l.data.name })),
  };
}
