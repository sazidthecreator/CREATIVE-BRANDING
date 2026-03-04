import { useState } from 'react';

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
  const [hovered, setHovered] = useState(false);

  const statusConfig = project.status === 'live'
    ? { color: '#22c55e', label: 'LIVE', pulse: true }
    : project.status === 'wip'
    ? { color: '#f59e0b', label: 'DRAFT', pulse: false }
    : { color: '#64748b', label: 'ARCHIVED', pulse: false };

  const visibleTags = project.tags.slice(0, 3);
  const extraTags = project.tags.length - 3;

  return (
    <a
      href={project.link || '#'}
      target={project.link && project.link !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={`View project: ${project.title}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        animation: `slideIn 0.6s var(--ease-expo) ${index * 0.1}s both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card" style={{ cursor: 'pointer', position: 'relative' }}>
        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 10,
            background: 'rgba(255,215,0,0.15)',
            border: '1px solid rgba(255,215,0,0.35)',
            borderRadius: 'var(--radius-pill)',
            padding: '3px 10px',
            fontSize: '9px', letterSpacing: '0.1em',
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 600,
          }}>
            ★ Featured
          </div>
        )}

        {/* Image or Emoji banner */}
        {project.image ? (
          <div style={{
            position: 'relative', overflow: 'hidden',
            aspectRatio: '16/10', flexShrink: 0,
          }}>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s var(--ease-expo)',
                transform: hovered ? 'scale(1.07)' : 'scale(1)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(3,3,16,0.95) 100%)',
            }} />
          </div>
        ) : (
          <div style={{
            aspectRatio: '16/7',
            background: 'var(--accent-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.3s ease',
            backgroundColor: hovered ? 'rgba(180,255,87,0.12)' : undefined,
          }}>
            <span style={{ fontSize: '72px', lineHeight: 1 }}>{project.emoji}</span>
          </div>
        )}

        {/* Card body */}
        <div style={{ padding: '20px 24px 20px' }}>
          {/* Category + status row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '12px',
          }}>
            <span className="tag" style={{ fontSize: '8px' }}>
              {project.category}
            </span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '8px', color: 'var(--muted2)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            }}>
              <div style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: statusConfig.color,
                animation: statusConfig.pulse ? 'dotPulse 2s infinite' : 'none',
              }} />
              {statusConfig.label}
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'var(--text)',
            marginBottom: '4px', lineHeight: 1.3,
          }}>
            {project.title}
          </h3>
          {project.titleBn && (
            <p style={{
              fontFamily: 'var(--font-bn)', fontSize: 'var(--text-sm)',
              color: 'var(--muted2)', marginBottom: '6px',
            }}>
              {project.titleBn}
            </p>
          )}
          <p style={{
            fontSize: '10px', color: 'var(--accent)', marginBottom: '10px',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
          }}>
            {project.subtitle}
          </p>

          {/* Description (2 lines clamped) */}
          <p style={{
            fontSize: 'clamp(11px, 1.2vw, 12px)', color: 'var(--text2)',
            lineHeight: 1.65, marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}>
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
            {visibleTags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
            {extraTags > 0 && (
              <span className="tag" style={{ background: 'var(--border)', borderColor: 'var(--border2)', color: 'var(--muted2)' }}>
                +{extraTags}
              </span>
            )}
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderTop: '1px solid var(--border)', paddingTop: '14px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {project.impact && (
                <span style={{ fontSize: '10px', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>
                  📈 {project.impact}
                </span>
              )}
              <span style={{
                fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)',
              }}>
                {project.year}
              </span>
            </div>

            {/* Hover pill */}
            <div style={{
              fontSize: '10px', color: 'var(--accent)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
              background: hovered ? 'var(--accent-dim)' : 'transparent',
              border: `1px solid ${hovered ? 'rgba(180,255,87,0.3)' : 'transparent'}`,
              borderRadius: 'var(--radius-pill)',
              padding: hovered ? '3px 10px' : '3px 0',
              transform: hovered ? 'translateY(0)' : 'translateY(4px)',
              opacity: hovered ? 1 : 0.5,
              transition: 'all 0.3s var(--ease-expo)',
              whiteSpace: 'nowrap',
            }}>
              View Project →
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
