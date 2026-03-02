import { useState } from 'react';

interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'pdf' | 'figma';
  title: string;
  description?: string;
  src: string;
  thumbnail?: string;
  tags?: string[];
  category?: string;
}

interface MediaShowcaseProps {
  media: MediaAsset[];
  title?: string;
  columns?: 2 | 3 | 4;
}

export default function MediaShowcase({ media, title = 'Media Gallery', columns = 3 }: MediaShowcaseProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Extract unique categories
  const uniqueCategories = Array.from(new Set(media.map(m => m.category).filter(Boolean))) as string[];
  const categories = ['all', ...uniqueCategories];

  // Filter media by category
  const filteredMedia = activeCategory === 'all'
    ? media
    : media.filter(m => m.category === activeCategory);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return '#ff6b6b';
      case 'pdf': return '#ff922b';
      case 'figma': return '#845ef7';
      case 'image': return '#b4ff57';
      default: return '#6c82ff';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '▶';
      case 'pdf': return '📄';
      case 'figma': return '🎨';
      default: return '🖼';
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '16px',
            color: 'var(--text)',
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text2)' }}>
          {filteredMedia.length} {activeCategory === 'all' ? 'assets' : `${activeCategory} assets`}
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div style={{ marginBottom: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: activeCategory === cat ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: activeCategory === cat ? 'var(--accent)20' : 'transparent',
                color: activeCategory === cat ? 'var(--accent)' : 'var(--text)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Media Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${100 / columns}%, 1fr))`,
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            style={{
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--accent)';
              el.style.boxShadow = '0 20px 60px rgba(180,255,87,0.15)';
              el.style.transform = 'translateY(-8px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--border)';
              el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              el.style.transform = 'translateY(0)';
            }}
          >
            {/* Thumbnail */}
            {item.thumbnail || item.type === 'image' ? (
              <img
                src={item.thumbnail || item.src}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${getTypeColor(item.type)}20 0%, ${getTypeColor(item.type)}10 100%)`,
                }}
              >
                <div style={{ fontSize: '32px' }}>{getTypeIcon(item.type)}</div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted2)', fontWeight: 600 }}>
                  {item.type.toUpperCase()}
                </span>
              </div>
            )}

            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
                opacity: 0,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0';
              }}
            >
              <div></div>
              <div>
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.8)' }}>
                  Click to view
                </p>
              </div>
            </div>

            {/* Type Badge */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: `${getTypeColor(item.type)}20`,
                border: `1px solid ${getTypeColor(item.type)}`,
                color: getTypeColor(item.type),
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {item.type}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedMedia && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setSelectedMedia(null)}
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
               animation: 'slideUp 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
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
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = 'var(--bg)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--surface2)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              }}
            >
              ✕
            </button>

            {/* Media Content */}
            {selectedMedia.type === 'image' && (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}

            {selectedMedia.type === 'video' && (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}

            {selectedMedia.type === 'pdf' && (
              <iframe
                src={selectedMedia.src}
                style={{ width: '100%', height: '90vh', border: 'none' }}
                title={selectedMedia.title}
              />
            )}

            {selectedMedia.type === 'figma' && (
              <iframe
                src={`https://www.figma.com/embed?embed_host=share&url=${selectedMedia.src}`}
                style={{ width: '100%', height: '90vh', border: 'none' }}
                title={selectedMedia.title}
              />
            )}

            {/* Info Section */}
            <div
              style={{
                padding: '24px',
                borderTop: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--text)',
                }}
              >
                {selectedMedia.title}
              </h2>

              {selectedMedia.description && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text2)', marginBottom: '16px' }}>
                  {selectedMedia.description}
                </p>
              )}

              {/* Tags */}
              {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedMedia.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 'var(--text-xs)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'var(--surface2)',
                        color: 'var(--muted2)',
                        border: '1px solid var(--border2)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Links */}
              {selectedMedia.type !== 'pdf' && (
                <a
                  href={selectedMedia.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '16px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                  }}
                >
                  Open Full Size →
                </a>
              )}
            </div>
          </div>

          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
