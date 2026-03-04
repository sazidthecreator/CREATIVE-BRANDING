interface Project {
  id: string;
  title: string;
  titleBn?: string;
  subtitle: string;
  subtitleBn?: string;
  category: string;
  categoryBn?: string;
  tags: string[];
  year: number;
  status: string;
  featured: boolean;
  emoji: string;
  description: string;
  descriptionBn?: string;
  link?: string;
  githubLink?: string;
  image?: string;
  impact?: string;
  duration?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const statusColor = project.status === 'live' ? '#22c55e' : project.status === 'wip' ? '#f59e0b' : '#64748b';
  const statusLabel = project.status === 'live' ? 'live' : project.status === 'wip' ? 'in progress' : project.status;

  return (
    <a
      href={project.link || '#'}
      target={project.link && project.link !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        animation: `slideIn 0.6s var(--ease) ${index * 0.08}s both`,
      }}
    >
      <div
        className="card"
        style={{
          padding: '28px 28px 24px',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(145deg, var(--surface) 0%, var(--surface2) 100%)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--accent-dim) 0%, rgba(87,255,218,0.08) 100%)',
            border: '1px solid rgba(180,255,87,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(180,255,87,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
            transition: 'transform 0.3s var(--ease-spring)',
          }}>
            {project.emoji}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: 'var(--text-xs)', color: 'var(--muted2)',
              fontFamily: 'var(--font-mono)',
              padding: '3px 10px', borderRadius: '99px',
              background: `${statusColor}18`,
              border: `1px solid ${statusColor}30`,
            }}>
              <div style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: statusColor,
                animation: project.status === 'live' ? 'dotPulse 2s infinite' : 'none',
              }} />
              {statusLabel}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              {project.year}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'var(--text-xl)', color: 'var(--text)',
          marginBottom: '4px', lineHeight: 1.3,
        }}>
          {project.title}
        </h3>
        {project.titleBn && (
          <p style={{
            fontFamily: 'var(--font-bn)', fontSize: 'var(--text-sm)',
            color: 'var(--muted2)', marginBottom: '8px',
          }}>
            {project.titleBn}
          </p>
        )}
        <p style={{
          fontSize: 'var(--text-xs)', color: 'var(--accent)', marginBottom: '14px',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
        }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 'var(--text-sm)', color: 'var(--text2)',
          lineHeight: 1.75, marginBottom: '20px', flexGrow: 1,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid var(--border)', paddingTop: '16px',
          marginTop: 'auto',
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.impact && (
              <span style={{
                fontSize: 'var(--text-xs)', color: 'var(--muted2)',
                fontFamily: 'var(--font-mono)',
                padding: '2px 8px', borderRadius: '6px',
                background: 'var(--surface2)',
              }}>
                📈 {project.impact}
              </span>
            )}
            {project.duration && (
              <span style={{
                fontSize: 'var(--text-xs)', color: 'var(--muted2)',
                fontFamily: 'var(--font-mono)',
                padding: '2px 8px', borderRadius: '6px',
                background: 'var(--surface2)',
              }}>
                ⏱ {project.duration}
              </span>
            )}
          </div>
          <span style={{
            fontSize: 'var(--text-xs)', color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            transition: 'gap 0.2s var(--ease-spring)',
          }}>
            View →
          </span>
        </div>
      </div>
    </a>
  );
}
