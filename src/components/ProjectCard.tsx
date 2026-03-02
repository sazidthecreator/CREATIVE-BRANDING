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

  return (
    <a
      href={project.link || '#'}
      target={project.link && project.link !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        animation: `slideIn 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s both`,
      }}
    >
      <div className="card" style={{ padding: '28px', cursor: 'pointer' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '12px',
            background: 'var(--accent-dim)', border: '1px solid rgba(180,255,87,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', flexShrink: 0,
          }}>
            {project.emoji}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: 'var(--text-xs)', color: 'var(--muted2)',
              fontFamily: 'var(--font-mono)',
            }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: statusColor }} />
              {project.status}
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
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 'var(--text-sm)', color: 'var(--text2)',
          lineHeight: 1.7, marginBottom: '20px',
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
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {project.impact && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>
                📈 {project.impact}
              </span>
            )}
            {project.duration && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>
                ⏱ {project.duration}
              </span>
            )}
          </div>
          <span style={{
            fontSize: 'var(--text-xs)', color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
          }}>
            View →
          </span>
        </div>
      </div>
    </a>
  );
}
