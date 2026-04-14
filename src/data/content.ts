export const NAV_ITEMS = [
  { id: 'hero',          label: 'Home' },
  { id: 'overview',      label: 'The Property' },
  { id: 'retail',        label: 'Retail' },
  { id: 'luxury',        label: 'Luxury' },
  { id: 'dining',        label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events',        label: 'Events' },
  { id: 'contact',       label: 'Partner With Us' },
] as const

export type SectionId = typeof NAV_ITEMS[number]['id']

export const STATS = [
  { value: 3000000, suffix: '+', label: 'Sq Ft of Experiences', format: 'compact' },
  { value: 450,     suffix: '+', label: 'Retail, Dining & Entertainment', format: 'number' },
  { value: 40,      suffix: 'M+', label: 'Customers Within 1-Hour Drive', format: 'number' },
  { value: 16000,   suffix: '+', label: 'On-Site Parking Spaces', format: 'compact' },
] as const

export const ENTERTAINMENT_CARDS = [
  {
    title: 'DreamWorks Water Park',
    subtitle: "Western Hemisphere's Largest Indoor Water Park",
    description: '1 million sq ft. 35+ slides and attractions. Year-round tropical climate — regardless of what\'s happening outside.',
    stat: '1M SQ FT',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80',
    badgeClass: 'ent-badge-blue',
  },
  {
    title: 'Nickelodeon Universe',
    subtitle: "Western Hemisphere's Largest Indoor Theme Park",
    description: '8 acres. 35 rides and attractions. Immersive brand activation opportunities that put your brand inside a world-class entertainment experience.',
    stat: '8 ACRES',
    image: 'https://images.unsplash.com/photo-1568193755668-aae18714a9f1?w=900&q=80',
    badgeClass: 'ent-badge-orange',
  },
  {
    title: 'Big SNOW',
    subtitle: "North America's Only Indoor Real Snow Ski Slope",
    description: '1.5 acres of genuine snow, 365 days a year. A category-defining experience that draws media attention and foot traffic unlike anything else.',
    stat: '365 DAYS',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=900&q=80',
    badgeClass: 'ent-badge-sky',
  },
  {
    title: 'NHL Ice Rink',
    subtitle: 'Professional-Grade Ice Entertainment',
    description: 'Full NHL-regulation ice rink hosting professional-level events, skating experiences, and brand-activated programming.',
    stat: 'NHL SIZE',
    image: 'https://images.unsplash.com/photo-1578496781307-cb7f84c12f84?w=900&q=80',
    badgeClass: 'ent-badge-navy',
  },
] as const

export const LUXURY_BRANDS = [
  'Hermès', 'Saks Fifth Avenue', 'Tiffany & Co.', 'Versace',
  'Dolce & Gabbana', 'Balenciaga', 'Bottega Veneta', 'Fendi',
  'Burberry', 'Tag Heuer',
] as const

export const EVENT_TYPES = [
  {
    icon: '🎤',
    title: 'Concerts & Live Performance',
    description: 'Multiple performance stages with combined capacity for thousands. From intimate brand events to large-scale concerts.',
  },
  {
    icon: '🚀',
    title: 'Product Launches',
    description: 'Turn your launch into an event. Foot traffic, media coverage, and cultural relevance in a single activation.',
  },
  {
    icon: '🤝',
    title: 'Brand Activations',
    description: '200,000+ sq ft of activatable space with built-in audience capture across retail, entertainment, and dining zones.',
  },
  {
    icon: '🏛️',
    title: 'Corporate Events & Conventions',
    description: 'Exposition-level space with full AV infrastructure, catering, and a property that makes your event memorable before it even begins.',
  },
  {
    icon: '🎭',
    title: 'Celebrity Appearances',
    description: 'Dedicated appearance infrastructure, crowd management, and media-ready environments for talent-driven programming.',
  },
  {
    icon: '🎪',
    title: 'Experiential Pop-Ups',
    description: 'Short-term, high-impact spaces designed for brands that want to test, surprise, and engage without a permanent footprint.',
  },
] as const

export const DINING_CONCEPTS = [
  { name: 'Kioku', type: 'Japanese Elevated', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { name: 'Pita Basket', type: 'Mediterranean', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
  { name: 'The Sugar Factory', type: 'Experiential Dining', image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&q=80' },
  { name: 'Benihana', type: 'Japanese Steakhouse', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80' },
  { name: 'Tavern on 3', type: 'American Classic', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80' },
  { name: 'The Grille', type: 'Contemporary American', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=80' },
] as const
