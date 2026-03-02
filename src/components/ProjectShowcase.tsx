import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  year: number;
  status: string;
  featured: boolean;
  emoji: string;
  description: string;
  image: string;
  impact: string;
  duration: string;
  link?: string;
  githubLink?: string;
  media?: { type: string; src: string; thumbnail?: string }[];
}

interface ProjectShowcaseProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  filterByCategory?: string;
}

export default function ProjectShowcase({ projects, onProjectClick, filterByCategory }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(filterByCategory || '');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique categories
  const categories = Array.from(new Set(projects.map(p => p.category)));

  // Filter projects
  const filteredProjects = selectedCategory
    ? projects.filter(p => p.category === selectedCategory)
    : projects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#b4ff57';
      case 'in-progress': return '#ff922b';
      case 'archived': return '#748192';
      default: return '#6c82ff';
    }
  };

  const renderGridView = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '32px',
        marginTop: '32px',
      }}
    >
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
          onClick={() => onProjectClick?.(project)}
          style={{
            cursor: onProjectClick ? 'pointer' : 'default',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: hoveredProject === project.id ? 'translateY(-12px)' : 'translateY(0)',
            position: 'relative',
          }}
        >
          {/* Card Background with Gradient Overlay */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              border: hoveredProject === project.id ? '2px solid var(--accent)' : '1px solid var(--border)',
              boxShadow:
                hoveredProject === project.id
                  ? '0 24px 64px rgba(180,255,87,0.15), 0 0 32px rgba(180,255,87,0.08)'
                  : '0 8px 24px rgba(0,0,0,0.12)',
              transition: 'all 0.3s',
            }}
          >
            {/* Image Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                background: 'linear-gradient(135deg, rgba(180,255,87,0.1) 0%, rgba(132,94,247,0.1) 100%)',
                overflow: 'hidden',
              }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: hoveredProject === project.id ? 0.85 : 1,
                    transform: hoveredProject === project.id ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.4s ease-out',
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
                    fontSize: '64px',
                    opacity: 0.3,
                  }}
                >
                  {project.emoji}
                </div>
              )}

              {/* Hover Overlay */}
              {hoveredProject === project.id && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    animation: 'fadeIn 0.3s ease-out',
                  }}
                >
                  <button
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '2px solid var(--accent)',
                      background: 'transparent',
                      color: 'var(--accent)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.background = 'var(--accent)';
                      (e.target as HTMLButtonElement).style.color = 'var(--bg)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.background = 'transparent';
                      (e.target as HTMLButtonElement).style.color = 'var(--accent)';
                    }}
                  >
                    View Case
                  </button>
                </div>
              )}

              {/* Featured Badge */}
              {project.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
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
                  background: `${getStatusColor(project.status)}20`,
                  border: `1.5px solid ${getStatusColor(project.status)}`,
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

            {/* Content */}
            <div style={{ padding: '24px' }}>
              {/* Top Meta */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  gap: '12px',
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
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {project.title}
              </h3>

              {/* Subtitle */}
              {project.subtitle && (
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text2)',
                    marginBottom: '12px',
                    lineHeight: 1.5,
                  }}
                >
                  {project.subtitle}
                </p>
              )}

              {/* Stats */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '16px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {project.impact && (
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '4px' }}>
                      Impact
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--accent)',
                      }}
                    >
                      {project.impact}
                    </p>
                  </div>
                )}
                {project.duration && (
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '4px' }}>
                      Timeline
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--accent)',
                      }}
                    >
                      {project.duration}
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 'var(--text-xs)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'var(--surface2)',
                      color: 'var(--muted2)',
                      border: '1px solid var(--border2)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'var(--accent)20',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
          onClick={() => onProjectClick?.(project)}
          style={{
            padding: '24px',
            borderRadius: '12px',
            border: hoveredProject === project.id ? '2px solid var(--accent)' : '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            cursor: onProjectClick ? 'pointer' : 'default',
            transition: 'all 0.3s',
            boxShadow:
              hoveredProject === project.id
                ? '0 12px 32px rgba(180,255,87,0.1)'
                : '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* Image */}
          <div
            style={{
              width: '120px',
              height: '120px',
              minWidth: '120px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, var(--surface2) 0%, var(--surface3) 100%)',
            }}
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '8px' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text2)', marginBottom: '12px' }}>
              {project.subtitle}
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                {project.category} • {project.year}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {project.status}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              fontSize: '24px',
              color: 'var(--accent)',
              transition: 'transform 0.3s',
              transform: hoveredProject === project.id ? 'translateX(6px)' : 'translateX(0)',
            }}
          >
            →
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {/* Filter & View Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: selectedCategory === '' ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: selectedCategory === '' ? 'var(--accent)20' : 'transparent',
              color: selectedCategory === '' ? 'var(--accent)' : 'var(--text)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            All ({filteredProjects.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: selectedCategory === cat ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: selectedCategory === cat ? 'var(--accent)20' : 'transparent',
                color: selectedCategory === cat ? 'var(--accent)' : 'var(--text)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--surface)', borderRadius: '8px', padding: '4px' }}>
          {(['grid', 'list'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                border: 'none',
                background: viewMode === mode ? 'var(--accent)' : 'transparent',
                color: viewMode === mode ? 'var(--bg)' : 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                transition: 'all 0.2s',
              }}
              title={`${mode} view`}
            >
              {mode === 'grid' ? '⊞' : '☰'}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--muted)',
          }}
        >
          <p style={{ fontSize: 'var(--text-lg)', marginBottom: '8px' }}>No projects found</p>
          <p style={{ fontSize: 'var(--text-sm)' }}>Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}
