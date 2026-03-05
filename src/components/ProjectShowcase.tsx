import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  titleBn?: string;
  subtitle: string;
  subtitleBn?: string;
  category: string;
  tags: string[];
  year: number;
  status: string;
  featured: boolean;
  emoji: string;
  description: string;
  image?: string;
  impact?: string;
  duration?: string;
  link?: string;
  githubLink?: string;
  media?: { type: string; src: string; thumbnail?: string }[];
}

interface ProjectShowcaseProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  filterByCategory?: string;
  defaultView?: 'grid' | 'list' | 'masonry';
}

export default function ProjectShowcase({
  projects,
  onProjectClick,
  filterByCategory,
  defaultView = 'masonry',
}: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(filterByCategory || '');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'masonry'>(defaultView);

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#b4ff57';
      case 'in-progress': return '#ff922b';
      case 'archived': return '#748192';
      default: return '#6c82ff';
    }
  };

  const ProjectCardInner = ({ project, compact = false }: { project: Project; compact?: boolean }) => (
    <a
      href={project.link && project.link !== '#' ? project.link : undefined}
      target={project.link && project.link !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      onClick={() => onProjectClick?.(project)}
    >
      <div
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
          border: hoveredProject === project.id ? '1.5px solid var(--accent)' : '1px solid var(--border)',
          boxShadow:
            hoveredProject === project.id
              ? '0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(180,255,87,0.12)'
              : '0 4px 20px rgba(0,0,0,0.18)',
          transition: 'all 0.32s cubic-bezier(0.16,1,0.3,1)',
          transform: hoveredProject === project.id ? 'translateY(-6px)' : 'translateY(0)',
          cursor: 'pointer',
        }}
      >
        {/* Image Container */}
        {!compact && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: project.featured ? '16/8' : '16/10',
              background: 'linear-gradient(135deg, rgba(180,255,87,0.08) 0%, rgba(87,255,218,0.06) 50%, rgba(132,94,247,0.08) 100%)',
              overflow: 'hidden',
            }}
          >
            {project.image ? (
              <img
                src={`/${project.image}`}
                alt={project.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: hoveredProject === project.id ? 0.8 : 1,
                  transform: hoveredProject === project.id ? 'scale(1.06)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: project.featured ? '72px' : '56px',
                  opacity: 0.25,
                }}
              >
                {project.emoji}
              </div>
            )}

            {/* Hover overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)',
                opacity: hoveredProject === project.id ? 1 : 0,
                transition: 'opacity 0.3s',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                View Project →
              </span>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '5px 11px',
                  borderRadius: '6px',
                  background: 'var(--accent)',
                  color: '#030310',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                ★ Featured
              </div>
            )}

            {/* Status Badge */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: `color-mix(in srgb, ${getStatusColor(project.status)} 12%, transparent)`,
                border: `1px solid ${getStatusColor(project.status)}`,
                color: getStatusColor(project.status),
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {project.status}
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: compact ? '20px' : '22px' }}>
          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: compact ? 'var(--text-base)' : 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '6px',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>
          {project.titleBn && (
            <p
              style={{
                fontFamily: 'var(--font-bn)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted2)',
                marginBottom: '8px',
              }}
            >
              {project.titleBn}
            </p>
          )}

          {/* Subtitle */}
          {project.subtitle && (
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text2)',
                marginBottom: compact ? '12px' : '14px',
                lineHeight: 1.6,
              }}
            >
              {project.subtitle}
            </p>
          )}

          {/* Stats row */}
          {(project.impact || project.duration) && !compact && (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '14px',
                paddingBottom: '14px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {project.impact && (
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '2px' }}>Impact</p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--accent)' }}>{project.impact}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '2px' }}>Timeline</p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--accent2)' }}>{project.duration}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {project.tags.slice(0, compact ? 2 : 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 'var(--text-xs)',
                  padding: '3px 9px',
                  borderRadius: '99px',
                  background: 'var(--accent-dim)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(180,255,87,0.15)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > (compact ? 2 : 4) && (
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  padding: '3px 9px',
                  borderRadius: '99px',
                  background: 'var(--surface2)',
                  color: 'var(--muted2)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                +{project.tags.length - (compact ? 2 : 4)}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );

  /* ── MASONRY VIEW ── */
  const renderMasonryView = () => (
    <div
      style={{
        columns: 'auto 300px',
        columnGap: '20px',
        marginTop: '32px',
      }}
    >
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          style={{
            breakInside: 'avoid',
            marginBottom: '20px',
            display: 'block',
          }}
        >
          <ProjectCardInner project={project} />
        </div>
      ))}
    </div>
  );

  /* ── GRID VIEW ── */
  const renderGridView = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        marginTop: '32px',
      }}
    >
      {filteredProjects.map((project) => (
        <div key={project.id}>
          <ProjectCardInner project={project} />
        </div>
      ))}
    </div>
  );

  /* ── LIST VIEW ── */
  const renderListView = () => (
    <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {filteredProjects.map((project) => (
        <a
          key={project.id}
          href={project.link && project.link !== '#' ? project.link : undefined}
          target={project.link && project.link !== '#' ? '_blank' : undefined}
          rel="noopener noreferrer"
          onClick={() => onProjectClick?.(project)}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            padding: '20px 24px',
            borderRadius: '12px',
            border: hoveredProject === project.id ? '1.5px solid var(--accent)' : '1px solid var(--border)',
            background: hoveredProject === project.id
              ? 'color-mix(in srgb, var(--surface) 95%, var(--accent))'
              : 'var(--surface)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.25s var(--ease)',
            boxShadow:
              hoveredProject === project.id
                ? '0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(180,255,87,0.08)'
                : '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Emoji icon */}
          <div
            style={{
              width: '52px',
              height: '52px',
              minWidth: '52px',
              borderRadius: '12px',
              background: 'var(--accent-dim)',
              border: '1px solid rgba(180,255,87,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            {project.emoji}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.title}
              </h3>
              {project.featured && (
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                  }}
                >
                  ★
                </span>
              )}
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text2)' }}>{project.subtitle}</p>
          </div>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {project.category}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              {project.year}
            </span>
          </div>

          {/* Arrow */}
          <div
            style={{
              fontSize: '18px',
              color: 'var(--accent)',
              transition: 'transform 0.25s',
              transform: hoveredProject === project.id ? 'translateX(4px)' : 'translateX(0)',
              flexShrink: 0,
            }}
          >
            →
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <div>
      {/* Controls row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('')}
            style={{
              padding: '7px 15px',
              borderRadius: '99px',
              border: selectedCategory === '' ? '1.5px solid var(--accent)' : '1px solid var(--border2)',
              background: selectedCategory === '' ? 'var(--accent-dim)' : 'transparent',
              color: selectedCategory === '' ? 'var(--accent)' : 'var(--muted2)',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.08em',
            }}
          >
            All ({projects.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 15px',
                borderRadius: '99px',
                border: selectedCategory === cat ? '1.5px solid var(--accent)' : '1px solid var(--border2)',
                background: selectedCategory === cat ? 'var(--accent-dim)' : 'transparent',
                color: selectedCategory === cat ? 'var(--accent)' : 'var(--muted2)',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.08em',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            background: 'var(--surface)',
            borderRadius: '10px',
            padding: '4px',
            border: '1px solid var(--border)',
          }}
        >
          {([
            { mode: 'masonry', icon: '⊟', title: 'Masonry' },
            { mode: 'grid', icon: '⊞', title: 'Grid' },
            { mode: 'list', icon: '☰', title: 'List' },
          ] as const).map(({ mode, icon, title }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              title={title}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === mode ? 'var(--accent)' : 'transparent',
                color: viewMode === mode ? '#030310' : 'var(--muted2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                transition: 'all 0.2s',
                fontWeight: 600,
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      {viewMode === 'masonry' && renderMasonryView()}
      {viewMode === 'grid' && renderGridView()}
      {viewMode === 'list' && renderListView()}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: 'var(--muted)',
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: '8px', color: 'var(--text2)' }}>
            No projects in this category
          </p>
          <p style={{ fontSize: 'var(--text-sm)' }}>Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}

