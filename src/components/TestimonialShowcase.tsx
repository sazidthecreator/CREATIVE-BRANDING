import { useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  text: string;
  rating: number;
  featured?: boolean;
}

interface TestimonialShowcaseProps {
  testimonials: Testimonial[];
  title?: string;
  columns?: 1 | 2 | 3;
}

export default function TestimonialShowcase({ testimonials, title = 'Client Testimonials', columns = 3 }: TestimonialShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? '#ffd700' : 'var(--muted)',
          fontSize: '16px',
          marginRight: '2px',
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
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
          What our clients have to say about working with us
        </p>
      </div>

      {/* Featured Testimonial */}
      {testimonials.find(t => t.featured) && (
        <div
          style={{
            marginBottom: '48px',
            padding: '40px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent)20 0%, var(--surface) 100%)',
            border: '2px solid var(--accent)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Elements */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
              opacity: 0.05,
              borderRadius: '50%',
            }}
          ></div>

          {testimonials.find(t => t.featured) && (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {renderStars((testimonials.find(t => t.featured) as Testimonial).rating)}
              </div>

              <p
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                  fontWeight: 600,
                  color: 'var(--text)',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}
              >
                "{(testimonials.find(t => t.featured) as Testimonial).text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {(testimonials.find(t => t.featured) as Testimonial).image && (
                  <img
                    src={(testimonials.find(t => t.featured) as Testimonial).image || ''}
                    alt={(testimonials.find(t => t.featured) as Testimonial).name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--accent)',
                    }}
                  />
                )}
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text)' }}>
                    {(testimonials.find(t => t.featured) as Testimonial).name}
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text2)' }}>
                    {(testimonials.find(t => t.featured) as Testimonial).role} at{' '}
                    <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
                      {(testimonials.find(t => t.featured) as Testimonial).company}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Testimonial Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${100 / columns}%, 1fr))`,
          gap: '24px',
        }}
      >
        {testimonials
          .filter(t => !t.featured)
          .map((testimonial) => (
            <div
              key={testimonial.id}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: '24px',
                borderRadius: '12px',
                border:
                  hoveredId === testimonial.id
                    ? '2px solid var(--accent)'
                    : '1px solid var(--border)',
                background: 'var(--surface)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: hoveredId === testimonial.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow:
                  hoveredId === testimonial.id
                    ? '0 20px 60px rgba(180,255,87,0.15)'
                    : '0 8px 24px rgba(0,0,0,0.12)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text)',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  flex: 1,
                  fontStyle: 'italic',
                }}
              >
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--accent)',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text)', margin: '0' }}>
                    {testimonial.name}
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text2)', margin: '4px 0 0' }}>
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Stats Section */}
      <div
        style={{
          marginTop: '48px',
          padding: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        <div>
          <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--accent)', marginBottom: '8px' }}>
            {testimonials.length}+
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text2)' }}>
            Happy Clients
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              color: 'var(--accent)',
              marginBottom: '8px',
            }}
          >
            {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text2)' }}>
            Average Rating
          </p>
        </div>
        <div>
          <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--accent)', marginBottom: '8px' }}>
            5/5
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text2)' }}>
            Recommended
          </p>
        </div>
      </div>
    </div>
  );
}
