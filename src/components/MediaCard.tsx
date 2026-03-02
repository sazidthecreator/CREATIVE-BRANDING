import { useState } from 'react';

interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'pdf' | 'figma';
  title: string;
  description?: string;
  src: string;
  thumbnail?: string;
  duration?: string;
  category: string;
  tags?: string[];
}

interface MediaCardProps {
  media: MediaAsset;
  onPreview?: (media: MediaAsset) => void;
}

export default function MediaCard({ media, onPreview }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const getMediaIcon = () => {
    switch (media.type) {
      case 'video': return '▶';
      case 'pdf': return '📄';
      case 'figma': return '🎨';
      default: return '🖼';
    }
  };

  const getMediaColor = () => {
    switch (media.type) {
      case 'video': return '#ff6b6b';
      case 'pdf': return '#ff922b';
      case 'figma': return '#845ef7';
      default: return '#b4ff57';
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(media);
    } else {
      setPreviewOpen(true);
    }
  };

  return (
    <>
      <div
        className="card"
        style={{
          padding: 0,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s var(--ease)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(180,255,87,0.15)'
            : '0 8px 24px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Media Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Thumbnail */}
          {media.thumbnail ? (
            <img
              src={media.thumbnail}
              alt={media.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: isHovered ? 0.8 : 1,
                transition: 'opacity 0.3s, transform 0.3s',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
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
                flexDirection: 'column',
                gap: '12px',
                fontSize: '48px',
              }}
            >
              {getMediaIcon()}
            </div>
          )}

          {/* Overlay */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <button
                onClick={handlePreview}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: `2px solid ${getMediaColor()}`,
                  background: 'transparent',
                  color: getMediaColor(),
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = getMediaColor();
                  (e.target as HTMLButtonElement).style.color = 'var(--bg)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                  (e.target as HTMLButtonElement).style.color = getMediaColor();
                }}
              >
                Preview ↗
              </button>

              {media.type !== 'pdf' && (
                <a
                  href={media.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: `2px solid var(--accent)`,
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.opacity = '1';
                  }}
                >
                  Open ↗
                </a>
              )}
            </div>
          )}

          {/* Type Badge */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: `${getMediaColor()}20`,
              border: `1px solid ${getMediaColor()}`,
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              color: getMediaColor(),
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {media.type}
          </div>

          {/* Duration Badge for Videos */}
          {media.type === 'video' && media.duration && (
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                padding: '4px 10px',
                borderRadius: '4px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {media.duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Category */}
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}
          >
            {media.category}
          </p>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {media.title}
          </h3>

          {/* Description */}
          {media.description && (
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text2)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}
            >
              {media.description}
            </p>
          )}

          {/* Tags */}
          {media.tags && media.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {media.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag"
                  style={{
                    fontSize: 'var(--text-xs)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    background: 'var(--surface2)',
                    color: 'var(--muted2)',
                    border: '1px solid var(--border2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setPreviewOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: 'var(--surface)',
              borderRadius: '16px',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--surface2)',
                color: 'var(--text)',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
              }}
            >
              ✕
            </button>

            {/* Media Preview */}
            {media.type === 'image' && (
              <img
                src={media.src}
                alt={media.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}
            {media.type === 'video' && (
              <video
                src={media.src}
                controls
                style={{ width: '100%', height: 'auto', display: 'block' }}
                autoPlay
              />
            )}
            {media.type === 'pdf' && (
              <iframe
                src={media.src}
                style={{ width: '100%', height: '90vh', border: 'none' }}
                title={media.title}
              />
            )}
            {media.type === 'figma' && (
              <iframe
                style={{ width: '100%', height: '90vh', border: 'none' }}
                src={`https://www.figma.com/embed?embed_host=share&url=${media.src}`}
                title={media.title}
              />
            )}

            {/* Info */}
            <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: '8px' }}>
                {media.title}
              </h2>
              {media.description && (
                <p style={{ color: 'var(--text2)', marginBottom: '16px' }}>
                  {media.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
