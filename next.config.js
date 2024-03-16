module.exports = {
    async headers() {
      return [
        {
          // Set cache control headers for static assets (e.g., images, CSS, JavaScript)
          source: '/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable', // Cache static assets for 1 year (31536000 seconds)
            },
          ],
        },
        {
          // Set cache control headers for API routes
          source: '/api/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=600, stale-while-revalidate=36000, stale-if-error=86400',
            },
          ],
        },
      ];
    },
  };